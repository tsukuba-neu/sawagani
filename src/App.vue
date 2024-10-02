<template>
  <ControlUI />
  <DocumentPage>
    <SummaryContent />
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <div class="col-p2-left">
        <CategorySection
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.繰越金,
            )
          "
          no-footer
          no-sum
        >
          <template #title>②繰越金</template>
        </CategorySection>
        <CategorySection
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.内部収入,
            )
          "
        >
          <template #title>③内部収入</template>
        </CategorySection>
      </div>
      <div class="col-p2-right">
        <CategorySection
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.外部収入,
            )
          "
        >
          <template #title>④外部収入</template>
        </CategorySection>
        <CategorySection
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.その他収入,
            )
          "
          :sum-footer-rows="[, , { label: '①総収入', value: '¥' + 1000 }]"
        >
          <template #title>⑤その他</template>
          <template #footer> </template>
        </CategorySection>
      </div>
    </VColumns2>
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.大会参加連盟加盟費,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '18']"
      >
        <template #title>⑦大会参加連盟加盟費</template>
      </CategorySection>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.施設機材使用料,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '19']"
      >
        <template #title>⑧施設機材使用料</template>
      </CategorySection>
    </VColumns2>
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <CategorySection
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.謝礼費)
        "
        with-number-column
        :sum-footer-row-labels="['', '20']"
        :additional-purpose-columns="[{ header: '相手先', key: 'recipient' }]"
      >
        <template #title>⑨謝礼費</template>
      </CategorySection>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.通信運搬費,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '21']"
        :additional-purpose-columns="[
          { header: '用途', key: 'transportPurpose' },
        ]"
      >
        <template #title>⑩通信運搬費</template>
      </CategorySection>
    </VColumns2>
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.印刷製本費,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '22']"
        :additional-purpose-columns="[{ header: '目的', key: 'printPurpose' }]"
      >
        <template #title>⑪印刷製本費</template>
      </CategorySection>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.用具等購入費,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '23']"
        :additional-purpose-columns="[{ header: '所有者', key: 'owner' }]"
      >
        <template #title>⑫用具等購入費</template>
      </CategorySection>
    </VColumns2>
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <CategorySection
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.書籍費)
        "
        with-number-column
        :sum-footer-row-labels="['', '24']"
      >
        <template #title>⑬書籍費</template>
      </CategorySection>
      <CategorySection
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.その他支出,
          )
        "
        with-number-column
        :sum-footer-row-labels="['', '25']"
      >
        <template #title>⑭その他</template>
      </CategorySection>
    </VColumns2>
  </DocumentPage>
  <DocumentPage>
    <VColumns2>
      <CategorySection
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.宿泊費)
        "
        with-number-column
        :sum-footer-row-labels="['', '26']"
        :additional-purpose-columns="[{ header: '延べ宿泊数', key: 'numStay' }]"
      >
        <template #title>⑯宿泊費</template>
      </CategorySection>
      <CategorySection
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.交通費)
        "
        with-number-column
        :sum-footer-row-labels="['', '27']"
      >
        <template #title>⑰交通費</template>
      </CategorySection>
    </VColumns2>
  </DocumentPage>
  <DragDropImporter />
</template>

<script setup lang="ts">
import DocumentPage from './components/DocumentPage.vue'
import VColumns2 from './components/VColumns2.vue'
import CategorySection from './components/CategorySection.vue'
import SummaryContent from './components/SummaryContent.vue'
import DragDropImporter from './components/DragDropImporter.vue'
import ControlUI from './components/ControlUI.vue'
import { useDataStore } from './store/data'
import { TransactionCategory } from './types/transaction'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const { transactions } = storeToRefs(dataStore)
</script>

<style scoped>
.col-p2-left {
  display: grid;
  grid-template-rows: auto 1fr;
}

.col-p2-right {
  display: grid;
  grid-template-rows: 3fr 2fr;
}
</style>
