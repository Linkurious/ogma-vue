import Ogma, {
  StyleClass, EdgeAttributesValue, NodeAttributesValue,
  EdgeOutput, EdgeDependencies, NodeDependencies,
  NodeOutput
} from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";
export type StyleClassProps<ND = unknown, ED = unknown> = {

};
export function useStyleClass<ND = unknown, ED = unknown>() {
  let styleClass: StyleClass;
  return defineComponent({
    inject: {
      ogma: {
        default: () => new Ogma() as unknown as Ogma<ND, ED>
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
      }
      );
    },
  });
}