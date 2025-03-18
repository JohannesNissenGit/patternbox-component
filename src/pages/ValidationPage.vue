<template>
  <q-page class="column items-center justify-center font-source-code-pro">
    <q-card class="q-ma-md q-pa-lg q-gutter-sm validation-card">
      <p>Please enter your desired pattern:</p>
      <PatternBox
        :is-using-re2-engine="isUsingRe2Engine"
        :flags="defaultFlags"
        @update-raw="rawPattern = $event"
        @update="pattern = $event"
      />
      <div class="flex row items-center q-gutter-sm">
        <q-toggle v-model="isUsingRe2Engine" color="primary" label="Re2 Engine" keep-color />
        <SimpleIcon name="infoCircle" size="md" class="cursor-pointer" @click="goToDocumentation" />
      </div>
      <p class="q-mt-lg">Enter value to match:</p>
      <InputBox
        v-model="userInput"
        :pattern="pattern"
        :raw-pattern="rawPattern"
        :is-using-re2-engine="isUsingRe2Engine"
      >
        Input
      </InputBox>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import PatternBox from 'components/PatternBox/PatternBox.vue';
import { ref, watch } from 'vue';
import SimpleIcon from 'components/shared/SimpleIcon.vue';
import InputBox from 'components/InputBox/InputBox.vue';
import { Flags } from 'components/PatternBox/types/Flags';

const userInput = ref('');
const isUsingRe2Engine = ref(true); // to be set depending on situation
const defaultFlags = Flags.CASE_INSENSITIVE; // to be set depending on situation

const rawPattern = ref<string>('');
const pattern = ref('');

function goToDocumentation(): void {
  window.open('https://github.com/google/re2/wiki/syntax', '_blank');
}

watch([rawPattern, isUsingRe2Engine], () => {
  userInput.value = '';
});
</script>
<style scoped>
@import 'src/css/app.scss';

.validation-card {
  min-width: 350px;
}
</style>
