<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const nodeFilterMixin = transformationMixin("addNodeFilter", {
  criteria: () => true
});

/**
 * Creates an NodeFilter tranformation
 * See [NodeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeFilter)
 * @displayName NodeFilter
 */
export default {
  name: "NodeFilter",
  inject: ["ogma"],
  mixins: [nodeFilterMixin],
};
</script>