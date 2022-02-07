export default function (type, defaultParams = {}) {
  let reactiveParams = { ...defaultParams };
  return {
    props: {
      events: { default: "all" }, params: { default: {} }
    },
    data() {
      return {
        transformation: null,
        listenners: []
      }
    },
    watch: {
      params: {
        handler(newValue, oldValue) {
          Object.entries(newValue)
          .forEach(([key, value]) => {
            reactiveParams[key] = value;
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
      Object.entries(this.params)
        .forEach(([key, value]) => {
          reactiveParams[key] = value;
        }, {})
      this.transformation = this.ogma.transformations[type](reactiveParams);
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
