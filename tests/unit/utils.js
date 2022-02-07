import { mount } from "@vue/test-utils"

export function createWrapper(component, defaultProps= {}){
  return (ogma, props = {}) => mount(component, {
    props: {
      ...defaultProps,
      ...props
    },
    global: {
      provide: {
        ogma
      },
    }
  })
}