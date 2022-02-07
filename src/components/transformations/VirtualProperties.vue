<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const virtualPropertiesMixin = transformationMixin("addVirtualProperties", {
  edgeDataFunction: () => ({}),
  edgeSelector: () => true,
  nodeDataFunction: () => ({}),
  nodeSelector: () => true,
});
export default {
  name: "VirtualProperties",
  inject: ["ogma"],
  mixins: [virtualPropertiesMixin],
};
</script>