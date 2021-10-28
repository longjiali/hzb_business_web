<template>
  <div class="public-details-reveal">
    <div class="details-reveal-item" v-for='(item, index) in listData.children' :key="index">
      <div class="reveal-item-header" v-if='item.name'>
        <div class='item-header-icon'></div>
        {{ item.name }}
      </div>
      <div class="reveal-item-bar">
        <template v-if='item.type === "publicDetalisTable"'>
          <publicDetalisTable :listData='item.children' :modelListData='modelListData'></publicDetalisTable>
        </template>
        <template v-if='item.type === "publicDetalisTables"'>
          <detailsTables :listData='item' :modelListData='modelListData'></detailsTables>
        </template>
        <template v-if='item.type === "browse"'>
          <browseReveal :listData='item' :modelDataList='modelListData' :column='item.column || 3'></browseReveal>
        </template>
        <template v-if='item.type === "browses"'>
          <browsesArray :listData='item' :modelDataList='modelListData' :column='item.column || 3'></browsesArray>
          <!-- <browsesArray :listData='item' :modelDataList='modelListData' :column='item.column || 3'></browsesArray> -->
        </template>
        <template v-if='item.type === "collapse"'>
          <collapseReveal :listData='item' :modelDataList='modelListData'></collapseReveal>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import publicDetalisTable from '@/components/publicDetailsTable/index'
import detailsTables from './detailsTables'
import browseReveal from './browseReveal'
import collapseReveal from './collapseReveal'
import browsesArray from './browsesArray'
export default {
  props: {
    listData: {
      type: Object,
      default: () => { return {} }
    },
    modelListData: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    publicDetalisTable,
    browseReveal,
    collapseReveal,
    detailsTables,
    browsesArray
  }
}
</script>

<style lang='scss' scoped>
.public-details-reveal {
  .details-reveal-item {
    margin-top: 20px;
    .reveal-item-header {
      height: 48px;
      background: #F5F5F5;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #222222;
      .item-header-icon {
        flex: 0 0 auto;
        width: 4px;
        height: 14px;
        background: #3B73E6;
        border-radius: 2px;
        margin-right: 8px;
      }
    }
    .reveal-item-bar {
      margin-top: 10px;
    }
  }
}
</style>