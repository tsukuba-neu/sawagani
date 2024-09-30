<template>
  <Page>
    <SummaryContent />
  </Page>
  <Page>
    <Columns2>
      <div class="col-p2-left">
        <Category noFooter noSum>
          <template v-slot:title>②繰越金</template>
        </Category>
        <Category>
          <template v-slot:title>③内部収入</template>
        </Category>
      </div>
      <div class="col-p2-right">
        <Category>
          <template v-slot:title>④外部支出</template>
        </Category>
        <Category :sumFooterRowLabels="['', '', '①総収入']">
          <template v-slot:title>⑤その他</template>
          <template v-slot:footer> </template>
        </Category>
      </div>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category withNumberColumn :sumFooterRowLabels="['', '18']">
        <template v-slot:title>⑦大会参加連盟加盟費</template>
      </Category>
      <Category withNumberColumn :sumFooterRowLabels="['', '19']">
        <template v-slot:title>⑧施設機材使用料</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        withNumberColumn
        :sumFooterRowLabels="['', '20']"
        :additionalPurposeColumns="['相手先']"
      >
        <template v-slot:title>⑨謝礼費</template>
      </Category>
      <Category
        withNumberColumn
        :sumFooterRowLabels="['', '21']"
        :additionalPurposeColumns="['用途']"
      >
        <template v-slot:title>⑩通信運搬費</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        withNumberColumn
        :sumFooterRowLabels="['', '22']"
        :additionalPurposeColumns="['目的']"
      >
        <template v-slot:title>⑪印刷製本費</template>
      </Category>
      <Category
        withNumberColumn
        :sumFooterRowLabels="['', '23']"
        :additionalPurposeColumns="['所有者']"
      >
        <template v-slot:title>⑫用具等購入費</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category withNumberColumn :sumFooterRowLabels="['', '24']">
        <template v-slot:title>⑬書籍費</template>
      </Category>
      <Category withNumberColumn :sumFooterRowLabels="['', '25']">
        <template v-slot:title>⑭その他</template>
      </Category>
    </Columns2>
  </Page>
  <Page>
    <Columns2>
      <Category
        withNumberColumn
        :sumFooterRowLabels="['', '26']"
        :additionalPurposeColumns="['延べ宿泊数']"
      >
        <template v-slot:title>⑯宿泊費</template>
      </Category>
      <Category withNumberColumn :sumFooterRowLabels="['', '27']">
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
