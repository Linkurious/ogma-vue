

export default {
  inject: ["ogma"],
  data() {
    return {
      styleRule: null,
    };
  },
  watch: {
    options: {
      handler(newValue, oldValue) {
        this.updateFunction({ options: { ...oldValue, ...newValue }, styleRule: this.styleRule })
      },
      deep: true
    }
  },
  render() { },
  mounted() {
    this.styleRule = this.creationFunction({ ...this.options, ogma: this.ogma });
  },
  beforeUnmount() {
    this.styleRule.destroy();
  },
};