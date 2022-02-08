<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const edgeFilterMixin = transformationMixin("addEdgeFilter", {
  criteria: () => true,
});

/**
 * Creates an EdgeFilter tranformation
 * See [EdgeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeFilter)
 * @displayName EdgeFilter
 */
export default {
  name: "EdgeFilter",
  inject: ["ogma"],
  mixins: [edgeFilterMixin],
};
</script>