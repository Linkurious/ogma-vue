<script>
import StyleMixin from "../../mixins/StyleMixin.js";

const ruleMixin = StyleMixin(
  {
    selector: () => true,
    rule: {}
  },
  ({ ogma, selector, rule }) => {
    return ogma.styles.addNodeRule(selector, rule);
  },
  ({ styleRule, options }) => {
    styleRule.update({
      nodeSelector: options.selector,
      nodeAttributes: options.rule
    });
  }
);
export default {
  name: "NodeRule",
  mixins: [ruleMixin]
};
</script>