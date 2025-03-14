<template>
  <q-page class="column items-center justify-center">
    <q-banner>
      <p class="text-h6 text-center">
        Nice to meet you. <br />
        Please select one of the inputs below.
      </p>
    </q-banner>
    <q-card>
      <q-tabs
        v-model="selectedTab"
        class="bg-grey-2 text-grey-7"
        active-color="primary"
        indicator-color="purple"
        align="justify"
      >
        <q-tab name="variant1" label="Variant 1" />
        <q-tab name="variant2" label="Variant 2" />
        <q-tab name="variant3" label="Variant 3" />
      </q-tabs>
ADD INPUTS HERE
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedTab = ref('variant1');
</script>
