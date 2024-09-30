<template>
  <ControlUI />
  <Page>
    <SummaryContent />
  </Page>
  <Page>
    <Columns2>
      <div class="col-p2-left">
        <Category
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.繰越金,
            )
          "
          noFooter
          noSum
        >
          <template v-slot:title>②繰越金</template>
        </Category>
        <Category
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.内部収入,
            )
          "
        >
          <template v-slot:title>③内部収入</template>
        </Category>
      </div>
      <div class="col-p2-right">
        <Category
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.外部収入,
            )
          "
        >
          <template v-slot:title>④外部収入</template>
        </Category>
        <Category
          :transactions="
            transactions.filter(
              (t) => t.category === TransactionCategory.その他収入,
            )
          "
          :sumFooterRows="[, , { label: '①総収入', value: '¥' + 1000 }]"
        >
          <template v-slot:title>⑤その他</template>
          <template v-slot:footer> </template>
        </Category>
      </div>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.大会参加連盟加盟費,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '18']"
      >
        <template v-slot:title>⑦大会参加連盟加盟費</template>
      </Category>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.施設機材使用料,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '19']"
      >
        <template v-slot:title>⑧施設機材使用料</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.謝礼費)
        "
        withNumberColumn
        :sumFooterRowLabels="['', '20']"
        :additionalPurposeColumns="[{ header: '相手先', key: 'recipient' }]"
      >
        <template v-slot:title>⑨謝礼費</template>
      </Category>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.通信運搬費,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '21']"
        :additionalPurposeColumns="[
          { header: '用途', key: 'transportPurpose' },
        ]"
      >
        <template v-slot:title>⑩通信運搬費</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.印刷製本費,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '22']"
        :additionalPurposeColumns="[{ header: '目的', key: 'printPurpose' }]"
      >
        <template v-slot:title>⑪印刷製本費</template>
      </Category>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.用具等購入費,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '23']"
        :additionalPurposeColumns="[{ header: '所有者', key: 'owner' }]"
      >
        <template v-slot:title>⑫用具等購入費</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.書籍費)
        "
        withNumberColumn
        :sumFooterRowLabels="['', '24']"
      >
        <template v-slot:title>⑬書籍費</template>
      </Category>
      <Category
        :transactions="
          transactions.filter(
            (t) => t.category === TransactionCategory.その他支出,
          )
        "
        withNumberColumn
        :sumFooterRowLabels="['', '25']"
      >
        <template v-slot:title>⑭その他</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.宿泊費)
        "
        withNumberColumn
        :sumFooterRowLabels="['', '26']"
        :additionalPurposeColumns="[{ header: '延べ宿泊数', key: 'numStay' }]"
      >
        <template v-slot:title>⑯宿泊費</template>
      </Category>
      <Category
        :transactions="
          transactions.filter((t) => t.category === TransactionCategory.交通費)
        "
        withNumberColumn
        :sumFooterRowLabels="['', '27']"
      >
        <template v-slot:title>⑰交通費</template>
      </Category>
    </Columns2>
  </Page>
  <DragDropImporter />
</template>

<script setup lang="ts">
import Page from './components/Page.vue'
import Columns2 from './components/Columns2.vue'
import Category from './components/Category.vue'
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
