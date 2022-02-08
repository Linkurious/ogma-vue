<script>
import StyleMixin from "../../mixins/StyleMixin.js";

const ruleMixin = StyleMixin(
  {
    selector: () => true,
    rule: {},
  },
  ({ ogma, selector, rule }) => {
    return ogma.styles.addNodeRule(selector, rule);
  },
  ({ styleRule, options }) => {
    styleRule.update({
      nodeSelector: options.selector,
      nodeAttributes: options.rule,
    });
  }
);
/**
 * Add an NodeRule to Ogma.
 * See [addNodeRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addNodeRule)
 * @displayName NodeRule
 *
 */
export default {
  name: "NodeRule",
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