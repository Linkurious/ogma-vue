import Ogma, { StyleRule, Node, NodeAttributesValue } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export function useNodeRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
  return defineComponent({
    inject: {
      ogma: {
        default: () => new Ogma() as unknown as Ogma<ND, ED>
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
    mounted() {
      styleRule = this.ogma.styles.addNodeRule({
        selector: this.selector,
        rule: this.rule,
      });
      this.$watch((vm) => [vm.selector, vm.nodeAttributes], () => {
        styleRule.update({
          nodeAttributes: this.nodeAttributes,
          nodeSelector: this.nodeSelector,
        });
      }
      );
    },
  });
}