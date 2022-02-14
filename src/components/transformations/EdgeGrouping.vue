<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an EdgeGrouping tranformation
 * See [EdgeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeGrouping)
 * @example ../../../docs/examples/edge-grouping.md
 * @displayName EdgeGrouping
 */
export default {
  name: "EdgeGrouping",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the edge grouping.
     */
    options: {
      default: () => ({
        selector: () => true,
        generator: () => ({}),
        groupIdFunction: () => "",
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addEdgeGrouping(options);
    },
  },
};
</script>