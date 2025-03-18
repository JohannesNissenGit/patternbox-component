<template>
  <!--  You did not provide Icon.vue in the challenge, so i reimagined it as dynamic image rendering component -->
  <!--  If more components are using it, it should of course be located in another folder...something like 'shared' maybe -->
  <img :src="imageUrl" alt="" :class="[`size-${props.size}`, isErrorState ? 'color-red' : '']" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isErrorState?: boolean;
}>();

const imageUrl = computed(
  () => new URL(`./icons/${props.name}.svg`, import.meta.url).href,
);
</script>
<style scoped>
.size-xs {
  width: 12px;
  height: 12px;
}
.size-sm {
  width: 20px;
  height: 20px;
}

.size-md {
  width: 24px;
  height: 24px;
}

.size-lg {
  width: 32px;
  height: 32px;
}

.color-red {
  filter: invert(15%) sepia(97%) saturate(5732%) hue-rotate(342deg) brightness(71%) contrast(125%);
}
</style>
