<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeGroupingMixin = transformationMixin("addNodeGrouping", {
  selector: () => true,
  showContents: () => false,
  padding: () => 0,
  onCreated: () => {},
  nodeGenerator: () => ({}),
  edgeGenerator: () => ({}),
  groupIdFunction: () => ""
});
export default {
  name: "NodeGrouping",
  inject: ["ogma"],
  mixins: [nodeGroupingMixin]
};
</script>