<script>
import toolMixin from "../../mixins/ToolMixin";
const lasso = toolMixin("lasso", {
  strokeWidth: 1,
  bothExtremities: false,
  callback: evt => {
    evt.nodes.setSelected(true);
    evt.edges.setSelected(true);
  }
});

/**
 * Handles Lasso tool
 * See [lasso](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-lasso)
 * @displayName Lasso
 */
export default {
  name: "Lasso",
  props: {
    /**
     * Wether the tool is enabled or not.
     */
    enabled: { type: Boolean, default: false },
    /**
     * The [options](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-lasso) to pass to Lasso
     */
    options: { type: Object, default: () => ({}) },
  },
  mixins: [lasso]
};
</script>