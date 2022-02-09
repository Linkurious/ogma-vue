<script>
import StyleMixin from "../../mixins/StyleMixin.js";

const ruleMixin = StyleMixin(
  {
    selector: () => true,
    rule: {},
  },
  ({ ogma, selector, rule }) => {
    return ogma.styles.addEdgeRule(selector, rule);
  },
  ({ styleRule, options }) => {
    styleRule.update({
      edgeSelector: options.selector,
      edgeAttributes: options.rule,
    });
  }
);

/**
 * Add an EdgeRule to Ogma.
 * See [addEdgeRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addEdgeRule)
 * @displayName EdgeRule
 * 
 */
export default {
  name: "EdgeRule",
  props: {
    /**
     * The Options to pass to the styleRule: selector and rule.
     */
    options: {
      default: () => ({
        selector: () => true,
        rule: {},
      }),
      type: Object,
    },
  },
  mixins: [ruleMixin],
};
</script>