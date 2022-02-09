<script>
import toolMixin from "../../mixins/ToolMixin";
const connectNodes = toolMixin("connectNodes", {});
/**
 * Handles ConnectNodes tool
 * See [connectNodes](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-connectNodes)
 * @displayName ConnectNodes
 */
export default {
  name: "ConnectNodes",
  props: {
    /**
     * Wether the tool is enabled or not.
     */
    enabled: { type: Boolean, default: false },
    /**
     * The [options](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-connectNodes) to pass to ConnectNodes
     */
    options: { type: Object, default: () => ({}) },
  },
  mixins: [connectNodes],
};
</script>