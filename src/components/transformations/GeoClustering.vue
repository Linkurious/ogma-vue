<script>
import transformationMixin from "../../mixins/TransformationMixin.js";
const geoClusteringMixin = transformationMixin("addGeoClustering", {
  selector: () => true,
  edgeGenerator: () => ({}),
  nodeGenerator: () => ({}),
  onCreated: () => {}
});

/**
 * Creates an GeoClustering tranformation
 * See [GeoClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addGeoClustering)
 * @displayName GeoClustering
 */
export default {
  name: "GeoClustering",
  inject: ["ogma"],
  mixins: [geoClusteringMixin],
};
</script>