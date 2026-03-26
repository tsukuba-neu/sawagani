<template>
  <div v-if="problems.length > 0" class="problems-panel">
    <div class="problems-header">
      <span class="problems-title">問題</span>
      <span class="problems-count">
        <span v-if="errorCount > 0" class="count error">
          <span class="icon" aria-hidden="true">✖</span>{{ errorCount }}
        </span>
        <span v-if="warningCount > 0" class="count warning">
          <span class="icon" aria-hidden="true">⚠</span>{{ warningCount }}
        </span>
      </span>
    </div>
    <ul class="problems-list" role="list" aria-label="問題一覧">
      <li
        v-for="(problem, i) in problems"
        :key="i"
        class="problem-item"
        :class="problem.severity"
      >
        <span class="problem-icon" aria-hidden="true">{{
          problem.severity === 'error' ? '✖' : '⚠'
        }}</span>
        <span class="problem-message">{{ problem.message }}</span>
        <span class="problem-context">
          {{ problem.transaction.date }}
          {{ problem.transaction.description }}
        </span>
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
  background-color: #252526;
  color: #cccccc;
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
  border-top: 1px solid #3c3c3c;
}

.problems-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #3c3c3c;
  position: sticky;
  top: 0;
}

.problems-title {
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9d9d9d;
}

.problems-count {
  display: flex;
  gap: 8px;
}

.count {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
}

.count.error {
  color: #f14c4c;
}

.count.warning {
  color: #cca700;
}

.problems-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.problem-item {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 3px 10px;
  border-bottom: 1px solid #2d2d2d;
  cursor: default;
}

.problem-item:hover {
  background-color: #2a2d2e;
}

.problem-icon {
  flex-shrink: 0;
  font-size: 10px;
}

.problem-item.error .problem-icon {
  color: #f14c4c;
}

.problem-item.warning .problem-icon {
  color: #cca700;
}

.problem-message {
  flex: 1;
}

.problem-context {
  color: #6a9955;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

@media print {
  .problems-panel {
    display: none;
  }
}
</style>
