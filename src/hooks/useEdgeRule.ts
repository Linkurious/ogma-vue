import Ogma, { StyleRule, Edge, EdgeAttributesValue } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export function useEdgeRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
  return defineComponent({
    inject: {
      ogma: {
        default: () => new Ogma() as unknown as Ogma<ND, ED>
      },
    },
    props: {
      edgeAttributes: {
        type: Object as PropType<EdgeAttributesValue<ND, ED>>,
        default: () => ({}),
        required: false
      },
      selector: {
        type: Function as PropType<(edge: Edge<ED>) => boolean>,
        default: () => true,
        required: false
      },
    },
    mounted() {
      styleRule = this.ogma.styles.addEdgeRule({
        selector: this.selector,
        rule: this.rule,
      });
      this.$watch((vm) => [vm.selector, vm.edgeAttributes], () => {
        styleRule.update({
          edgeAttributes: this.edgeAttributes,
          edgeSelector: this.edgeSelector,
        });
      }
      );
    },
  });
}