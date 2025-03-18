<template>
  <q-page class="column items-center justify-center font-source-code-pro">
    <q-card class="q-ma-md q-pa-lg q-gutter-sm">
      <p>Please enter your desired pattern:</p>
      <PatternBox
        :is-using-re2-engine="isUsingRe2Engine"
        :flags="defaultFlags"
        @update-raw="rawPattern = $event"
        @update="pattern = $event"
      />
      <div class="flex row items-center q-gutter-sm">
        <q-toggle
          v-model="isUsingRe2Engine"
          color="primary"
          label="Re2 Engine"
          keep-color
        />
        <SimpleIcon name="infoCircle" size="md" class="cursor-pointer" @click="goToDocumentation" />
      </div>
      <p class="q-mt-lg">Enter value to match:</p>
      <InputBox
        v-model="userInput"
        @update:model-value="validateInput"
        :is-error-state="!isValidMatch && userInput.length > 0"
        :is-disabled="!pattern || !rawPattern"
      >
        Input
      </InputBox>
      <q-banner class="font-source-code-pro">
        <span v-if="isValidMatch && userInput.length > 0" class="text-positive"
          >Congrats! Valid :)</span
        >
        <span v-if="!pattern" class="text-warning">Please provide pattern first.</span>
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import PatternBox from 'components/PatternBox/PatternBox.vue';
import { ref, watch } from 'vue';
import SimpleIcon from 'components/shared/SimpleIcon.vue';
import InputBox from 'components/InputBox/InputBox.vue';
import { RE2JS } from 're2js';
import { Flags } from 'components/PatternBox/types/Flags';

const userInput = ref('');
const isUsingRe2Engine = ref(true); // to be set depending on situation
const defaultFlags = Flags.CASE_INSENSITIVE; // to be set depending on situation
const isValidMatch = ref(false);

const rawPattern = ref<string>('');
const pattern = ref('');

function validateInput(): void {
  if (userInput.value === '') {
    return;
  }
  if (isUsingRe2Engine.value) {
    isValidMatch.value = RE2JS.matches(rawPattern.value, userInput.value);
  } else {
    isValidMatch.value = !!userInput.value.match(rawPattern.value);
  }
}

function goToDocumentation(): void {
  window.open('https://github.com/google/re2/wiki/syntax', '_blank');
}

watch(isUsingRe2Engine, () => {
  userInput.value = '';
  validateInput();
});

watch(rawPattern, () => {
  userInput.value = '';
});
</script>
<style scoped>
@import 'src/css/app.scss';
</style>
