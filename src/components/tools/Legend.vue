<script>
import toolMixin from "../../mixins/ToolMixin";
const legend = toolMixin("legend", {});

/**
 * Handles Legend tool
 * See [legend](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-legend)
 * @displayName Legend
 */
export default {
  name: "Legend",
  mixins: [legend],
  props: {
    /**
     * Wether the tool is enabled or not.
     */
    enabled: { type: Boolean, default: false },
    /**
     * The [options](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-legend) to pass to the legend
     */
    options: { type: Object, default: () => ({}) },
  },
};
</script>
