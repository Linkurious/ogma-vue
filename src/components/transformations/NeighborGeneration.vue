<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const neighborGenerationMixin = transformationMixin("addNeighborGeneration", {
  selector: () => true,
  edgeGenerator: () => ({}),
  neighborIdFunction: () => "",
  nodeGenerator: () => ({}),
});
export default {
  name: "NeighborGeneration",
  inject: ["ogma"],
  mixins: [neighborGenerationMixin],
};
</script>