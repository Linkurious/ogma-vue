import { ComponentMountingOptions, mount } from "@vue/test-utils";

export function createWrapper<T>(component, options: ComponentMountingOptions<T>) {
  return (ogma, props: Partial<T> = {}) => mount(component, {
    props: {
      ...options.props,
      ...props
    },
    slots: {
      ...options.slots
    },
    global: {
      provide: {
        ogma
      },
    }
  });
}