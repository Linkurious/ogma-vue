<script>
import toolMixin from "../../mixins/ToolMixin";
const snapping = toolMixin("snapping", {});

/**
 * Handles snapping tool
 * See [snapping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-snapping)
 * @displayName Snapping
 */
export default {
  name: "Snapping",
  props: {
    /**
     * Wether the tool is enabled or not.
     */
    enabled: { type: Boolean, default: false },
    /**
     * The [options](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-snapping) to pass to snapping
     */
    options: { type: Object, default: () => ({}) },
  },
  mixins: [snapping],
};
</script>