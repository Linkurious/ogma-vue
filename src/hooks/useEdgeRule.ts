import Ogma, { StyleRule, Edge, EdgeAttributesValue } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export type EdgeRuleProps<ND = unknown, ED = unknown> = {
  edgeAttributes?: EdgeAttributesValue<ND, ED>;
  selector?: (edge: Edge<ED>) => boolean;
};
export function useEdgeRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>
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
    beforeUnmount() {
      styleRule.destroy();
    },
    mounted() {
      styleRule = (this.ogma as Ogma).styles.addEdgeRule(
        this.selector,
        this.edgeAttributes,
      );
      this.$watch((vm) => [vm.selector, vm.edgeAttributes], () => {
        styleRule.update({
          edgeAttributes: this.edgeAttributes,
          edgeSelector: this.selector,
        });
      }
      );
    },
    render() {
      return null;
    }
  });
}