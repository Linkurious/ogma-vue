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
export default {
  name: "Lasso",
  mixins: [lasso]
};
</script>