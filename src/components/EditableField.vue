<template>
  <span class="editable-field" :class="{ 'is-multiline': props.multiline }">
    <textarea
      v-if="props.multiline"
      ref="input"
      v-model="model"
      class="text"
      :class="{ 'allow-overflow': props.allowOverflow }"
      :placeholder="props.placeholder"
      :required
    ></textarea>
    <input
      v-else
      ref="input"
      class="text"
      :class="{
        'allow-overflow': allowOverflow,
        'is-centered': props.centered,
      }"
      :type="type"
      :value="model"
      :placeholder="props.placeholder"
      :required
      @input="
        model =
          type === 'number'
            ? +($event.target as HTMLInputElement).value
            : ($event.target as HTMLInputElement).value
      "
    />
    <span class="prefix-wrap">
      <span class="prefix text">{{ props.prefix }}</span>
      <span class="spacer text">{{ model }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  type?: 'number' | 'text'
  placeholder?: string
  centered?: boolean
  allowOverflow?: boolean
  prefix?: string
  multiline?: boolean
  required?: boolean
  validationError?: string
}>()

const model = defineModel<string | number>()

const inputRef = useTemplateRef<HTMLInputElement | HTMLTextAreaElement>('input')

watch(
  () => props.validationError,
  (error) => {
    if (error) {
      inputRef.value?.setCustomValidity(error)
    } else {
      inputRef.value?.setCustomValidity('')
    }
    inputRef.value?.reportValidity()
  },
)

onMounted(() => {
  if (inputRef.value) {
    // invalid判定された瞬間にフォーカスが外れるのを防ぐ
    inputRef.value.addEventListener('invalid', (e) => {
      e.preventDefault()
    })
  }
})
</script>

<style scoped>
.editable-field {
  display: inline-block;
}

input,
textarea {
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  font-size: 1em;
  background-color: transparent;
  width: 100%;
  height: 100%;

  &.allow-overflow {
    field-sizing: content;
  }

  &.is-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}

.editable-field:not(.is-multiline) {
  vertical-align: middle;

  .text {
    vertical-align: middle;
    height: 1em;
  }
}

.prefix-wrap {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  pointer-events: none;
  user-select: none;

  .text {
    display: inline-block;
  }

  .spacer,
  .prefix {
    width: auto !important;
  }

  .spacer {
    visibility: hidden;
  }
}

:global(.num-split-text) {
  .editable-field {
    height: 100%;

    .text {
      font: normal 16px var(--font-family-number);
      text-align: right;
      width: 100%;
      height: 100%;
      letter-spacing: 1.6pt;
      line-height: 1em;
      mix-blend-mode: multiply;
      padding: 0;
      display: flex;
      align-items: center;
    }
  }
}

@media screen {
  .editable-field {
    input,
    textarea {
      background-color: #eef;
      border-radius: 3px;
      font-family: var(--font-family-sans);

      &:focus {
        outline: 2px solid #06f;
      }

      &:is(:invalid) {
        background-color: #fee;
      }
    }
  }
}
</style>
