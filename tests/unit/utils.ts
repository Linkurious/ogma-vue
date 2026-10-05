import { ComponentMountingOptions, mount } from "@vue/test-utils";

export function createWrapper<T>(component, options: ComponentMountingOptions<T>) {
  return (ogma, props: Partial<T> = {}) =>
    mount(component, {
      props: {
        ...options.props,
        ...props,
      },
      slots: {
        ...options.slots,
      },
      global: {
        provide: {
          ogma,
        },
      },
    });
}

/** Default node/edge color in Ogma's built-in theme */
export const DEFAULT_COLOR = "#617083";
