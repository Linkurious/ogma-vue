<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NodeFilter tranformation
 * See [NodeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeFilter)
 * @example ../../../docs/examples/node-filter.md
 * @displayName NodeFilter
 */
export default {
  name: "NodeFilter",
  inject: ["ogma"],
  mixins: [transformationMixin],
   props: {
    /**
     * The options to pass to the node filter.
     */
    options: {
      default: () => ({
        criteria: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNodeFilter(options);
    },
  },
};
</script>