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

/**
 * Creates an NodeGrouping tranformation
 * See [NodeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeGrouping)
 * @displayName NodeGrouping
 */
export default {
  name: "NodeGrouping",
  inject: ["ogma"],
  mixins: [nodeGroupingMixin]
};
</script>