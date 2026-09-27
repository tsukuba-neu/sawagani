<template>
  <div v-if="problems.length > 0" class="problems-panel">
    <div class="header">
      <span class="title">問題</span>
      <span v-if="errorCount > 0" class="count is-error">
        <span class="icon" aria-hidden="true">✖</span>{{ errorCount }}
      </span>
      <span v-if="warningCount > 0" class="count is-warning">
        <span class="icon" aria-hidden="true">⚠</span>{{ warningCount }}
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
  background-color: #f8f8f8;
  border-bottom: 1px solid #ccc;
  font-family: sans-serif;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;

  .header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 10px;
    background-color: #eee;
    border-bottom: 1px solid #ccc;

    .title {
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
    gap: 6px;
    padding: 3px 10px;
    border-bottom: 1px solid #eee;

    &:hover {
      background-color: #eee;
    }

    .message {
      flex: 1;
    }

    .context {
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
    }

    .row {
      flex-shrink: 0;
      min-width: 4em;
      color: #666;
      font-family: var(--font-family-number);
    }
  }

  .icon {
    flex-shrink: 0;
    margin-right: 3px;
  }

  .is-error .icon {
    color: #d32f2f;
  }

  .is-warning .icon {
    color: #b8860b;
  }
}

@media print {
  .problems-panel {
    display: none;
  }
}
</style>
