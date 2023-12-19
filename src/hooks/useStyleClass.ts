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
    const toRemove = prev.subtract(next);
    prev.removeClass(styleClass.getName());
    next.addClass(styleClass.getName());
    // .then(() => this.ogma.getNodes.getClassList());
    // next.addClass(styleClass.getName());
  }

  return defineComponent({
    inject: {
      ogma: {
        default: () => new Ogma() as unknown as Ogma<ND, ED>
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
        default: () => undefined,
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
    watch: {
      nodes: function (next: NodeList, prev: NodeList) {
        assign(prev || this.ogma.nodeList(), next);
      },
      edges: function (next: EdgeList, prev: EdgeList) {
        assign(prev || this.ogma.edgeList(), next);
      }
    },
    beforeUnmount() {
      // TODO: once 4.6.2 is shipped, uncomment this
      // styleClass.destroy();
    },
    mounted() {
      styleClass = this.ogma.styles.createClass({
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
      assign(this.ogma.nodeList(), this.nodes || this.ogma.nodeList());
      assign(this.ogma.edgeList(), this.edges || this.ogma.edgeList());
    },
    render() {
      return null;
    }
  });
}