<script>
import StyleMixin from "../../mixins/StyleMixin.js";

const ruleMixin = StyleMixin(
  {
    nodeSelector: () => true,
    nodeAttributes: {},
    edgeSelector: () => true,
    edgeAttributes: {}
  },
  (options) => {
    return options.ogma.styles.addRule(options);
  },
  ({ styleRule, options }) => styleRule.update(options)
);

/**
 * Add an NodeRule to Ogma.
 * See [addNodeRule](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addRule)
 * @displayName NodeRule
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
  mixins: [ruleMixin]
};
</script>