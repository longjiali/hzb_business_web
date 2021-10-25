<template>
  <div class='carlnsurance'  v-loading='loadingState'>
    <div class='carlnsurance-head'>
      <div class='carlnsurance-head-list'>
        <div class='head-list-button'>
          <el-radio-group v-model="emdCaseStatus" size="small" @change="queryListData">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="未决"></el-radio-button>
            <el-radio-button label="已决"></el-radio-button>
          </el-radio-group>
        </div>
        <div class='head-list-search'>
          <el-input placeholder="保单号/事故号/报案号/车牌号" clearable v-model='searchValue' @clear='queryListData' size="small"></el-input>
          <div class='head-list-query'>
            <el-button slot="suffix" type="primary" size="small" icon="el-icon-search" @click='queryListData'></el-button>
          </div>
        </div>
        <div class='head-list-reset'>
          <el-tooltip effect="dark" content="高级筛选" placement="top">
            <el-button type="danger" size="small" icon="el-icon-s-operation" @click="drawerState"></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class='carlnsurance-content'>
      <el-table :data="listData.records" border style="width: 100%;" :size='"mini"' :header-cell-style="pageTableHead" @row-dblclick='doubleClickItem'>
        <el-table-column
          :prop="item.model" :fixed='item.fixed' :label="item.name" :width="item.width" 
          v-for='(item, index) in publicTableList' :key='index'>
            <template slot-scope="scope">
              <template v-if='!item.solt'>
                <el-tooltip v-if='item.model === "frameNo" || item.model === "insuredName" || item.model === "insuredPersonName" || item.model === "productCompany" || item.model === "registNo" || item.model === "accidentNo"' effect="dark" :content="scope.row[item.model]" placement="top-start">
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
    <Public-Advanced-Search :listData='headerList' v-if='advancedSearchState' @operati="advancedSearchOperation"></Public-Advanced-Search>
  </div>
</template>

<script>
import tableInfo from '@/utils/publicPageTablTool'
import PublicAdvancedSearch from '@/components/publicAdvancedSearch/index'
import * as axios from '@/api/compensate/index'
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  data () {
    return {
      publicTableList: new tableInfo().getCarInsuranceCompensateTabList(),
      headerList: [
        { name: '保单号', type: 'input', key: 'policyNo', model: '' },
        { name: '事故号码', type: 'input', key: 'accidentNo', model: '' },
        { name: '报案号码', type: 'input', key: 'registNo', model: '' },
        { name: '投保人', type: 'input', key: 'insuredPersonName', model: '' },
        { name: '保险期限', type: 'daterange', startKey: 'assureStartDate', endKey: 'assureEndDate', model: '', },
        { name: '报案日期', type: 'daterange', startKey: '', endKey: '', model: '', },
        { name: '车牌号', type: 'input', key: 'carNum', model: '' },
        { name: '发动机号', type: 'input', key: 'engineNo', model: '' },
        { name: '车架号', type: 'input', key: 'frameNo', model: '' },
      ],
      emdCaseStatus: '未决',
      loadingState: false,
      advancedSearchState: false,
      pageIndex: 1,
      pageSize: 20,
      listData: {},
      searchValue: ''
    }
  },
  components: {
    PublicAdvancedSearch
  },
  created () {
    this.getCarClaimsQuery()
  },
  methods: {
    /**
     * @name 双击查看列表详情
     */
    doubleClickItem (row, column, event) {
      this.$router.push(`/compensate/carInsuranceDetails?registNo=${row.registNo}&accidentNo=${row.accidentNo}`)
    },

    /**
     * @name 查看详情
     */
    lookDeatils (item,accidentNo) {
      this.$router.push(`/compensate/carInsuranceDetails?registNo=${item}&accidentNo=${accidentNo}`)
    },

    /**
     * @name 查询理赔列表
     */
    queryListData () {
      this.pageIndex = 1
      this.getCarClaimsQuery()
    },

    /**
     * @name 开启高级搜索
     */
    drawerState () {
      this.advancedSearchState = true
    },

    /**
     * @name 高级搜索操作
     */
    advancedSearchOperation (item) {
      this.advancedSearchState = false
      if (item === 'confirm') {
        this.pageIndex = 1
        this.getCarClaimsQuery()
      }
    },

    /**
     * @name 重置清空查询条件
     */
    resetListData () {
      this.pageIndex = 1
      this.searchValue = ''
      this.headerListOperati('empty')
      this.getCarClaimsQuery()
    },

    /**
     * @name 分页
     */
    changePageIndex (item) {
      if (item.type === 'size') {
        this.pageSize = item.item
      } else {
        this.pageIndex = item.item
      }
      this.getCarClaimsQuery()
    },

    /**
     * @name 获取车险理赔列表
     */
    getCarClaimsQuery () {
      const params = { ...this.headerListOperati(), pageNum: this.pageIndex, pageSize: this.pageSize, searchValue: this.searchValue }
      params.emdCaseStatus = this.emdCaseStatus === '全部' ? 'all' : this.emdCaseStatus === '未决' ? 'open' : 'close'
      this.loadingState = true
      this.listData = {}
      axios.getCarClaimsQuery(params).then(res => {
        this.headerListOperati('empty')
        this.loadingState = false
        res.data.records = res.data.records.map((el, index) => { return { ...el, number: (this.pageSize * (this.pageIndex - 1)) + index + 1 }})
        this.listData = res.data
      }).catch(() => {
        this.headerListOperati('empty')
        this.loadingState = false
      })
    },

    /**
     * @name 搜索列表处理
     */
    headerListOperati (item) {
      if (item === 'empty') {
        this.headerList = this.headerList.map(el => { return { ...el, model: '' }})
      } else {
        const params = {}
        this.headerList.forEach(el => {
          if (el.type === 'input') {
            if (el.model && el.key) {
              params[el.key] = el.model
            }
          } else if (el.type === 'daterange') {
            if (el.model && el.startKey) {
              params[el.startKey] = publicPageTool.dateEncode(el.model[0], 'date')
            }
            if (el.model && el.endKey) {
              params[el.endKey] = publicPageTool.dateEncode(el.model[1], 'date')
            }
          }
        })
        return params
      }
    },

    /**
     * @name 时间转换
     */
    transformationDate (item) {
      return publicPageTool.transformationDate(item)
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
.carlnsurance {
  padding: 20px;
  .carlnsurance-head {
    padding: 0 20px 20px 20px;
    background: #FFFFFF;
    border-radius: 8px;
    .carlnsurance-head-list {
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
    .carlnsurance-head-button {
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
  .carlnsurance-content {
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