<template>
  <div
    v-if="problems.length > 0"
    class="problems-panel"
    :class="errorCount > 0 ? 'is-error' : 'is-warning'"
  >
    <div class="header">
      <span class="title">
        {{
          errorCount > 0
            ? '提出前に修正が必要な問題があります'
            : '確認が必要な項目があります'
        }}
      </span>
      <span v-if="errorCount > 0" class="count">
        <span aria-hidden="true">✖</span> エラー {{ errorCount }}件
      </span>
      <span v-if="warningCount > 0" class="count">
        <span aria-hidden="true">⚠</span> 警告 {{ warningCount }}件
      </span>
    </div>
    <ul class="list" aria-label="問題一覧">
      <li
        v-for="problem in problems"
        :key="`${problem.row}-${problem.message}`"
        class="problem"
        :class="`is-${problem.severity}`"
      >
        <span class="icon" aria-hidden="true">{{
          problem.severity === 'error' ? '✖' : '⚠'
        }}</span>
        <span class="row">{{ problem.row }}行目</span>
        <span class="message">{{ problem.message }}</span>
        <span class="context">{{ problem.context }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'

const dataStore = useDataStore()
const { problems } = storeToRefs(dataStore)

const errorCount = computed(
  () => problems.value.filter((p) => p.severity === 'error').length,
)
const warningCount = computed(
  () => problems.value.filter((p) => p.severity === 'warning').length,
)
</script>

<style scoped>
.problems-panel {
  --color-error: #d32f2f;
  --color-error-light: #fdecea;
  --color-warning: #f9a825;
  --color-warning-light: #fff8e1;

  font-family: sans-serif;
  font-size: 14px;
  max-height: 240px;
  overflow-y: auto;
  border-bottom: 3px solid;
  background-color: #fff;

  &.is-error {
    border-color: var(--color-error);

    .header {
      background-color: var(--color-error);
      color: #fff;
    }
  }

  &.is-warning {
    border-color: var(--color-warning);

    .header {
      background-color: var(--color-warning);
      color: #000;
    }
  }

  .header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;

    .title {
      font-weight: bold;
      font-size: 15px;
    }

    .count {
      padding: 1px 8px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.85);
      color: #000;
      font-size: 13px;
      font-weight: bold;
    }
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .problem {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 5px 10px;
    border-left: 5px solid;
    border-bottom: 1px solid #fff;

    &.is-error {
      border-left-color: var(--color-error);
      background-color: var(--color-error-light);

      .icon {
        color: var(--color-error);
      }
    }

    &.is-warning {
      border-left-color: var(--color-warning);
      background-color: var(--color-warning-light);

      .icon {
        color: #b8860b;
      }
    }

    .icon {
      flex-shrink: 0;
    }

    .row {
      flex-shrink: 0;
      min-width: 4em;
      font-weight: bold;
      font-family: var(--font-family-number);
    }

    .message {
      flex: 1;
    }

    .context {
      color: #666;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
    }
  }
}

@media print {
  .problems-panel {
    display: none;
  }
}
</style>
