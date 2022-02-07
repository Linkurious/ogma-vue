<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const geoClusteringMixin = transformationMixin("addGeoClustering", {
  selector: () => true,
  edgeGenerator: () => ({}),
  nodeGenerator: () => ({}),
  onCreated: () => {}
});
export default {
  name: "GeoClustering",
  inject: ["ogma"],
  mixins: [geoClusteringMixin],
};
</script>