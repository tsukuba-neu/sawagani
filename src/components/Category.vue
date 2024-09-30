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
        :additionalColumns="
          props.additionalPurposeColumns?.map((c) => c.header)
        "
      />
      <TableColumnAmount :noFooter="props.noSum" />
      <TableColumnDoNotWrite :noFooter="props.noSum" />
      <div class="text-rows">
        <div v-for="transaction of props.transactions" class="table-row">
          <TableTextDate :value="transaction.date"></TableTextDate>
          <TableTextNumber
            v-if="props.withNumberColumn"
            :value="transaction.receipt"
          />
          <TableTextPurpose
            :additionalColumns="
              props.additionalPurposeColumns?.map(
                (c) => transaction[c.key] as string,
              )
            "
            :value="transaction.description"
          ></TableTextPurpose>
          <TableTextAmount :value="transaction.amount"></TableTextAmount>
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
          {{ props.sumFooterRows?.[i - 1]?.label }}
        </div>
      </div>
      <div class="table-column--amount">
        <div v-for="i in sumFooterRowLength" class="spacer">
          <NumSplitField :n="9">
            {{ props.sumFooterRows?.[i - 1]?.value }}
          </NumSplitField>
        </div>
      </div>
      <div class="table-column--do-not-write">
        <div v-for="_ in sumFooterRowLength" class="border spacer"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
import { Transaction } from '../types/transaction'
import NumSplitField from './NumSplitField.vue'

const props = defineProps<{
  noFooter?: boolean
  noSum?: boolean
  withNumberColumn?: boolean
  additionalPurposeColumns?: { header: string; key: keyof Transaction }[]
  sumFooterRows?: (
    | {
        label: string
        value?: string | number
      }
    | undefined
  )[]
  transactions: Transaction[]
}>()

const sumFooterRowLength = props.sumFooterRows?.length || 2
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
