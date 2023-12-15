import { defineComponent, h, VNode } from 'vue';
import BaseSelectInput from './components/BaseSelectInput.vue';
import { ExtractComponentProps } from './types';

type NonGenericProps = Omit<
  ExtractComponentProps<typeof BaseSelectInput>,
  'modelValue' | 'options' | 'onUpdate:modelValue'
>;

interface GenericProps<TValue> extends NonGenericProps {
  modelValue: TValue;
  options: TValue[];
}

interface OptionItemSlot<TValue> {
  option: TValue;
}

interface SelectedOptionSlot<TValue> {
  option: TValue;
}

export function useGenericSelectInput<TValue = unknown>() {
  const wrapper = defineComponent((props: GenericProps<TValue>, { slots }) => {
    // Returning functions in `setup` means this is the render function
    return () => {
      // We pass the slots through
      return h(BaseSelectInput, props, slots);
    };
  });

  return wrapper as typeof wrapper & {
    new(): {
      $emit: {
        (e: 'update:modelValue', value: TValue): void;
      };
      $slots: {
        option: (arg: OptionItemSlot<TValue>) => VNode[];
        selectedOption: (arg: SelectedOptionSlot<TValue>) => VNode[];
      };
    };
  };
}

/*
const OwnerSelect = useGenericSelectInput<Owner>();
const PetSelect = useGenericSelectInput<Pet>();
</script>

<template>
  <OwnerSelect v-model="form.owner" label="Owner" :options="owners">
*/