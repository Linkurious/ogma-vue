<script>
/**
 * Add a StyleClass to Ogma.
 * See [StyleClass](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-createClass)
 * @displayName StyleClass
 *
 */
export default {
  name: "StyleClass",
  props: {
    /**
     * The Options to pass to the styleClass.
     */
    options: { default: () => ({}), type: Object },
    /**
     * The NodeList to apply the class to. See [reference](https://doc.linkurio.us/ogma/latest/api.html#StyleClass)
     */
    nodes: { default: () => (null), type: Object },
    /**
     * The EdgeList to apply the class to. See [reference](https://doc.linkurio.us/ogma/latest/api.html#StyleClass)
     */
    edges: { default: () => (null), type: Object },
  },
  inject: ["ogma"],
  data() {
    return {
      styleClass: null,
    };
  },
  watch: {
    options(newValue) {
      this.styleClass.update(newValue);
    },
    nodes(newValue, oldValue) {
      const { toAdd, toRemove } = this.getAddRemove(newValue, oldValue);
      this.styleClass.add(toAdd);
      this.styleClass.remove(toRemove);
    },
    edges(newValue, oldValue) {
      const toAdd = newValue.subtract(oldValue);
      const toRemove = oldValue.subtract(newValue);
      this.styleClass.add(toAdd);
      this.styleClass.remove(toRemove);
    },
  },
  render() {
    return null;
  },
  mounted() {
    this.styleClass = this.ogma.styles.createClass(this.options);
    if (this.nodes) {
      this.styleClass.add(this.nodes);
    }
    if (this.edges) {
      this.styleClass.add(this.edges);
    }
  },
  methods: {
    getAddRemove(newValue, oldValue) {
      let toAdd, toRemove;
      if (!newValue) {
        toRemove = oldValue;
      } else {
        toRemove = oldValue.subtract(newValue);
      }
      toAdd = newValue.subtract(oldValue);
      return { toAdd, toRemove };
    },
  },
};
</script>