<template>
  <div class='employer' v-loading="loadingState" v-cloak>
    <div class='employer-head'>
      <div class='employer-head-list'>
        <div class='head-list-button'>
          <el-radio-group v-model="radioButtonType" size="small" @change="queryListData">
            <el-radio-button label="保单"></el-radio-button>
            <el-radio-button label="投保单"></el-radio-button>
            <el-radio-button label="已报价"></el-radio-button>
          </el-radio-group>
        </div>
        <div class='head-list-search'>
          <el-input placeholder="保单号/投保人/被保人" clearable v-model='searchValue' @clear='queryListData' size="small"></el-input>
          <div class='head-list-query'>
            <el-button slot="suffix" type="primary" size="small" icon="el-icon-search" @click='queryListData'></el-button>
          </div>
        </div>
        <div class='head-list-reset'>
          <el-upload class="upload-demo" :show-file-list='false' multiple :on-change='importListData'  :action='actionUrl' :auto-upload="false">
            <el-button icon='el-icon-upload2' size="small" circle type="danger"></el-button>
          </el-upload>
        </div>
        <div class='head-list-reset'>
          <el-button type="success" icon='el-icon-download' circle size="small" @click='exportListData'></el-button>
        </div>
      </div>
    </div>
    <div class='employer-content'>
      <el-table :data="listData.records" border style="width: 100%;" :size='"mini"' :header-cell-style="pageTableHead" @row-dblclick='doubleClickItem'>
        <el-table-column
          :prop="item.model" :fixed='item.fixed' :label="item.name" :width="item.width" 
          v-for='(item, index) in getpublicTableList()' :key='index'>
            <template slot-scope="scope">
              <template v-if='!item.solt'>
                <el-tooltip v-if=' item.model === "productCompany" || item.model === "insuredPersonName" || item.model === "insuredName"' effect="dark" :content="scope.row[item.model]" placement="top-start">
                  <span>
                    {{scope.row[item.model]}}
                  </span>
                </el-tooltip>
                <span v-else>
                  {{scope.row[item.model]}}
                </span>
              </template>
              <div class='content-botton-list' v-if='item.model === "operation" && item.solt'>
                <el-button type="primary" v-show="scope.row.policyStatus  === 0 " plain @click='gotoEdit(scope.row)' size='mini'>修改</el-button>
                <el-button type="primary" plain @click='lookDeatils(scope.row.employerPolicyId)' size='mini'>详情</el-button>
                <el-button type="primary" v-if='radioButtonType ==="保单"' plain @click='lookReport(scope.row)' size='mini'>报案</el-button>
              </div>
              <span v-if='item.model === "assureStartDate" || item.model === "assureEndDate" || item.model === "underwriteEndDate" && item.solt'>
                {{ transformationDate(scope.row, item) }}
              </span>
              <span v-if='item.model === "policyStatus" && item.solt'>
                {{ scope.row[item.model]  === 0 ? '已报价' : scope.row[item.model]  === 1 ? '投保单' : '保单' }}
              </span>
            </template>
        </el-table-column>
      </el-table>
      <div class='employer-content-pagination' v-if='listData.total >= 0'>
        <publicPagination v-if='!loadingState' :total='listData.total' :index='pageIndex' :size='pageSize' @setPageInfo='changePageIndex'></publicPagination>
      </div>
    </div>
    <!-- <el-drawer title="高级查询" :visible.sync="drawerState" :direction="direction">
      <div class='senior-search-from'>
        <el-form>
          <el-row>
            <el-col v-for='(item, index) in headerList' :key='index'>
              <el-form-item :label="`${item.name}：`">
                <template v-if='item.type === "input"'>
                  <el-input :placeholder='`请输入${item.name}`' v-model='item.model'></el-input>
                </template>
                <template v-if='item.type === "date"'>
                  <el-date-picker v-model='item.model' :placeholder='`请选择${item.name}`' type='date'></el-date-picker>
                </template>
                <template v-if='item.type === "money"'>
                  <div class='senior-search-item'>
                    <div class='senior-search-input'>
                      <el-input :placeholder='`请输入${item.name}`' v-model='item.model'></el-input>
                    </div>
                    <span>至</span>
                    <div class='senior-search-input'>
                      <el-input :placeholder='`请输入${item.name}`' v-model='item.model2'></el-input>
                    </div>
                  </div>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class='senior-search-buttom'>
          <div class='head-button-tab'><el-button type="primary" @click='openDrawer'>搜索</el-button></div>
        </div>
      </div>
    </el-drawer> -->
  </div>
</template>

<script>
import tableInfo from '@/utils/publicPageTablTool'
import request from 'axios'
import { getToken } from '@/utils/auth'
import * as axios from '@/api/insurancePolicy/index'
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  data () {
    return {
      publicTableList: new tableInfo().getEmployerTableList(),
      headerList: [
        { name: '保单状态', type: 'select', model: '保单', key: 'policyStatus',  option: [ { label: '已报价', value: 0 }, { label: '投保单', value: 1 }, { label: '保单', value: 2 }]},
        { name: '保单号', type: 'input', model: '', key: 'policyNo' },
        { name: '投保人', type: 'input', model: '', key: 'insuredPersonName' },
        { name: '被保人', type: 'input', model: '', key: 'insuredName'}
      ],
      loadingState: false,
      drawerState: false,
      direction: 'rtl',
      pageIndex: 1,
      pageSize: 20,
      radioButtonType: '保单',
      actionUrl: '/employerPolicy/import',
      listData: {},
      searchValue: ''
    }
  },
  created () {
    this.getEmployerPolicyList()
  },
  methods: {

    /**
     * @name 获取表格展示内容
     */
    getpublicTableList () {
      if (this.radioButtonType === '保单') {
        return this.publicTableList[1]
      } else if (this.radioButtonType === '投保单') {
        return this.publicTableList[2]
      } else {
        return this.publicTableList[3]
      }
    },
    /**
     * @name 双击表格列，查看详情
     */
    doubleClickItem (row, column, event) {
      this.$router.push(`/insurancePolicy/employerReport?policyNo=${row.policyNo}&licenseNo=${row.insuredName}&employerPolicyId=${row.employerPolicyId}`)
    },
    /**
     * @name 查看数据详情
     */
    lookDeatils (item) {
      this.$router.push(`/insurancePolicy/employerDetails?employerPolicyId=${item}&type=${this.radioButtonType === '保单' ? 2 : this.radioButtonType === '投保单'  ? 1 : 0}`)
    },

    /**
     * @name 报案
     */
    lookReport (item) {
      this.$router.push(`/insurancePolicy/employerReport?policyNo=${item.policyNo}&licenseNo=${item.insuredName}&employerPolicyId=${item.employerPolicyId}`)
    },

    /**
     * @name 开启高级查询栏
     */
    openDrawer () {
      this.drawerState = true
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
      this.getEmployerPolicyList()
    },

    /**
     * @name 查询数据
     */
    queryListData () {
      this.pageIndex = 1
      this.getEmployerPolicyList()
    },
    
    /**
     * @name 重置查询数据
     */
    resetListData () {
      this.radioButtonType = '保单'
      this.searchValue = ''
      this.pageIndex = 1
      this.getEmployerPolicyList()
    },

    /**
     * @name 导入模板数据
     */
    importListData (item) {
      const file = new FormData()
      file.append('file', item.raw)
      this.loadingState = true
      axios.employerPolicyImport(file).then(res => {
        this.$message.success('导入成功')
        this.resetListData()
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 导出模板数据
     */
    exportListData () {
      const params = {
        pageNum: this.pageIndex,
        pageSize: this.pageSize,
        searchValue: this.searchValue
      }
      params.policyStatus = this.radioButtonType === '保单' ? 2 : this.radioButtonType === '投保单'  ? 1 : 0
      this.loadingState = true
      request({
        method: "post",
        url: `${process.env.VUE_APP_BASE_API}/employerPolicy/export`,
        data: params,
        responseType: "blob",
        headers: {
          token: getToken(),
        },
      }).then(res => {
        this.loadingState = false
        const link = document.createElement("a")
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        })
        const dome = new Date()
        const data = dome.getDate() >= 10 ? dome.getDate() : `0${dome.getDate()}`
        const month = dome.getMonth() + 1 >= 10 ? dome.getMonth() + 1 : `0${dome.getMonth() + 1}`
        const year = dome.getFullYear()
        link.style.display = "none"
        link.href = URL.createObjectURL(blob)
        link.download = `非车险保单模板${year}${month}${data}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(() => {
        this.loadingState = false
      })
    },

    transformationDate (item, Sitem) {
      return publicPageTool.transformationDate(item[Sitem.model], Sitem.type, Sitem.enCode)
    },

    /**
     * @name 获取雇主责任险保单列表
     */
    getEmployerPolicyList () {
      const params = {
        pageNum: this.pageIndex,
        pageSize: this.pageSize,
        searchValue: this.searchValue
      }
      params.policyStatus = this.radioButtonType === '保单' ? 2 : this.radioButtonType === '投保单'  ? 1 : 0
      this.loadingState = true
      this.listData = {}
      axios.getEmployerPolicyList(params).then(res => {
        this.loadingState = false
        this.listData = res.data
        this.listData.records = this.listData.records.map((el, index) => {
          return { ...el, number: (this.pageSize * (this.pageIndex - 1)) + index + 1}
        })
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
    gotoEdit(row){
      window.open(`${process.env.VUE_APP_EMPLOYER_LINK}/#/insurance?token=${getToken()}&employerPolicyId=${row.employerPolicyId}`)
    }
  }
}
</script>

<style lang='scss' scoped>
.employer {
  padding: 20px;
  .employer-head {
    padding: 0 20px 20px 20px;
    background: #FFFFFF;
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
      @include flex_layout(center, space-around);
      .botton-list-item {
        flex: 0 0 auto;
        padding: 5px 10px;
        background: #3B73E6;
        border-radius: 8px;
        font-size: 13px;
        color: #FFFFFF;
        cursor: pointer;
        &:hover {
          background: #d2d2d2;
        }
      }
    }
    .employer-content-pagination {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .senior-search-from {
    padding: 0 20px;
    padding-bottom: 10px;
    .senior-search-item {
      display: flex;
      align-items: center;
      justify-content: center;
      .senior-search-input {
        flex: 1;
      }
      span {
        margin: 0 10px;
      }
    }
    .senior-search-buttom {
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
      // min-width: 250px;
      .el-input-number, .el-select{
        width: 100%;
      }
    }
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
  ::v-deep .el-button--info{
    background: #FFFFFF;
    border-color: #3B73E6;
    color: #3B73E6;
  }
  ::v-deep .el-input__suffix {
    right: 50px;
  }
  ::v-deep .el-button {
          margin-left: 0;
  }
}
</style>