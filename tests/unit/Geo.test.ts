import { Ogma } from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { Geo } from "../../src/components";

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

describe("Geo.vue", () => {
  let ogma: Ogma;
  const wrappers: ReturnType<typeof mount>[] = [];
  const mountGeo = (props = {}) => {
    const wrapper = mount(Geo, { props, global: { provide: { ogma } } });
    wrappers.push(wrapper);
    return wrapper;
  };
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

  describe("legacy mode (no provider)", () => {
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

  describe("provider mode", () => {
    it.each(["mapbox", "maplibre", "deck", "google"])("binds a %s provider", async (type) => {
      const provider = { id: type };
      const options = { latitudePath: "lat" };
      const wrapper = mountGeo({ provider, providerType: type, options });
      await ready();
      await flushPromises();
      expect(created[0].adapter).toEqual({ type, provider });
      expect(created[0].options).toEqual(options);
      expect(created[0].enabled()).toBe(true);
      expect(wrapper.emitted("enabled")).toHaveLength(1);
    });

    it("uses a ready-made adapter", async () => {
      const adapter = { custom: true };
      mountGeo({ adapter });
      await ready();
      expect(created[0].adapter).toEqual(adapter);
    });

    it("reports a missing providerType", async () => {
      const wrapper = mountGeo({ provider: {} });
      await flushPromises();
      expect(wrapper.emitted("error")).toHaveLength(1);
      expect(created).toHaveLength(0);
    });

    it("toggles, updates options and rebuilds on provider change", async () => {
      const wrapper = mountGeo({ provider: {}, providerType: "maplibre" });
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
      await wrapper.setProps({ provider: { other: true } });
      await ready(2);
      expect(first.destroy).toHaveBeenCalled();
      expect(created).toHaveLength(2);
      expect((wrapper.vm as unknown as { getGeo(): unknown }).getGeo()).toEqual(created[1]);
    });

    it("destroys the binding on unmount", async () => {
      const wrapper = mountGeo({ provider: {}, providerType: "deck" });
      await ready();
      await flushPromises();
      wrapper.unmount();
      await flushPromises();
      expect(created[0].destroy).toHaveBeenCalled();
    });
  });
});
