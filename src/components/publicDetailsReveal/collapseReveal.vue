<template>
  <div class="collapse-reveal">
    <template v-if='listData.isTable'>
      <div class="collapse-reveal-item_table" v-for='(item, index) in listData.children' :key='index'>
        <div class='reveal-item-header'>
          <div class='item-header-icon'></div>
          {{ item.name }}
        </div>
        <div class="reveal-item-table">
          <el-table :data='modelDataList[item.model]' border style="width: 100%;" :size='"mini"' :header-cell-style="pageTableHead">
            <el-table-column :prop="Titem.model" :fixed='Titem.fixed' :label="Titem.name" :width="item.width" v-for='(Titem, Tindex) in item.children' :key='Tindex'>
              <template slot-scope="scope">
                <template v-if='Titem.model === "order" '>
                  {{ Tindex + 1 }}
                </template>
                <template v-else>
                  <template v-if='Titem.type'>
                    {{ publicEnCode(scope.row[Titem.model], Titem.type) }}
                  </template>
                  <template v-else>
                    <template v-if='scope.row[Titem.model] === 0'>
                      {{ scope.row[Titem.model] }}
                    </template>
                    <template v-else>
                      {{scope.row[Titem.model] || '无'}}
                    </template>
                  </template>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
    <div class="collapse-reveal-item" v-else>
      <el-collapse v-if='modelDataList[listData.model] && listData.model.length'>
        <el-collapse-item :title="getCollapseTitle(item, listData)" :name='index' v-for="(item, index) in modelDataList[listData.model]" :key='index'>
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
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import texrFrom from './textFrom'
import * as publicPageTool from '@/utils/publicPageTool'

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
  },
  methods: {
    /**
     * @name 公共转编码
     */
    publicEnCode (item, type) {
      return publicPageTool.publicEnCode(item, type)
    },
    /**
     * @name 折叠面板标题
     */
    getCollapseTitle (item, listData) {
      const type = listData.class
      if (type === 'vehicle') {
        return `${publicPageTool.publicEnCode(item.insuredCarFlag, 'insuredCarFlag')} / ${item.licenseNo}`
      } else if (type === 'matter') {
        return `${item.propertylossName}`
      } else if (type === 'people') {
        return `${item.personName} / ${publicPageTool.publicEnCode(item.sex, 'sex')} / ${item.age}`
      } else if (type === 'adjustment') {
        return `编号:${item.ompenSateNo} ${item[listData.titleModel]}`
      } else if (type === 'adjustment1') {
        return `编号:${item.claimNo}`
      } else if (type === 'adjustment2') {
        return `编号:${item.claimNo}`
      } else {
        return ``
      }
    },
    /**
     * @name 设置表格头部样式
     */
    pageTableHead () {
      return 'text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;'
    },
  }
}
</script>

<style lang='scss' scoped>
.collapse-reveal {
  .collapse-reveal-item_table {
    margin: 20px 0 0 0;
    padding: 0 20px;
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
    .reveal-item-table {
      margin-top: 10px;
    }
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
  ::v-deep .el-date-editor {
    width: 100%;
  }
  ::v-deep .cell {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;
    padding: 0 5px !important;
    font-size: 13px !important;
  }
  ::v-deep .el-table__cell {
    padding: 3px 0;
  }
}
</style>