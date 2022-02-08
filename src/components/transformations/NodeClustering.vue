<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeClusteringMixin = transformationMixin("addNodeClustering", {
  edgeGenerator: () => ({}),
  groupIdFunction: () => "",
  nodeGenerator: () => ({}),
  selector: () => true
});

/**
 * Creates an NodeClustering tranformation
 * See [NodeClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeClustering)
 * @displayName NodeClustering
 */
export default {
  name: "NodeClustering",
  inject: ["ogma"],
  mixins: [nodeClusteringMixin],
};
</script>