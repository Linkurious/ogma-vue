import Ogma, {
  StyleRule, EdgeAttributesValue, NodeAttributesValue,
  EdgeOutput, EdgeDependencies, NodeDependencies,
  NodeOutput, Edge, Node
} from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export type StyleRuleProps<ND = unknown, ED = unknown> = {
  edgeAttributes?: EdgeAttributesValue<ED, ND>;
  nodeAttributes?: NodeAttributesValue<ND, ED>;
  edgeOutput?: EdgeOutput;
  nodeOutput?: NodeOutput;
  edgeSelector?: (edge: Edge<ED>) => boolean;
  nodeSelector?: (node: Node<ND>) => boolean;
  edgeDependencies?: EdgeDependencies;
  nodeDependencies?: NodeDependencies;
};
export function useStyleRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>
      },
    },
    props: {
      edgeAttributes: {
        type: Object as PropType<EdgeAttributesValue<ED, ND>>,
        default: () => ({}),
        required: false
      },
      nodeAttributes: {
        type: Object as PropType<NodeAttributesValue<ND, ED>>,
        default: () => ({}),
        required: false
      },
      edgeOutput: {
        type: Object as PropType<EdgeOutput>,
        default: () => undefined,
        required: false
      },
      nodeOutput: {
        type: Object as PropType<NodeOutput>,
        default: () => undefined,
        required: false
      },
      edgeSelector: {
        type: Function as PropType<(edge: Edge<ED>) => boolean>,
        default: () => true,
        required: false
      },
      nodeSelector: {
        type: Function as PropType<(node: Node<ND>) => boolean>,
        default: () => true,
        required: false
      },
      edgeDependencies: {
        type: Object as PropType<EdgeDependencies>,
        default: () => (undefined),
        required: false
      },
      nodeDependencies: {
        type: Object as PropType<NodeDependencies>,
        default: () => (undefined),
        required: false
      },
    },
    beforeUnmount() {
      styleRule.destroy();
    },
    mounted() {
      styleRule = (this.ogma as Ogma).styles.addRule({
        edgeAttributes: this.edgeAttributes,
        nodeAttributes: this.nodeAttributes,
        edgeOutput: this.edgeOutput,
        nodeOutput: this.nodeOutput,
        edgeSelector: this.edgeSelector,
        nodeSelector: this.nodeSelector,
        edgeDependencies: this.edgeDependencies,
        nodeDependencies: this.nodeDependencies,
      });
      this.$watch((vm) => [vm.edgeAttributes, vm.nodeAttributes, vm.edgeOutput, vm.nodeOutput, vm.edgeSelector, vm.nodeSelector, vm.edgeDependencies, vm.nodeDependencies], () => {
        styleRule.update({
          edgeAttributes: this.edgeAttributes,
          nodeAttributes: this.nodeAttributes,
          edgeOutput: this.edgeOutput,
          nodeOutput: this.nodeOutput,
          edgeSelector: this.edgeSelector,
          nodeSelector: this.nodeSelector,
          edgeDependencies: this.edgeDependencies,
          nodeDependencies: this.nodeDependencies,
        });
      }, {
        deep: true
      }
      );
    },
    render() {
      return null;
    }
  });
}