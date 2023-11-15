import { inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Ogma, { Transformation } from "@linkurious/ogma";


export type Events = 'all' | {
  enabled?: boolean;
  disabled?: boolean;
  refreshed?: boolean;
  indexChanged?: boolean;
  destroyed?: boolean;
}
export type BaseOptions = {
  duration?: number;
  enabled?: boolean;
}
export type PropOptions<O> = Omit<O, keyof BaseOptions>;
export type PropsTransformations<O> = BaseOptions & {
  events?: Events;
  index?: number;
  options?: PropOptions<O>;
};

export type EmitType<T> = {
  (e: 'enabled', transformation: T): void
  (e: 'disabled', transformation: T): void
  (e: 'refreshed', transformation: T): void
  (e: 'indexChanged', transformation: T, index: number): void
  (e: 'destroyed', transformation: T): void
};
export function useTransformation<ND, ED,
  O extends BaseOptions,
  T extends Transformation<ND, ED, O>>(
    props: PropsTransformations<O>,
    create: (opts: O) => T,
    emit: EmitType<T>) {
  let transformation: T;
  let index = 0;
  const listenners: ((a: unknown) => unknown)[] = [];
  const ogma = inject<Ogma>("ogma");

  function createTranformation() {
    // @ts-ignore
    transformation = create({
      ...(props.options || {}),
      enabled: props.enabled,
      duration: props.duration
    });
    if (props.index !== undefined) {
      transformation.setIndex(props.index);
    }
    index = transformation.getIndex();
    return transformation;
  }

  function registerEvents(events: Events) {
    if (!ogma || !transformation) return;
    const validEvents = {
      enabled: "transformationEnabled",
      disabled: "transformationDisabled",
      refreshed: "transformationRefresh",
      indexChanged: "transformationSetIndex",
      destroyed: "transformationDestroyed"
    };
    Object.keys(events === "all" ? validEvents : events)
      .forEach((event) => {
        // @ts-ignore
        const ogmaEvent = validEvents[event];
        if (!ogmaEvent) return;
        // @ts-ignore
        const listenner = ({ target, index }) => {
          if (target !== transformation) return;
          // @ts-ignore
          emit(event, transformation, index);
        }
        // @ts-ignore
        listenners.push(listenner);
        ogma.events.on(ogmaEvent, listenner);
      });
  }
  function unRegisterEvents() {
    if (!ogma) return;
    listenners.forEach(listenner => {
      ogma.events.off(listenner);
    })
  }
  watch(props, (old, curr) => {
    if (!transformation) return;
    const shouldEnable = curr.enabled && !curr.enabled;
    const shouldDisable = !curr.enabled && curr.enabled;
    const t = transformation;
    if (shouldEnable) {
      t.enable(curr.duration || 0);
    }
    if (shouldDisable) {
      t.disable(curr.duration || 0);
    }
    if (curr.options !== old.options) {
      // @ts-ignore
      t.setOptions(curr.options);
    }
    if (curr.index !== index) {
      t.setIndex(curr.index);
    }
    if (curr.events !== old.events) {
      unRegisterEvents();
      registerEvents(curr.events || "all");
    }
  })
  onMounted(() => {
    createTranformation();
    registerEvents(props.events || "all");
  });
  onBeforeUnmount(() => {
    unRegisterEvents();
    if (!transformation) return;
    transformation.destroy();
  });
}
