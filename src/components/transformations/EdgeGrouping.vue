<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const edgeGroupingMixin = transformationMixin("addEdgeGrouping", {
  selector: () => true,
  generator: () => ({}),
  groupIdFunction: () => ""
});

/**
 * Creates an EdgeGrouping tranformation
 * See [EdgeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeGrouping)
 * @displayName EdgeGrouping
 */
export default {
  name: "EdgeGrouping",
  inject: ["ogma"],
  mixins: [edgeGroupingMixin],
};
</script>