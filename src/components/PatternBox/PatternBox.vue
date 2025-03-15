<template>
  <q-input
    v-model="cpPattern"
    :label="label"
    :error="!isValidPattern"
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
        v-if="isUsingRe2Engine"
        :is-error-state="!isValidPattern"
        name="re2Expression"
        size="sm"
      />
      <SimpleIcon
        v-else
        :is-error-state="!isValidPattern"
        name="outlinedRegularExpression"
        size="sm"
      />
    </template>
    <template v-slot:append>
      <div class="cursor-pointer">
        <span class="text-body1 text-mute font-source-code-pro"> /{{ regExpFlags.regEx }} </span>
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <div class="column q-px-md q-py-md q-gutter-sm" style="line-height: 1em">
            <div>Regex Flags</div>
            <q-checkbox class="text-caption" v-model="isMultiline" dense> Multiline</q-checkbox>
            <q-checkbox class="text-caption" v-model="isCaseInsensitive" dense>
              Case Insensitive
            </q-checkbox>
          </div>
        </q-popup-proxy>
      </div>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { computed, ref, toRaw, watch } from 'vue';
import { Flags } from 'components/PatternBox/types/Flags';
import { Emits } from 'components/PatternBox/types/Emits';
import SimpleIcon from 'components/shared/SimpleIcon.vue';
import { RE2JS } from 're2js';
import type { ExtendedRE2JS } from 'components/PatternBox/types/ExtendedRE2JS';

// region general variables
const props = defineProps({
  pattern: {
    type: String,
    required: false,
  },
  isUsingRe2Engine: { type: Boolean, required: false },
  label: {
    type: String,
    required: false,
  },
  flags: {
    type: String,
    required: false,
  },
});

const emit = defineEmits([Emits.UPDATE, Emits.UPDATE_FLAGS, Emits.UPDATE_RAW]);

const isMultiline = ref(props.flags ? props.flags.indexOf(Flags.MULTILINE) > -1 : false);
const isCaseInsensitive = ref(
  props.flags ? props.flags.indexOf(Flags.CASE_INSENSITIVE) > -1 : false,
);
const cpPattern = ref(structuredClone(toRaw(props.pattern)));
const isValidPattern = ref(true);
// endregion

// region flags
const regExpFlags = computed(() => {
  let flags = '';
  let re2Flags = 0;

  if (isMultiline.value) {
    flags += Flags.MULTILINE;
    re2Flags |= RE2JS.MULTILINE;
  }

  if (isCaseInsensitive.value) {
    flags += Flags.CASE_INSENSITIVE;
    re2Flags |= RE2JS.CASE_INSENSITIVE;
  }

  // i kept the old emit to avoid breaking changes for existing parents.
  // My implementation doesnt use it anymore.
  emit(Emits.UPDATE_FLAGS, flags);

  return { regEx: flags, re2: re2Flags };
});

// endregion

// region emits and patterns
function updateRaw() {
  try {
    emit(
      Emits.UPDATE_RAW,
      cpPattern.value ? generatePattern(cpPattern.value, regExpFlags.value) : '',
    );
    isValidPattern.value = true;
  } catch (err) {
    console.error(err);
    isValidPattern.value = false;
  }
}

function update(value: string | undefined) {
  try {
    generatePattern(value ?? '');
    isValidPattern.value = true;
  } catch (err) {
    console.error(err);
    isValidPattern.value = false;
  }
  emit(Emits.UPDATE, value);
}

function generatePattern(value: string, flags?: { regEx: string; re2: number }): string | RegExp {
  if (props.isUsingRe2Engine) {
    // we extend the RE2JS class to get access to the re2Input expression property
    return (RE2JS.compile(value, flags?.re2) as ExtendedRE2JS).re2Input.expr;
  }
  return new RegExp(value, flags?.regEx);
}

// endregion

// region watchers
watch([cpPattern, isCaseInsensitive, isMultiline, () => props.isUsingRe2Engine], () => {
  update(cpPattern.value);
  updateRaw();
});
// endregion
</script>

<style scoped lang="scss">
:deep(input) {
  font-family: 'Source Code Pro', monospace;
  letter-spacing: -0.75px;
}
</style>
