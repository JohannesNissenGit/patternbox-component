<template>
  <q-input
    v-model="userInput"
    @input="updateInput"
    :label="label"
    :rules="[validateMatch]"
    :disable="!pattern || !rawPattern"
    placeholder="..."
    type="text"
    square
    flat
    stack-label
    filled
    required
    hide-bottom-space
  >
    <template v-slot:prepend>
      <SimpleIcon
        :name="
          userInput.length > 0
            ? isValidMatch
              ? 'shieldCheck'
              : 'shieldExclamation'
            : 'shieldDefault'
        "
        :is-error-state="!isValidMatch"
        size="sm"
      />
    </template>
  </q-input>
  <div
    class="font-source-code-pro q-field__bottom input-bottom-text text-positive"
    v-if="isValidMatch && userInput.length > 0"
  >
    Congrats! Valid :)
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SimpleIcon from 'components/shared/SimpleIcon.vue';
import { RE2JS } from 're2js';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  isUsingRe2Engine: {
    type: Boolean,
    required: false,
    default: false,
  },
  rawPattern: {
    type: String,
    required: true,
  },
  pattern: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
});
const userInput = ref(props.modelValue);
const isValidMatch = ref(false);

const emit = defineEmits(['update:modelValue']);

watch(userInput, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    userInput.value = newValue;
  },
);

function updateInput(event: Event) {
  const input = event.target as HTMLInputElement;
  userInput.value = input.value;
}

function validateMatch(value: string): boolean | string {
  if (props.pattern.length < 1) return true; // not sure about this one. Empty string should show valid?

  const isValid = props.isUsingRe2Engine
    ? RE2JS.matches(props.rawPattern, value)
    : !!value.match(props.rawPattern);

  isValidMatch.value = isValid;

  return isValid || 'No match :(';
}
</script>
<style scoped>
.input-bottom-text {
  font-size: 12px;
  line-height: 1;
  margin-top: 0;
  margin-left: 8px;
}
</style>
