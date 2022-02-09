<script>
import transformationMixin from "../../mixins/TransformationMixin2.js";
// const edgeFilterMixin = transformationMixin("addEdgeFilter", {
//   criteria: () => true,
// });

/**
 * Creates an EdgeFilter tranformation
 * See [EdgeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeFilter)
 * @displayName EdgeFilter
 */
export default {
  name: "EdgeFilter",
  inject: ["ogma"],
  mixins: [transformationMixin],
  props: {
    params: {
      default: () => ({
        criteria: () => true,
      }),
      type: Object,
    },
  },
  methods: {
    createTransformation(params) {
      return this.ogma.transformations.addEdgeFilter(params);
    },
  },
};
</script>