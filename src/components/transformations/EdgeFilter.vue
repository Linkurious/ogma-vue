<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an EdgeFilter tranformation
 * See [EdgeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeFilter)
 * @example ../../../docs/examples/edge-filter.md
 * @displayName EdgeFilter
 */
export default {
  name: "EdgeFilter",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the edge filer.
     */
    options: {
      default: () => ({
        criteria: () => true,
        duration: 0,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addEdgeFilter(options);
    },
  },
};
</script>