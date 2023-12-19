import Ogma, { StyleRule, Node, NodeAttributesValue } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export type NodeRuleProps<ND = unknown, ED = unknown> = {
  nodeAttributes?: NodeAttributesValue<ND, ED>;
  selector?: (node: Node<ND>) => boolean;
};
export function useNodeRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>
      },
    },
    props: {
      nodeAttributes: {
        type: Object as PropType<NodeAttributesValue<ND, ED>>,
        default: () => ({}),
        required: false
      },
      selector: {
        type: Function as PropType<(node: Node<ND>) => boolean>,
        default: () => true,
        required: false
      },
    },
    beforeUnmount() {
      styleRule.destroy();
    },
    mounted() {
      styleRule = this.ogma.styles.addNodeRule(
        this.selector,
        this.nodeAttributes,
      );
      this.$watch((vm) => [vm.selector, vm.nodeAttributes], () => {
        styleRule.update({
          nodeAttributes: this.nodeAttributes,
          nodeSelector: this.selector,
        });
      }
      );
    },
    render() {
      return null;
    }
  });
}