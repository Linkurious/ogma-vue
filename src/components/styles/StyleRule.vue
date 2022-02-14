<script>
import StyleMixin from "../../mixins/StyleMixin.js";

/**
 * Add a StyleRule to Ogma.
 * See [addRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addRule)
 * @example ../../../docs/examples/style-rule.md
 * @displayName StyleRule
 *
 */
export default {
  name: "StyleRule",
    props: {
    /**
     * The Options to pass to the styleRule: selector and rule.
     */
    options: {
      default: () => ({
        nodeSelector: () => true,
        nodeAttributes: {},
        edgeSelector: () => true,
        edgeAttributes: {},
      }),
      type: Object,
    },
  },
  mixins: [StyleMixin],
   methods: {
    creationFunction(options) {
    return options.ogma.styles.addRule(options);
    },
    updateFunction({ styleRule, options }) {
      styleRule.update(options)
    },
  },
};
</script>