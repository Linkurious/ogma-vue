<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NeighborGeneration tranformation
 * See [NeighborGeneration](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborGeneration)
 * @displayName NeighborGeneration
 */
export default {
  name: "NeighborGeneration",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the neighbor generation.
     */
    options: {
      default: () => ({
        selector: () => true,
        edgeGenerator: () => ({}),
        neighborIdFunction: () => "",
        nodeGenerator: () => ({}),
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNeighborGeneration(options);
    },
  },
};
</script>