<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const virtualPropertiesMixin = transformationMixin("addVirtualProperties", {
  edgeDataFunction: () => ({}),
  edgeSelector: () => true,
  nodeDataFunction: () => ({}),
  nodeSelector: () => true,
});

/**
 * Creates an VirtualProperties tranformation
 * See [VirtualProperties](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addVirtualProperties)
 * @displayName VirtualProperties
 */
export default {
  name: "VirtualProperties",
  inject: ["ogma"],
  mixins: [virtualPropertiesMixin],
};
</script>