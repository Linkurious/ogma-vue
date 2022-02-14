

export default function styleMixin(defaultOptions = {}, creationFunction = null, updateFunction = null) {
  return {
    inject: ["ogma"],
    data() {
      return {
        styleRule: null,
      };
    },
    watch: {
      options: {
        handler(newValue) {
          const options = {
            ...defaultOptions,
            ...newValue,
          };
          updateFunction({ options, styleRule: this.styleRule })
        },
        deep: true
      }
    },
    render() { },
    mounted() {
      const options = {
        ...defaultOptions,
        ...this.options,
      };
      this.styleRule = creationFunction({ ...options, ogma: this.ogma });
    },
    beforeUnmount() {
      this.styleRule.destroy();
    },
  }
};