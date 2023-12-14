<script>
import StyleMixin from "../../mixins/StyleMixin.js";

/**
 * Add an NodeRule to Ogma.
 * See [addNodeRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addNodeRule)
 * @example ../../../docs/examples/node-rule.md
 * @displayName NodeRule
 *
 */
export default {
  name: "NodeRule",
  mixins: [StyleMixin],
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
  methods: {
    creationFunction({ ogma, selector, rule }) {
      return ogma.styles.addNodeRule(selector, rule);
    },
    updateFunction({ styleRule, options }) {
      styleRule.update({
        nodeSelector: options.selector,
        nodeAttributes: options.rule,
      });
    },
  },
};
</script>
