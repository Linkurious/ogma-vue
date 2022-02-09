<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const neighborMergingMixin = transformationMixin("addNeighborMerging", {
  dataFunction: () => undefined,
  selector: () => true,
});

/**
 * Creates an NeighborMerging tranformation
 * See [NeighborMerging](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborMerging)
 * @displayName NeighborMerging
 */
export default {
  name: "NeighborMerging",
  inject: ["ogma"],
  mixins: [neighborMergingMixin],
};
</script>