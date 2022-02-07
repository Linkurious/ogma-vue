<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const edgeGroupingMixin = transformationMixin("addEdgeGrouping", {
  selector: () => true,
  generator: () => ({}),
  groupIdFunction: () => ""
});
export default {
  name: "EdgeGrouping",
  inject: ["ogma"],
  mixins: [edgeGroupingMixin],
};
</script>