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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
    />
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
      <input type="text" class="editable-field" v-model="cashAmount" />
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
      <input type="text" class="editable-field" v-model="postalSavingsAmount" />
    </NumSplitField>
    <NumSplitField style="grid-row: 22; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 23; grid-column: 2"
    >
      預金（<input
        type="text"
        class="editable-field"
        v-model="bank1Name"
        size="10"
        placeholder="サンプル銀行"
      />）
    </div>
    <NumSplitField
      style="grid-row: 23; grid-column: 3"
      class="border-right-bold"
    >
      <input type="text" class="editable-field" v-model="bank1Amount" />
    </NumSplitField>
    <NumSplitField style="grid-row: 23; grid-column: 4" />

    <div
      class="border centered-v table-cell-pad"
      style="grid-row: 24; grid-column: 2"
    >
      預金（<input
        type="text"
        class="editable-field"
        v-model="bank2Name"
        size="10"
        placeholder="サンプル銀行"
      />）
    </div>
    <NumSplitField
      style="grid-row: 24; grid-column: 3"
      class="border-right-bold"
    >
      <input type="text" class="editable-field" v-model="bank2Amount" />
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
      <input type="text" class="editable-field" v-model="otherAmount" />
    </NumSplitField>
    <NumSplitField style="grid-row: 25; grid-column: 4" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import NumSplitField from './NumSplitField.vue'

const dataStore = useDataStore()
const {
  cashAmount,
  postalSavingsAmount,
  bank1Amount,
  bank2Amount,
  otherAmount,
  bank1Name,
  bank2Name,
} = storeToRefs(dataStore)
</script>

<style scoped>
.summary-table {
  display: grid;
  grid-template-columns: 20pt auto repeat(2, calc(var(--num-place-width) * 9));
  grid-template-rows: repeat(25, 28pt);
}
</style>
