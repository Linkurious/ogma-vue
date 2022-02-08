<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const neighborGenerationMixin = transformationMixin("addNeighborGeneration", {
  selector: () => true,
  edgeGenerator: () => ({}),
  neighborIdFunction: () => "",
  nodeGenerator: () => ({}),
});

/**
 * Creates an NeighborGeneration tranformation
 * See [NeighborGeneration](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborGeneration)
 * @displayName NeighborGeneration
 */
export default {
  name: "NeighborGeneration",
  inject: ["ogma"],
  mixins: [neighborGenerationMixin],
};
</script>