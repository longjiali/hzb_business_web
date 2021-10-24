<template>
  <div class='employer' v-loading='loadingState'>
    <div class='employer-head'>
      <div class='employer-head-list'>
        <div class='head-list-search'>
          <el-input placeholder="保单号/报案号/投保人" clearable v-model='searchValue' @clear='queryListData' size="small"></el-input>
          <div class='head-list-query'>
            <el-button slot="suffix" type="primary" size="small" icon="el-icon-search" @click='queryListData'></el-button>
          </div>
        </div>
      </div>
    </div>
    <div class='employer-content'>
      <el-table :data="listData.records" border style="width: 100%;" :size='"mini"' :header-cell-style="pageTableHead" @row-dblclick='doubleClickItem'>
        <el-table-column
          :prop="item.model" :fixed='item.fixed' :label="item.name" :width="item.width" 
          v-for='(item, index) in publicTableList' :key='index'>
            <template slot-scope="scope">
              <template v-if='!item.solt'>
                <el-tooltip v-if='item.model === "productCompany" || item.model === "registNo" || item.model === "insuredPersonName" || item.model === "insuredName"' effect="dark" :content="scope.row[item.model]" placement="top-start">
                  <span>
                    {{scope.row[item.model]}}
                  </span>
                </el-tooltip>
                <span v-else>
                  {{scope.row[item.model]}}
                </span>
              </template>
              <div class='content-botton-list' v-if='item.model === "operation" && item.solt'>
                <el-button type="primary" plain @click='lookDeatils(scope.row.registNo, scope.row.accidentNo)' size='mini'>理赔详情</el-button>
              </div>
              <span v-if='item.model === "assureStartDate" || item.model === "assureEndDate" && item.solt'>
                {{ transformationDate(scope.row[item.model]) }}
              </span>
              <span v-if='item.model === "reportDate" || item.model === "damageDate" && item.solt'>
                {{ transformationDate(scope.row[item.model]) }}
              </span>
            </template>
        </el-table-column>
      </el-table>
      <div class='employer-content-pagination' v-if='listData.total >= 0'>
        <publicPagination v-if='!loadingState' :total='listData.total' :index='pageIndex' :size='pageSize' @setPageInfo='changePageIndex'></publicPagination>
      </div>
    </div>
  </div>
</template>

<script>
import tableInfo from '@/utils/publicPageTablTool'
import * as axios from '@/api/compensate/index'
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  data () {
    return {
      publicTableList: new tableInfo().getEmployerCompensateTableList(),
      headerList: [
        { name: '保单号', type: 'input', key: 'appliedNo', model: '' },
        { name: '报案号', type: 'input', key: 'regist', model: '' },
        { name: '报案日期', type: 'date', key: 'reportDate', model: '' },
        { name: '投保人', type: 'input', key: 'insuredPersonName', model: '' }
      ],
      loadingState: false,
      pageIndex: 1,
      pageSize: 20,
      listData: {},
      searchValue: ''
    }
  },
  created () {
    this.getNonCarClaimsQuery()
  },
  methods: {
    /**
     * @name 双击查看详情
     */
    doubleClickItem (row, column, event) {
      this.$router.push(`/compensate/employerDetails?registNo=${row.registNo}&accidentNo=${row.accidentNo}`)
    },
    lookDeatils (item,accidentNo) {
      this.$router.push(`/compensate/employerDetails?registNo=${item}&accidentNo=${accidentNo}`)
    },
    /**
     * @name 查询理赔列表
     */
    queryListData () {
      this.pageIndex = 1
      this.getNonCarClaimsQuery()
    },

    /**
     * @name 重置清空查询条件
     */
    resetListData () {
      this.pageIndex = 1
      this.searchValue = ''
      this.getNonCarClaimsQuery()
    },
    importListData () {},
    exportListData () {},
    changePageIndex (item) {
      if (item.type === 'size') {
        this.pageSize = item.item
      } else {
        this.pageIndex = item.item
      }
      this.getNonCarClaimsQuery()
    },
    /**
     * @name 时间转换
     */
    transformationDate (item) {
      return publicPageTool.transformationDate(item)
    },

    /**
     * @nmae 查询雇主责任险理赔列表
     */
    getNonCarClaimsQuery () {
      const params = { pageNum: this.pageIndex, pageSize: this.pageSize, searchValue: this.searchValue }
      this.loadingState = true
      axios.getNonCarClaimsQuery(params).then(res => {
        this.loadingState = false
        res.data.records = res.data.records.map((el, index) => { return { ...el, number: (this.pageSize * (this.pageIndex - 1)) + index + 1 }})
        this.listData = res.data
      }).catch(() => {
        this.loadingState = false
      })
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
.employer {
  padding: 20px;
  .employer-head {
    padding: 0 20px 20px 20px;
    background: #ffffff;
    border-radius: 8px;
    .employer-head-list {
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .head-list-search {
        margin-left: 10px;
        width: 250px;
        position: relative;
        .head-list-query {
          position: absolute;
          right: 0px;
          top: 0;
        }
      }
      .head-list-reset {
        margin-left: 15px;
      }
    }
    .employer-head-button {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .head-button-tab {
        flex: 0 0 auto;
        flex: 0 0 auto;
        padding: 0 16px;
      }
    }
  }
  .employer-content {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    .page-export-import {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .export-import-item {
        flex: 0 0 auto;
        margin-right: 20px;
      }
    }
    .content-botton-list {
      height: 100%;
      @include flex_layout(center, space-between);
    }
    .employer-content-pagination {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  ::v-deep .el-date-editor {
    width: 100%;
  }
  ::v-deep .el-form-item{
    display: flex;
    .el-form-item__label {
      min-width: 125px;
      padding: 0;
    }
    .el-form-item__content{
      flex: 1;
      min-width: 250px;
      .el-input-number, .el-select{
        width: 100%;
      }
    }
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
  ::v-deep input[type=number] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    -moz-appearance: textfield;
  }
  ::v-deep .el-date-editor {
    width: 100%;
  }
  ::v-deep .el-button--info{
    background: #FFFFFF;
    border-color: #3B73E6;
    color: #3B73E6;
  }
  ::v-deep .el-input__suffix {
    right: 50px;
  }
}
</style>