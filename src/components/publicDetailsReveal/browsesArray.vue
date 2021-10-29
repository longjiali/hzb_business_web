<template>
  <div class="browses-array">
    <template v-if='listData.isBrowse'>
      <div class='browses-array-item' v-for='(item, index) in modelDataList[listData.model]' :key='index'>
        <el-descriptions :column="listData.column" size="small" border>
          <el-descriptions-item v-for='(Titem, Tindex) in listData.children' :key="Tindex">
            <template slot="label">
              {{Titem.name}}
            </template>
            <template>
              <template v-if='!item[Titem.model]'>
                无
              </template>
              <template v-else>
                <texrFrom :item='Titem' :params='item'></texrFrom>
              </template>
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    <template v-else>
      <div class='browses-array-item' v-for='(item, index) in modelDataList[listData.model]' :key='index'>
        <el-descriptions :column="column" size="small" border>
          <el-descriptions-item v-for='(Titem, Tindex) in listData.children' :key="Tindex">
            <template slot="label">
              {{Titem.name}}
            </template>
            <template>
              <texrFrom :item='Titem' :params='item'></texrFrom>
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
  </div>
</template>

<script>
import texrFrom from './textFrom'
import browseReveal from './browseReveal'

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
    texrFrom,
    browseReveal
  }
}
</script>

<style lang='scss' scoped>
.browses-array {
  .browses-array-item {
    margin-top: 15px;
  }
  ::v-deep .el-descriptions-item__label {
    width: 100px !important;
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