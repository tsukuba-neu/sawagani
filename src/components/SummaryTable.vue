<template>
  <div class="summary-table border-wrap">
    <div class="border centered">頁</div>
    <div class="border" style="grid-row: 1; grid-column: 2"></div>
    <div
      class="border centered border-right-bold"
      style="grid-row: 1; grid-column: 3"
    >
      合計金額
    </div>
    <div class="border centered" style="grid-row: 1; grid-column: 4">
      この欄は無記入
    </div>

    <div
      class="border centered border-bottom-bold"
      style="grid-row: 2/7; grid-column: 1"
    >
      2
    </div>
    <div class="border centered" style="grid-row: 7; grid-column: 1"></div>
    <div class="border centered" style="grid-row: 8/10; grid-column: 1">3</div>
    <div class="border centered" style="grid-row: 10/12; grid-column: 1">4</div>
    <div class="border centered" style="grid-row: 12/14; grid-column: 1">5</div>
    <div
      class="border centered border-bottom-bold"
      style="grid-row: 14/16; grid-column: 1"
    >
      6
    </div>
    <div
      class="border centered border-bottom-double"
      style="grid-row: 16; grid-column: 1"
    ></div>
    <div class="border centered" style="grid-row: 17/19; grid-column: 1">7</div>
    <div class="border centered" style="grid-row: 19/21; grid-column: 1"></div>
    <div class="border centered" style="grid-row: 21/26; grid-column: 1">
      繰越金内訳
    </div>

    <div
      class="border centered-v table-cell-pad border-bottom-double"
      style="grid-row: 2; grid-column: 2"
    >
      ①総収入
    </div>
    <NumSplitField
      style="grid-row: 2; grid-column: 3"
      class="border-bottom-double border-right-bold"
    >
      ¥{{ ingress }}
    </NumSplitField>
    <NumSplitField
      style="grid-row: 2; grid-column: 4"
      class="border-bottom-double"
    />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 3; grid-column: 2"
    >
      ②繰越金
    </div>
    <NumSplitField
      style="grid-row: 3; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.繰越金) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 3; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 4; grid-column: 2"
    >
      ③内部収入
    </div>
    <NumSplitField
      style="grid-row: 4; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.内部収入) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 4; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 5; grid-column: 2"
    >
      ④外部収入
    </div>
    <NumSplitField
      style="grid-row: 5; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.外部収入) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 5; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad border-bottom-bold"
      style="grid-row: 6; grid-column: 2"
    >
      ⑤その他
    </div>
    <NumSplitField
      style="grid-row: 6; grid-column: 3"
      class="border-bottom-bold border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.その他収入) }}
    </NumSplitField>
    <NumSplitField
      style="grid-row: 6; grid-column: 4"
      class="border-bottom-bold"
    />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 7; grid-column: 2"
    >
      ⑥一般総支出（⑦～⑭）
    </div>
    <NumSplitField
      style="grid-row: 7; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ generalEgress }}
    </NumSplitField>
    <NumSplitField style="grid-row: 7; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 8; grid-column: 2"
    >
      ⑦大会参加連盟加盟費
    </div>
    <NumSplitField
      style="grid-row: 8; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.大会参加連盟加盟費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 8; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 9; grid-column: 2"
    >
      ⑧施設機材使用料
    </div>
    <NumSplitField
      style="grid-row: 9; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.施設機材使用料) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 9; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 10; grid-column: 2"
    >
      ⑨謝礼費
    </div>
    <NumSplitField
      style="grid-row: 10; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.謝礼費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 10; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 11; grid-column: 2"
    >
      ⑩通信運搬費
    </div>
    <NumSplitField
      style="grid-row: 11; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.通信運搬費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 11; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 12; grid-column: 2"
    >
      ⑪印刷製本費
    </div>
    <NumSplitField
      style="grid-row: 12; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.印刷製本費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 12; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 13; grid-column: 2"
    >
      ⑫用具等購入費
    </div>
    <NumSplitField
      style="grid-row: 13; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.用具等購入費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 13; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 14; grid-column: 2"
    >
      ⑬書籍費
    </div>
    <NumSplitField
      style="grid-row: 14; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.書籍費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 14; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad border-bottom-bold"
      style="grid-row: 15; grid-column: 2"
    >
      ⑭その他
    </div>
    <NumSplitField
      style="grid-row: 15; grid-column: 3"
      class="border-bottom-bold border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.その他支出) }}
    </NumSplitField>
    <NumSplitField
      style="grid-row: 15; grid-column: 4"
      class="border-bottom-bold"
    />

    <div
      class="border centered-v table-cell-pad border-bottom-double"
      style="grid-row: 16; grid-column: 2"
    >
      ⑮遠征総支出（⑯+⑰）
    </div>
    <NumSplitField
      style="grid-row: 16; grid-column: 3"
      class="border-bottom-double border-right-bold"
    >
      ¥{{ expeditionEgress }}
    </NumSplitField>
    <NumSplitField
      style="grid-row: 16; grid-column: 4"
      class="border-bottom-double"
    />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 17; grid-column: 2"
    >
      ⑯宿泊費
    </div>
    <NumSplitField
      style="grid-row: 17; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.宿泊費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 17; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 18; grid-column: 2"
    >
      ⑰交通費
    </div>
    <NumSplitField
      style="grid-row: 18; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ getCategorySum(TransactionCategory.交通費) }}
    </NumSplitField>
    <NumSplitField style="grid-row: 18; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad border-bottom-bold"
      style="grid-row: 19; grid-column: 2"
    >
      総支出（⑥+⑮）
    </div>
    <NumSplitField
      style="grid-row: 19; grid-column: 3"
      class="border-bottom-bold border-right-bold"
    >
      ¥{{ generalEgress + expeditionEgress }}
    </NumSplitField>
    <NumSplitField
      style="grid-row: 19; grid-column: 4"
      class="border-bottom-bold"
    />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 20; grid-column: 2"
    >
      翌月への繰越金
    </div>
    <NumSplitField
      style="grid-row: 20; grid-column: 3"
      class="border-right-bold"
    >
      ¥{{ ingress - generalEgress - expeditionEgress }}
    </NumSplitField>
    <NumSplitField style="grid-row: 20; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 21; grid-column: 2"
    >
      現金
    </div>
    <NumSplitField
      style="grid-row: 21; grid-column: 3"
      class="border-right-bold"
    >
      <EditableField v-model="cashAmount" prefix="¥" />
    </NumSplitField>
    <NumSplitField style="grid-row: 21; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 22; grid-column: 2"
    >
      郵便貯金
    </div>
    <NumSplitField
      style="grid-row: 22; grid-column: 3"
      class="border-right-bold"
    >
      <EditableField v-model="postalSavingsAmount" prefix="¥" />
    </NumSplitField>
    <NumSplitField style="grid-row: 22; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 23; grid-column: 2"
    >
      預金（<EditableField
        v-model="bank1Name"
        placeholder="サンプル銀行"
        allowOverflow
      />）
    </div>
    <NumSplitField
      style="grid-row: 23; grid-column: 3"
      class="border-right-bold"
    >
      <EditableField v-model="bank1Amount" prefix="¥" />
    </NumSplitField>
    <NumSplitField style="grid-row: 23; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 24; grid-column: 2"
    >
      預金（<EditableField
        v-model="bank2Name"
        placeholder="サンプル銀行"
        allowOverflow
      />）
    </div>
    <NumSplitField
      style="grid-row: 24; grid-column: 3"
      class="border-right-bold"
    >
      <EditableField v-model="bank2Amount" prefix="¥" />
    </NumSplitField>
    <NumSplitField style="grid-row: 24; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 25; grid-column: 2"
    >
      その他
    </div>
    <NumSplitField
      style="grid-row: 25; grid-column: 3"
      class="border-right-bold"
    >
      <EditableField v-model="otherAmount" prefix="¥" />
    </NumSplitField>
    <NumSplitField style="grid-row: 25; grid-column: 4" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import NumSplitField from './NumSplitField.vue'
import { TransactionCategory } from '../types/transaction'
import { computed } from 'vue'
import EditableField from './EditableField.vue'

const dataStore = useDataStore()
const {
  cashAmount,
  postalSavingsAmount,
  bank1Amount,
  bank2Amount,
  otherAmount,
  bank1Name,
  bank2Name,
  transactions,
} = storeToRefs(dataStore)

const getCategorySum = (category: TransactionCategory) =>
  transactions.value
    .filter((t) => t.category === category)
    .reduce((acc, t) => acc + t.amount, 0)

const ingress = computed(() =>
  [
    TransactionCategory.繰越金,
    TransactionCategory.内部収入,
    TransactionCategory.外部収入,
    TransactionCategory.その他収入,
  ].reduce((acc, category) => acc + getCategorySum(category), 0),
)

const generalEgress = computed(() =>
  [
    TransactionCategory.大会参加連盟加盟費,
    TransactionCategory.施設機材使用料,
    TransactionCategory.謝礼費,
    TransactionCategory.通信運搬費,
    TransactionCategory.印刷製本費,
    TransactionCategory.用具等購入費,
    TransactionCategory.書籍費,
    TransactionCategory.その他支出,
  ].reduce((acc, category) => acc + getCategorySum(category), 0),
)

const expeditionEgress = computed(() =>
  [TransactionCategory.宿泊費, TransactionCategory.交通費].reduce(
    (acc, category) => acc + getCategorySum(category),
    0,
  ),
)
</script>

<style scoped>
.summary-table {
  display: grid;
  grid-template-columns: 20pt auto repeat(2, calc(var(--num-place-width) * 9));
  grid-template-rows: repeat(25, 28pt);
}
</style>
