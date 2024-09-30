<template>
  <div class="category-box">
    <header class="title">
      <slot name="title" />
    </header>
    <main class="table border-wrap">
      <TableColumnDate :noFooter="props.noSum" />
      <TableColumnNumber
        v-if="props.withNumberColumn"
        :noFooter="props.noSum"
      />
      <TableColumnPurpose
        :noFooter="props.noSum"
        :additionalColumns="props.additionalPurposeColumns"
      />
      <TableColumnAmount :noFooter="props.noSum" />
      <TableColumnDoNotWrite :noFooter="props.noSum" />
      <div class="text-rows">
        <div class="table-row">
          <TableTextDate value="0506"></TableTextDate>
          <TableTextNumber v-if="props.withNumberColumn" value="1" />
          <TableTextPurpose
            :additionalColumns="props.additionalPurposeColumns"
            :value="`前月からの繰越金`"
          ></TableTextPurpose>
          <TableTextAmount :value="10000"></TableTextAmount>
          <TableTextDoNotWrite />
        </div>
      </div>
    </main>
    <footer v-if="!props.noFooter" class="table border-wrap sum-footer">
      <div class="border centered table-column--date">
        この欄には記入しないこと
      </div>
      <div class="table-column--purpose">
        <div
          v-for="i in sumFooterRowLength"
          class="border spacer"
          :class="{
            centered: i >= 3,
          }"
        >
          {{ props.sumFooterRowLabels?.[i - 1] }}
        </div>
      </div>
      <div class="table-column--amount">
        <div v-for="_ in sumFooterRowLength" class="spacer">
          <NumSplit :n="9" />
        </div>
      </div>
      <div class="table-column--do-not-write">
        <div v-for="_ in sumFooterRowLength" class="border spacer"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import NumSplit from './NumSplit.vue'
import TableColumnAmount from './TableColumnAmount.vue'
import TableColumnDate from './TableColumnDate.vue'
import TableColumnDoNotWrite from './TableColumnDoNotWrite.vue'
import TableColumnNumber from './TableColumnNumber.vue'
import TableColumnPurpose from './TableColumnPurpose.vue'
import TableTextDate from './TableTextDate.vue'
import TableTextPurpose from './TableTextPurpose.vue'
import TableTextAmount from './TableTextAmount.vue'
import TableTextDoNotWrite from './TableTextDoNotWrite.vue'
import TableTextNumber from './TableTextNumber.vue'

const props = defineProps<{
  noFooter?: boolean
  noSum?: boolean
  withNumberColumn?: boolean
  additionalPurposeColumns?: string[]
  sumFooterRowLabels?: string[]
}>()

const sumFooterRowLength = props.sumFooterRowLabels?.length || 2
</script>

<style scoped>
.category-box {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  .title {
    padding-top: 10pt;
    padding-bottom: 3pt;
    flex-grow: 0;
  }

  main {
    flex-grow: 1;
    position: relative;

    .text-rows {
      position: absolute;
      top: 35pt;
      left: 0;
      width: 100%;

      .table-row {
        display: flex;
      }
    }
  }

  footer {
    flex: 0 0 auto;
    display: flex;

    .spacer {
      height: 30pt;
    }
  }
}
</style>
