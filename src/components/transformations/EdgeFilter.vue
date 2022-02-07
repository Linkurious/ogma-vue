<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const edgeFilterMixin = transformationMixin("addEdgeFilter", {
  criteria: () => true,
});
export default {
  name: "EdgeFilter",
  inject: ["ogma"],
  mixins: [edgeFilterMixin],
};
</script>