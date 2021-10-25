<template>
  <div class='browse-reveal'>
    <el-descriptions :column="column" size="small" border>
      <el-descriptions-item v-for='(item, index) in listData.children' :key="index">
        <template slot="label">
          {{item.name}}
        </template>
        <template>
          <template v-if='!modelDataList[item.key]'>
            <!-- {{item.model}} -->
            无
          </template>
          <template v-else>
            <template v-if='!modelDataList[item.key][item.model]'>
              无
            </template>
            <template v-else>
              <texrFrom :item='item' :params='modelDataList[item.key]'></texrFrom>
              <!-- {{modelDataList[item.key][item.model]}} -->
            </template>
          </template>
          <!-- 测试的 -->
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import texrFrom from './textFrom'
export default {
  props: {
    listData: {
      type: Object,
      default: () => { return {} }
    },
    modelDataList: {
      type: Object,
      default: () => { return {} }
    },
    column: {
      type: Number,
      default: 3
    }
  },
  components: {
    texrFrom
  }
}
</script>

<style lang='scss' scoped>
.browse-reveal {
  ::v-deep .el-descriptions-item__label {
    width: 120px !important;
    text-align: center !important;
  }
  ::v-deep .el-descriptions-item__content {
    padding: 10;
  }
  ::v-deep .is-bordered {
    table-layout: fixed !important;
  }
}
</style>