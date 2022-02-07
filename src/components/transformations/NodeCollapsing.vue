<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeCollapsingMixin = transformationMixin("addNodeCollapsing", {
  edgeGenerator: () => ({}),
  selector: () => true
});
export default {
  name: "NodeCollapsing",
  inject: ["ogma"],
  mixins: [nodeCollapsingMixin],
};
</script>