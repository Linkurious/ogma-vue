import Ogma, {
  StyleClass, EdgeAttributesValue, NodeAttributesValue,
  EdgeOutput, EdgeDependencies, NodeDependencies,
  NodeOutput,
  NodeList, EdgeList
} from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";
export type StyleClassProps<ND = unknown, ED = unknown> = {
  edgeAttributes?: EdgeAttributesValue<ND, ED>;
  nodeAttributes?: NodeAttributesValue<ND, ED>;
  edgeOutput?: EdgeOutput;
  nodeOutput?: NodeOutput;
  nodes: NodeList<ND>;
  edges: EdgeList<ED>;
  name?: string;
  edgeDependencies?: EdgeDependencies;
  nodeDependencies?: NodeDependencies;
};
export function useStyleClass<ND = unknown, ED = unknown>() {
  let styleClass: StyleClass;

  function assign(prev: NodeList | EdgeList, next: NodeList | EdgeList) {
    const toRemove = (prev as NodeList).subtract(next as NodeList);
    toRemove.removeClass(styleClass.getName());
    next.addClass(styleClass.getName());
  }

  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>
      },
    },
    props: {
      nodes: {
        type: Object as PropType<NodeList<ND, ED>>,
        default: () => (undefined),
        required: false
      },
      edges: {
        type: Object as PropType<EdgeList<ED, ND>>,
        default: () => (undefined),
        required: false
      },
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
      name: {
        type: String as PropType<string>,
        required: true
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
    watch: {
      nodes: function (next: NodeList, prev: NodeList) {
        // @ts-ignore
        assign(prev || this.ogma.nodeList(), next);
      },
      edges: function (next: EdgeList, prev: EdgeList) {
        // @ts-ignore
        assign(prev || this.ogma.edgeList(), next);
      }
    },
    beforeUnmount() {
      // TODO: once 4.6.2 is shipped, uncomment this
      // styleClass.destroy();
    },
    mounted() {
      const ogma = (this.ogma as Ogma);
      styleClass = ogma.styles.createClass({
        name: this.name,
        edgeAttributes: this.edgeAttributes,
        nodeAttributes: this.nodeAttributes,
        edgeOutput: this.edgeOutput,
        nodeOutput: this.nodeOutput,
        edgeDependencies: this.edgeDependencies,
        nodeDependencies: this.nodeDependencies,
      });
      this.$watch((vm) => [vm.edgeAttributes, vm.nodeAttributes, vm.edgeOutput, vm.nodeOutput, vm.edgeSelector, vm.nodeSelector, vm.edgeDependencies, vm.nodeDependencies], () => {
        styleClass.update({
          edgeAttributes: this.edgeAttributes,
          nodeAttributes: this.nodeAttributes,
          edgeOutput: this.edgeOutput,
          nodeOutput: this.nodeOutput,
          edgeDependencies: this.edgeDependencies,
          nodeDependencies: this.nodeDependencies,
        });
      });
      // @ts-ignore
      assign(ogma.nodeList(), this.nodes || ogma.nodeList());
      // @ts-ignore
      assign(ogma.edgeList(), this.edges || ogma.edgeList());
    },
    render() {
      return null;
    }
  });
}