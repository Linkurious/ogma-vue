<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NeighborMerging tranformation
 * See [NeighborMerging](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborMerging)
 * @displayName NeighborMerging
 */
export default {
  name: "NeighborMerging",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the neighbor merging.
     */
    options: {
      default: () => ({
        dataFunction: () => undefined,
        selector: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNeighborMerging(options);
    },
  },
};
</script>