export default {
  props: {
    /**
     * The event you whish to register on.
     */
    events: { default: "all" },
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
            oldValue[key] = value;
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
    this.transformation = this.createTransformation(this.options);
    this.registerEvents();
  },
  beforeUnmount() {
    this.unRegisterEvents();
    this.transformation.destroy();
  },
  render() { },
  methods: {
    /**
     * Dummy method to generate the events doc 
     */
    __dummyTriggerEvents() {

      /**
      * Triggered when enabled. [transformationEnabled](https://doc.linkurio.us/ogma/latest/api.html#Event:-transformationEnabled) 
      * @property {Object} transformation The transformation object
      * @event enabled 
      */
      this.$emit("enabled", this.transformation);
      /**
      * Triggered when disabled. [transformationDisabled](https://doc.linkurio.us/ogma/latest/api.html#Event:-transformationDisabled) 
      * @property {Object} transformation The transformation object
      * @event disabled 
      */
      this.$emit("disabled", this.transformation);
     /** 
      * Triggered when refreshed. [transformationRefreshed](https://doc.linkurio.us/ogma/latest/api.html#Event:-transformationRefreshed) 
      * @property {Object} transformation The transformation object
      * @event refreshed 
      */
      this.$emit("refreshed", this.transformation);
    },
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
