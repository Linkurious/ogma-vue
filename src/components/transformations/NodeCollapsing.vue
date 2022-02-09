<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeCollapsingMixin = transformationMixin("addNodeCollapsing", {
  edgeGenerator: () => ({}),
  selector: () => true
});

/**
 * Creates an NodeCollapsing tranformation
 * See [NodeCollapsing](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeCollapsing)
 * @displayName NodeCollapsing
 */
export default {
  name: "NodeCollapsing",
  inject: ["ogma"],
  mixins: [nodeCollapsingMixin],
};
</script>