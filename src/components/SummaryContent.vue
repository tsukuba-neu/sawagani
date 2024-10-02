<template>
  <header class="summary-header">
    <div class="flex-root">
      <div class="var-field">
        <span class="label">団体名</span>
        <EditableField
          v-model="orgName"
          centered
          placeholder="記入例作成同好会"
          required
        />
      </div>
      <div class="var-field">
        <EditableField
          v-model="title"
          centered
          placeholder="4～6月分収支計算書"
          required
        />
      </div>
      <div>
        <span class="spacer spacer--4"></span>年<span
          class="spacer spacer--2"
        ></span
        >月<span class="spacer spacer--2"></span>日提出
      </div>
    </div>
    <div class="signature-container">
      <div class="signature">
        <div class="label">顧問または担当教員</div>
        <div class="name">氏名</div>
        <EditableField
          v-model="advisorName"
          placeholder="山田 太郎"
          required
          centered
        />
        <div class="stamp">印</div>
      </div>
      <div class="signature">
        <div class="label">代表者</div>
        <div class="name">氏名</div>
        <EditableField
          v-model="representativeName"
          placeholder="田中 次郎"
          required
          centered
        />
        <div class="stamp">印</div>
      </div>
      <div class="signature">
        <div class="label">会計責任者</div>
        <div class="name">氏名</div>
        <EditableField
          v-model="accountantName"
          placeholder="佐藤 三郎"
          required
          centered
        />
        <div class="stamp">印</div>
      </div>
    </div>
  </header>
  <div class="summary-body">
    <SummaryTable />
    <div class="comments">
      <div class="comment-box comment-org">
        <div>意見・説明等記入欄（各団体の会計より）</div>
        <EditableField v-model="orgComment" multiline />
      </div>
      <div class="comment-box comment-staff">
        <div>この欄には記入しないこと(財務局使用)<br />※チェック者所見</div>
        <div>・記入方法</div>
        <div>・計算</div>
        <div>・領収書</div>
        <div>・その他</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../store/data'
import SummaryTable from './SummaryTable.vue'
import EditableField from './EditableField.vue'

const dataStore = useDataStore()
const {
  orgName,
  advisorName,
  representativeName,
  accountantName,
  title,
  orgComment,
} = storeToRefs(dataStore)
</script>

<style scoped>
.spacer {
  display: inline-block;
}

.spacer--2 {
  width: 2em;
}

.spacer--4 {
  width: 4em;
}

.var-field {
  display: inline-flex;
  border-bottom: 1px solid;
  min-width: 20em;
  margin: 0 1em 0 0;

  * {
    flex: 1 1 auto;
  }

  label {
    flex: 0 0 auto;
  }
}

.flex-root {
  display: flex;
  justify-content: space-between;
}

.signature-container {
  margin-left: 40%;
}

.signature {
  display: grid;
  margin: 1em 0;
  grid-template-columns: 10em auto 1fr 1em;
  gap: 0 1em;
}

.summary-body {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 0 10pt;
}

.comments {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10pt 0;
}

.comment-box {
  border: 1px solid;
}

.comment-org {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.5em;
}

.comment-staff {
  display: grid;
  grid-template-rows: auto 1fr 1fr 1fr 1fr;
  gap: 0;
}
</style>
