/* eslint-disable @typescript-eslint/no-unused-vars */
import Ogma, { EventTypes, RawGraph, Options, StyleRule, EdgeAttributesValue, NodeAttributesValue, EdgeOutput, EdgeDependencies, NodeDependencies, NodeOutput } from "@linkurious/ogma";
import { defineComponent, h, PropType } from "vue";


export interface OgmaProps<ND = unknown, ED = unknown> {
  width?: number;
  height?: number;
  graph?: RawGraph<ND, ED>;
  options?: Options;
  layoutOnMounted?: boolean;
  events?: "all" | (keyof EventTypes<ND, ED>)[];
}

export function useStyleRule<ND = unknown, ED = unknown>() {
  let styleRule: StyleRule;
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
      edgeSelector: {
        type: Function,
        default: () => true,
        required: false
      },
      nodeSelector: {
        type: Function,
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
    mounted() {
      console.log('mounted');
      styleRule = this.ogma.styles.addRule({
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
      }
      );
    },
  });
}
