<script>
import transformationMixin from "../../mixins/TransformationMixin.js";

/**
 * Creates an NodeCollapsing tranformation
 * See [NodeCollapsing](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeCollapsing)
 * @displayName NodeCollapsing
 */
export default {
  name: "NodeCollapsing",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    /**
     * The options to pass to the node collapsing.
     */
    options: {
      default: () => ({
        edgeGenerator: () => ({}),
        selector: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(options) {
      return this.ogma.transformations.addNodeCollapsing(options);
    },
  },
};
</script>