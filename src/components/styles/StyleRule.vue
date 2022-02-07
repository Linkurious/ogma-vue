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

export default {
  name: "StyleRule",
  mixins: [ruleMixin]
};
</script>