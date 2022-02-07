<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeFilterMixin = transformationMixin("addNodeFilter", {
  criteria: () => true
});
export default {
  name: "NodeFilter",
  inject: ["ogma"],
  mixins: [nodeFilterMixin],
};
</script>