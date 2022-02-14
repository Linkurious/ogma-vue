<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an VirtualProperties tranformation
 * See [VirtualProperties](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addVirtualProperties)
 * @displayName VirtualProperties
 */
export default {
  name: "VirtualProperties",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the virtual properties.
     */
    options: {
      default: () => ({
        edgeDataFunction: () => ({}),
        edgeSelector: () => true,
        nodeDataFunction: () => ({}),
        nodeSelector: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addVirtualProperties(options);
    },
  },
};
</script>