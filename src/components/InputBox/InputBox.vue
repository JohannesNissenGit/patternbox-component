<template>
  <q-input
    v-model="userInput"
    :label="label"
    :error="isErrorState"
    :disable="isDisabled"
    placeholder="..."
    type="text"
    square
    flat
    stack-label
    filled
    required
    hide-bottom-space
    @input="updateInput"
  >
    <template v-slot:prepend>
      <SimpleIcon
        :name="userInput.length > 0 ? !isErrorState ? 'shieldCheck' : 'shieldExclamation' : 'shieldDefault'"
        :is-error-state="isErrorState"
        size="sm"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SimpleIcon from 'components/shared/SimpleIcon.vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  isErrorState: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const userInput = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

watch(userInput, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  userInput.value = newValue;
})
function updateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  userInput.value = input.value;
}
</script>
