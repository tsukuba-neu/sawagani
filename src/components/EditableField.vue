<template>
  <span class="editable-field">
    <textarea
      v-if="props.multiline"
      class="text"
      :class="{ 'allow-overflow': props.allowOverflow }"
      v-model="model"
      :placeholder="props.placeholder"
      :required
    ></textarea>
    <input
      v-else
      class="text"
      :class="{
        'allow-overflow': allowOverflow,
        'is-centered': props.centered,
      }"
      type="text"
      v-model="model"
      :placeholder="props.placeholder"
      :required
    />
    <span class="prefix-wrap">
      <span class="prefix text">{{ props.prefix }}</span>
      <span class="spacer text">{{ model }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  placeholder?: string
  centered?: boolean
  allowOverflow?: boolean
  prefix?: string
  multiline?: boolean
  required?: boolean
}>()

const model = defineModel<string | number>()
</script>

<style scoped>
input,
textarea {
  position: relative;
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

textarea {
  resize: none;
}

.text {
  height: 1em;
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
