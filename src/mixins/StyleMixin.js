

export default function styleMixin(defaultOptions = {}, creationFunction=null, updateFunction= null) {
  return{
    props: ["options"],
    inject: ["ogma"],
    data() {
      return {
        styleRule: null,
      };
    },
    watch: {
      options(newValue) {
        const options = {
          ...defaultOptions,
          ...newValue,
        };
        updateFunction({options, styleRule: this.styleRule})
      }
    },
    render(){},
    mounted() {
      const options = {
        ...defaultOptions,
        ...this.options,
      };
      this.styleRule = creationFunction({...options, ogma: this.ogma});
    },
    beforeUnmount(){
      this.styleRule.destroy();
    },
  }
};