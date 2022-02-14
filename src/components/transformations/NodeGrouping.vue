<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NodeGrouping tranformation
 * See [NodeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeGrouping)
 * @example ../../../docs/examples/node-grouping.md
 * @displayName NodeGrouping
 */
export default {
  name: "NodeGrouping",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the node grouping.
     */
    options: {
      default: () => ({
        selector: () => true,
        showContents: () => false,
        padding: () => 0,
        onCreated: () => {},
        nodeGenerator: () => ({}),
        edgeGenerator: () => ({}),
        groupIdFunction: () => "",
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNodeGrouping(options);
    },
  },
};
</script>