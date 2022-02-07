
export default function(type, defaultOptions) {
  return {
    props: ["enabled", "options"],
    inject: ["ogma"],
    watch: {
      enabled(newValue) {
        return newValue ? this.enable() : this.disable();
      }
    },
    mounted() {
      if (this.enabled) {
        this.enable()
      }
    },
    render(){},
    beforeUnmount() {
      this.disable();
    },
    methods: {
      enable() {
        this.ogma.tools[type].enable({
         ...defaultOptions,
          ...this.options
        });
      },
      disable() {
        this.ogma.tools[type].disable();
      }
    }
  };
}