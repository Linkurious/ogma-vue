<script>
import StyleMixin from "../../mixins/StyleMixin.js";

/**
 * Add an EdgeRule to Ogma.
 * See [addEdgeRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addEdgeRule)
 * @example ../../../docs/examples/edge-rule.md
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
  mixins: [StyleMixin],
  methods: {
    creationFunction({ ogma, selector, rule }) {
      return ogma.styles.addEdgeRule(selector, rule);
    },
    updateFunction({ styleRule, options }) {
      styleRule.update({
        edgeSelector: options.selector,
        edgeAttributes: options.rule,
      });
    },
  },
};
</script>