<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an GeoClustering tranformation
 * See [GeoClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addGeoClustering)
 * @displayName GeoClustering
 */
export default {
  name: "GeoClustering",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the geo clustering.
     */
    options: {
      default: () => ({
        selector: () => true,
        edgeGenerator: () => ({}),
        nodeGenerator: () => ({}),
        onCreated: () => {},
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addGeoClustering(options);
    },
  },
};
</script>