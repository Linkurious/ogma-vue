<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const neighborMergingMixin = transformationMixin("addNeighborMerging", {
  dataFunction: () => undefined,
  selector: () => true,
});
export default {
  name: "NeighborMerging",
  inject: ["ogma"],
  mixins: [neighborMergingMixin],
};
</script>