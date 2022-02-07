<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeClusteringMixin = transformationMixin("addNodeClustering", {
  edgeGenerator: () => ({}),
  groupIdFunction: () => "",
  nodeGenerator: () => ({}),
  selector: () => true
});
export default {
  name: "NodeClustering",
  inject: ["ogma"],
  mixins: [nodeClusteringMixin],
};
</script>