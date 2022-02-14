export default function (type, defaultOptions = {}) {
  let reactiveOptions = { ...defaultOptions };
  return {
    props: {
      events: { default: "all" }, options: { default: {} }
    },
    data() {
      return {
        transformation: null,
        listenners: []
      }
    },
    watch: {
      options: {
        handler(newValue, oldValue) {
          Object.entries(newValue)
          .forEach(([key, value]) => {
            reactiveOptions[key] = value;
          }, {})

          this.transformation.setDuration(newValue.duration || 0);
          if (newValue.enabled && !oldValue.enabled) {
            this.transformation.enable(newValue.duration || 0);
          }
          if (!newValue.enabled && oldValue.enabled) {
            this.transformation.disable(newValue.duration || 0);
          }
        },
        // deep: true
      }
    },
    mounted() {
      Object.entries(this.options)
        .forEach(([key, value]) => {
          reactiveOptions[key] = value;
        }, {})
      this.transformation = this.ogma.transformations[type](reactiveOptions);
      this.registerEvents();
    },
    beforeUnmount() {
      this.unRegisterEvents();
      this.transformation.destroy();
    },
    render(){},
    methods: {
      registerEvents() {
        const validEvents = {
          enabled: "transformationEnabled",
          disabled: "transformationDisabled",
          refreshed: "transformationRefresh",
          indexChanged: "transformationSetIndex",
          destroyed: "transformationDestroyed"
        };
        const events = this.events === "all" ? Object.keys(validEvents) : this.events;
        events
          .forEach((event) => {
            const ogmaEvent = validEvents[event];
            if (!ogmaEvent) return;
            const listenner = ({ target }) => {
              if (target !== this.transformation) return;
              this.$emit(event, this.transformation);
            }
            this.listenners.push(listenner);
            this.ogma.events.on(ogmaEvent, listenner);
          });
      },
      unRegisterEvents() {
        this.listenners.forEach(listenner => {
          this.ogma.events.off(listenner);
        })
      }
    },
  }
}
