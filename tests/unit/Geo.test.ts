import { Ogma } from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import * as geoModule from "@linkurious/ogma/geo";
import { Geo, GeoMap } from "../../src/components";

// oxlint-disable-next-line typescript/no-explicit-any
const created: any[] = [];
vi.mock("@linkurious/ogma/geo", () => {
  class FakeGeo {
    isOn = false;
    listeners: Record<string, (() => void)[]> = {};
    destroy = vi.fn();
    setOptions = vi.fn(async () => {});
    constructor(
      public ogma: unknown,
      public adapter: unknown,
      public options: unknown,
    ) {
      created.push(this);
    }
    async enable() {
      this.isOn = true;
      this.emit("enabled");
    }
    async disable() {
      this.isOn = false;
      this.emit("disabled");
    }
    enabled() {
      return this.isOn;
    }
    on(e: string, h: () => void) {
      (this.listeners[e] ??= []).push(h);
    }
    off(e: string, h: () => void) {
      this.listeners[e] = (this.listeners[e] ?? []).filter((x) => x !== h);
    }
    emit(e: string) {
      (this.listeners[e] ?? []).forEach((h) => h());
    }
  }
  const factory = (type: string) => vi.fn((provider: unknown) => ({ type, provider }));
  return {
    Geo: FakeGeo,
    createMapboxAdapter: factory("mapbox"),
    createMaplibreAdapter: factory("maplibre"),
    createDeckAdapter: factory("deck"),
    createGoogleAdapter: factory("google"),
  };
});

describe("Geo / GeoMap", () => {
  let ogma: Ogma;
  const wrappers: ReturnType<typeof mount>[] = [];
  const mountWith = (component, props = {}) => {
    const wrapper = mount(component, { props, global: { provide: { ogma } } });
    wrappers.push(wrapper);
    return wrapper;
  };
  const mountGeo = (props = {}) => mountWith(Geo, props);
  const mountMap = (props = {}) => mountWith(GeoMap, { module: () => geoModule, ...props });
  /** Provider mode loads the geo entry point lazily. */
  const ready = (count = 1) => vi.waitFor(() => expect(created).toHaveLength(count));

  beforeEach(() => {
    created.length = 0;
    ogma = new Ogma({ renderer: "canvas", graph: { nodes: [{ id: 0 }], edges: [] } });
  });
  afterEach(() => {
    wrappers.splice(0).forEach((w) => w.unmount());
    ogma.destroy();
  });

  describe("Geo (legacy)", () => {
    let isOn: boolean;
    beforeEach(() => {
      isOn = false;
      vi.spyOn(ogma.geo, "enabled").mockImplementation(() => isOn);
      vi.spyOn(ogma.geo, "enable").mockImplementation(async () => {
        isOn = true;
      });
      vi.spyOn(ogma.geo, "disable").mockImplementation(async () => {
        isOn = false;
      });
      vi.spyOn(ogma.geo, "setOptions").mockImplementation(() => {});
    });

    it("enables ogma.geo with the options", async () => {
      const options = { tileUrlTemplate: "http://x/{z}/{x}/{y}.png" };
      const wrapper = mountGeo({ options });
      await flushPromises();
      expect(ogma.geo.enable).toHaveBeenCalledWith(options);
      expect(wrapper.emitted("enabled")).toHaveLength(1);
      expect(created).toHaveLength(0);
    });

    it("toggles with the enabled prop", async () => {
      const wrapper = mountGeo();
      await flushPromises();
      await wrapper.setProps({ enabled: false });
      await flushPromises();
      expect(ogma.geo.disable).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted("disabled")).toHaveLength(1);
    });

    it("forwards option updates and disables on unmount", async () => {
      const wrapper = mountGeo();
      await flushPromises();
      await wrapper.setProps({ options: { latitudePath: "a" } });
      await flushPromises();
      expect(ogma.geo.setOptions).toHaveBeenCalledWith({ latitudePath: "a" });
      wrapper.unmount();
      await flushPromises();
      expect(ogma.geo.disable).toHaveBeenCalled();
    });
  });

  describe("GeoMap", () => {
    it.each(["mapbox", "maplibre", "deck", "google"])("binds a %s provider", async (type) => {
      const map = { id: type };
      const options = { latitudePath: "lat" };
      const wrapper = mountMap({ provider: type, map, options, enabled: true });
      await ready();
      await flushPromises();
      expect(created[0].adapter).toEqual({ type, provider: map });
      expect(created[0].options).toEqual(options);
      expect(created[0].enabled()).toBe(true);
      expect(wrapper.emitted("enabled")).toHaveLength(1);
    });

    it("uses a ready-made adapter", async () => {
      const adapter = { custom: true };
      mountMap({ adapter, enabled: true });
      await ready();
      expect(created[0].adapter).toEqual(adapter);
    });

    it("waits for the map and emits ready", async () => {
      const wrapper = mountMap({ provider: "maplibre", enabled: true });
      await flushPromises();
      expect(created).toHaveLength(0);
      await wrapper.setProps({ map: {} });
      await ready();
      await flushPromises();
      expect(wrapper.emitted("ready")).toHaveLength(1);
      expect(created[0].enabled()).toBe(true);
    });

    it("stays disabled by default", async () => {
      mountMap({ map: {}, provider: "deck" });
      await ready();
      await flushPromises();
      expect(created[0].enabled()).toBe(false);
    });

    it("accepts a lazy module loader", async () => {
      mountMap({ map: {}, provider: "deck", module: () => Promise.resolve(geoModule) });
      await ready();
    });

    it("reports a missing module", async () => {
      const wrapper = mountMap({ map: {}, provider: "deck", module: undefined });
      await flushPromises();
      expect(wrapper.emitted("error")).toHaveLength(1);
    });

    it("does not bind when unmounted while the module loads", async () => {
      let resolveModule!: (m: typeof geoModule) => void;
      const wrapper = mountMap({
        map: {},
        provider: "deck",
        module: () => new Promise<typeof geoModule>((resolve) => (resolveModule = resolve)),
      });
      await flushPromises();
      wrapper.unmount();
      resolveModule(geoModule);
      await flushPromises();
      expect(created).toHaveLength(0);
    });

    it("reports a missing provider", async () => {
      const wrapper = mountMap({ map: {} });
      await flushPromises();
      expect(wrapper.emitted("error")).toHaveLength(1);
      expect(created).toHaveLength(0);
    });

    it("toggles, updates options and rebuilds on provider change", async () => {
      const wrapper = mountMap({ map: {}, provider: "maplibre", enabled: true });
      await ready();
      await flushPromises();
      const first = created[0];
      await wrapper.setProps({ enabled: false });
      await flushPromises();
      expect(first.enabled()).toBe(false);
      expect(wrapper.emitted("disabled")).toHaveLength(1);
      await wrapper.setProps({ options: { sizeRatio: 2 } });
      await flushPromises();
      expect(first.setOptions).toHaveBeenCalledWith({ sizeRatio: 2 });
      await wrapper.setProps({ map: { other: true } });
      await ready(2);
      expect(first.destroy).toHaveBeenCalled();
      expect(created).toHaveLength(2);
      expect((wrapper.vm as unknown as { getGeo(): unknown }).getGeo()).toEqual(created[1]);
    });

    it("destroys the binding on unmount", async () => {
      const wrapper = mountMap({ map: {}, provider: "deck", enabled: true });
      await ready();
      await flushPromises();
      wrapper.unmount();
      await flushPromises();
      expect(created[0].destroy).toHaveBeenCalled();
    });
  });
});
