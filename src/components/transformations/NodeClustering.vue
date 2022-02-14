<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NodeClustering tranformation
 * See [NodeClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeClustering)
 * @displayName NodeClustering
 */
export default {
  name: "NodeClustering",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the node clustering.
     */
    options: {
      default: () => ({
        edgeGenerator: () => ({}),
        groupIdFunction: () => "",
        nodeGenerator: () => ({}),
        selector: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNodeClustering(options);
    },
  },
};
</script>