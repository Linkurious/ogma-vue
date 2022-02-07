<script>
import StyleMixin from "../../mixins/StyleMixin.js";

const ruleMixin = StyleMixin(
  {
    selector: () => true,
    rule: {}
  },
  ({ ogma, selector, rule }) => {
    return ogma.styles.addEdgeRule(selector, rule);
  },
  ({ styleRule, options }) => {
    styleRule.update({
      edgeSelector: options.selector,
      edgeAttributes: options.rule
    });
  }
);

export default {
  name: "EdgeRule",
  mixins: [ruleMixin]
};
</script>