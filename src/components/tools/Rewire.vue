<script>
import toolMixin from "../../mixins/ToolMixin";
const rewire = toolMixin("rewire", {});

/**
 * Handles rewire tool
 * See [rewire](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-rewire)
 * @displayName Rewire
 */
export default {
  name: "Rewire",
  props: {
    /**
     * Wether the tool is enabled or not.
     */
    enabled: { type: Boolean, default: false },
    /**
     * The [options](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-rewire) to pass to rewire
     */
    options: { type: Object, default: () => ({}) },
  },
  mixins: [rewire]
};
</script>