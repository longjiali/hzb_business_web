<template>
  <div class='employer-details' v-loading='loadingState'>
    <template v-if='$route.query.type * 1 !== 2'>
      <div class='employer-details-step'>
        <div class='step-bar-item' :class='{"step-bar-item_a": item.choose}' v-for='(item, index) in stepsList' @click='changeStepState(item)' :key='index'>
          {{ item.name }}
        </div>
      </div>
      <div class='employer-details-content' id='detailsContent' @scroll='pageScroll'>
        <div class="details-content-item" :id='`contentItem1`' :name='1' v-if='listDetailsData.policy && this.$route.query.type && this.$route.query.type * 1 !==0'>
          <div class='content-item-button'>
            <div class='item-header-icon'></div>
            <div class="item-button-name" v-if='this.$route.query.type * 1 === 1 || this.$route.query.type * 1 === 2'>
              {{ this.$route.query.type * 1 === 1  ? '投保单号' : '保单号'}}：
              <span>
                {{ this.$route.query.type * 1 === 1 ? listDetailsData.policy && listDetailsData.policy.appliedNo : listDetailsData.policy && listDetailsData.policy.policyNo }}
              </span>
            </div>
            <div class="item-button-tab">
              <el-button type="primary" plain size="small" @click="seePage(1)" v-if='this.$route.query.type * 1 === 2 && listDetailsData.policy.policyUrlAddr'>查看电子保单</el-button>
            </div>
            <div class="item-button-tab">
              <el-button type="success" plain size="small" @click="seePage(2)" v-if='this.$route.query.type * 1 === 1 && listDetailsData.policy.payUrlAddr'>支付链接</el-button>
            </div>
          </div>
        </div>
        <div class='details-content-item' :id='`contentItem${item.id}`' :name='item.id' v-for='(item, index) in listData' :key='index'>
          <div class='content-item-header'>
            <div class='item-header-icon'></div>
            {{ item.name }}
          </div>
          <div class='content-item-bar'>
            <template v-if='item.type === "browse" '>
              <el-row v-for='(Titem, Tindex) in item.children' :key='Tindex'>
                <el-col :span='8' v-for='(Sitem, Sindex) in Titem' :key='Sindex'>
                  <el-descriptions>
                    <el-descriptions-item :label="Sitem.name">
                      <template v-if='Sitem.type === "images"'>
                        <div class='item-bar-images'>
                          <el-image ref='elImages' style="width: 100%; height: 100%" :src="listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] : ''" 
                            :preview-src-list="[listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] : '']">
                          </el-image>
                          <div class='bar-images-layer' v-if='listDetailsData[item.model] && listDetailsData[item.model][Sitem.model]'>
                            <i @click="lookImages" class="el-icon-circle-plus-outline"></i>
                            <a :href="listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] : ''">
                              <i class="el-icon-download"></i>
                            </a>
                          </div>
                        </div>
                      </template>
                      <template v-else-if="Sitem.type === 'date'">
                        {{transformationDate(listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] : '无')}}
                      </template>
                      <template v-else-if="Sitem.type === 'receiveType'">
                        {{listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] === 0 ? '纸质发票' : '电子发票' : '无'}}
                      </template>
                      <template v-else-if="Sitem.type === 'code'">
                        {{listDetailsData[item.model] ? getCodeName(listDetailsData[item.model][Sitem.model], Sitem.model) : '无'}}
                      </template>
                      <template v-else-if="Sitem.type === 'address'">
                        {{listDetailsData[item.model] ? getAddressName(listDetailsData[item.model], Sitem) : '无'}}
                      </template>
                      <template v-else>
                        <span>
                          {{listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] ||listDetailsData[item.model][Sitem.model] === 0 ? listDetailsData[item.model][Sitem.model] : '无' : '无'}}
                        </span>
                      </template>
                    </el-descriptions-item>
                  </el-descriptions>
                </el-col>
              </el-row>
            </template>
            <template v-if='item.type === "browse2"'>
              <el-row v-for='(Titem, Tindex) in listDetailsData[item.model]' :key='Tindex'>
                <el-col :span='8' v-for='(Sitem, Sindex) in item.children' :key='Sindex'>
                  <el-descriptions>
                    <el-descriptions-item :label="Sitem.name">
                      {{ Titem[Sitem.model] }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-col>
              </el-row>
            </template>
            <template v-if='item.type === "table"'>
              <el-table :data='getTableData(listDetailsData[item.model], item.model)' border style="width: 100%;" :header-cell-style="pageTableHead">
                <el-table-column :prop="item.model" :fixed='item.fixed' :width="item.width" :label="item.name" v-for='(item, index) in item.children' :key='index'>
                  <template slot-scope="scope">
                    <template v-if='item.tips'>
                      <el-tooltip effect="dark" :content="item.type === 'address' ? `${scope.row[item.model1]}${scope.row[item.model2]}${scope.row[item.model3]}${scope.row[item.model]}` :scope.row[item.model]" placement="top-start">
                        <span v-if='item.type === "code"'>
                          {{ getCodeName(scope.row[item.model], 'insuredPersonCardTypeId') }}
                        </span>
                        <span v-else-if='item.type === "address"'>
                          {{getAddressName(scope.row, item)}}
                        </span>
                        <span v-else>
                          {{scope.row[item.model] ? scope.row[item.model] : '无'}}
                        </span>
                      </el-tooltip>
                    </template>
                    <template v-else>
                        <span v-if='item.type === "code"'>
                          {{ getCodeName(scope.row[item.model], 'insuredPersonCardTypeId') }}
                        </span>
                        <span v-else-if='item.type === "address"'>
                          {{getAddressName(scope.row, item)}}
                        </span>
                        <span v-else>
                          {{scope.row[item.model]}}
                        </span>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
              <div class='pagination' v-if='item.model === "person"'>
                <publicPagination :total='listDetailsData[item.model] && listDetailsData[item.model].length' :index='pageIndex' :size='pageSize' @setPageInfo='changePageIndex'></publicPagination>
              </div>
            </template>
            <template v-if='item.type === "text"'>
              <el-row>
                <el-col :span='24' v-for='(Titem, Tindex) in listDetailsData[item.model]' :key="Tindex">
                  <div class='item-bar-text'>{{ Titem[item.val] }}</div>
                </el-col>
              </el-row>
            </template>
            <template v-if='item.type === "deduction"'>
              <div class='page-deduction-item'>
                <div class="deduction-item-type">已选择：{{ listDetailsData.policy ? listDetailsData.policy.productProgrammeName : ''}}</div>
                <div class='deduction-item-list' v-for="(Ditem, Dindex) in listDetailsData.occupation" :key="Dindex">
                  <div class='item-list-name'>{{Ditem.occupationName}}</div>
                  <div class='item-list-title'>单价 <span>{{Ditem.occupationAdjustmentPrice}}</span></div>
                </div>
                <div class='deduction-item-list'>
                  <div class='item-list-name'>投保人数合计: {{listDetailsData.policy ? listDetailsData.policy.insuredPersonSum : ''}}</div>
                  <div class='item-list-title'>人数调整系数 <span>{{ listDetailsData.policy ? listDetailsData.policy.adjustmentFactor : ''}}</span></div>
                </div>
                <div class='deduction-item-list'>
                  <div class='item-list-tab'>整单调整系数: <span>{{ listDetailsData.policy ? listDetailsData.policy.adjustmentFactorAll : ''}}</span></div>
                </div>
                <div class='deduction-item-list'>
                  <div class='item-list-tab'>总保费: <span>{{ listDetailsData.policy ? listDetailsData.policy.totalPremium : ''}}</span></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if='$route.query.type * 1 === 2'>
      <div class='employer-details-tab'>
        <publicDetailsTable :listData='listData_P' :modelListData='listDetailsData'></publicDetailsTable>
      </div>
    </template>
  </div>
</template>

<script>
import LsitInfo from '@/utils/publicPageTablTool'
import publicDetailsTable from '@/components/publicDetailsTable/index'
import * as axios from '@/api/insurancePolicy/index'
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  data () {
    return {
      stepsList: [
        { name: '投保人信息', id: 1, choose: true, },
        { name: '被保人信息', id: 2, choose: '', },
        { name: '保障期限', id: 3, choose: '', },
        { name: '职业类别', id: 4, choose: '', },
        { name: '附加条款', id: 5, choose: '', },
        { name: '免赔条款', id: 6, choose: '', },
        { name: '特别约定', id: 7, choose: '', },
        { name: '升级方案', id: 8, choose: '', },
        { name: '人员名单', id: 9, choose: '', },
        { name: '发票详情', id: 10, choose: '', },
        { name: '授权扣费', id: 11, choose: '', }
      ],
      listData: new LsitInfo().getEmployerReportList().all,
      listData_P: new LsitInfo().getEmployerReportList().policy, 
      loadingState: false,
      pageTableList: [],
      listDetailsData: {},
      pageIndex: 1,
      pageSize: 5,
    }
  },
  components: {
    publicDetailsTable,
  },
  mounted () {
    this.getEmployerPolicyDetail()
  },
  methods: {
    pageScroll (item) {
      const list = item.target.children
      const doemScrollTop = item.target.scrollTop
      for (const key in list) {
        if (Object.hasOwnProperty.call(list, key)) {
          const el = list[key]
          const height = el.offsetHeight
          const setTop = el.offsetTop
          const name = el.getAttribute('name')
          if (doemScrollTop > setTop && doemScrollTop < height + setTop) {
            this.stepsList = this.stepsList.map(ev => {
              return { ...ev, choose: ev.id * 1 === name * 1}
            })
          }
        }
      }
    },
    changeStepState (item) {
      this.stepsList = this.stepsList.map(el => {
        return { ...el, choose: el.id === item.id}
      })
      const dome = document.getElementById('detailsContent')
      const setTop = document.getElementById(`contentItem${item.id}`).offsetTop
      dome.scrollTo(0,setTop)
    },
    /**
     * @name 时间转换
     */
    transformationDate (item) {
      return publicPageTool.transformationDate(item)
    },

    /**
     * @name 查看链接
     */
    seePage (item) {
      const url = item === 1 ? this.listDetailsData.policy.policyUrlAddr : this.listDetailsData.policy.payUrlAddr
      window.open(url)
    },

    /**
     * @name 编码转换
     */
    getCodeName (item, type) {
      if (type === 'insuredPersonCardTypeId') {
        const dome = this.$store.getters.codeList.find(el => el.id * 1 === item * 1)
        return dome ? dome.dictLabel : '无'
      }
    },

    /**
     * @name 获取表格数据
     */
    getTableData (item, type) {
      if (type === 'person' && item) {
        const data = item.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex)
        return data
      }
      return item
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
    },

    /**
     * @name 查看图片
     */
    lookImages () {
      this.$refs.elImages[0].showViewer = true
    },
    /**
     * @name 获取地址
     */
    getAddressName (item, params) {
      if (item[params.model] || item[params.model1] || item[params.model2] || item[params.model3])
      return `${item[params.model1] ? item[params.model1] : ''}${item[params.model2] ? item[params.model2] : ''}${item[params.model3] ? item[params.model3] : ''}${item[params.model] ? item[params.model] : ''}`
      else
      return '无'
    },
    /**
     * @name 获取详情信息
     */
    getEmployerPolicyDetail () {
      this.loadingState = true
      axios.getEmployerPolicyDetail(this.$route.query.employerPolicyId).then(res => {
        this.loadingState = false
        this.listDetailsData = res.data
        this.listDetailsData.insured = this.listDetailsData.insured.map((el, index) => {
          el.number = index + 1
          return el
        })
        this.listDetailsData.person = this.listDetailsData.person.map((el, index) => {
          el.number = index + 1
          return el
        })
      }).catch(() => {
        this.loadingState = false
      })
    },
    pageTableHead () {
      return 'text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;'
    }
  }
}
</script>

<style lang='scss' scoped >
.employer-details {
  padding: 20px;
  height: 100%;
  position: relative;
  .employer-details-tab {
    // height: 100%;
    padding: 20px;
    border-radius: 8px;
    background: #FFFFFF;
    overflow-y: scroll;
  }
  .employer-details-step {
    float: left;
    .step-bar-item {
      width: 80px;
      height: 32px;
      border-radius: 19px;
      border: 1px solid #3B73E6;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #222222;
    }
    .step-bar-item_a {
      background: #3B73E6;
      border: 1px solid #3B73E6;
      color: #FFFFFF;
    }
  }
  .employer-details-content {
    margin-left: 95px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .content-item-button {
      height: 48px;
      background: #F5F5F5;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #222222;
      display: flex;
      align-content: center;
      justify-content: flex-end;
      margin-bottom: 10px;
      .item-header-icon {
        flex: 0 0 auto;
        width: 4px;
        height: 14px;
        background: #3B73E6;
        border-radius: 2px;
        margin-right: 8px;
      }
      .item-button-name {
        flex: 1;
        display: flex;
        align-items: center;
        justify-items: flex-start;
      }
      .item-button-tab {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
    .content-item-header {
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
    .content-item-bar {
      margin-top: 10px;
      a {
        color: #3B73E6;
      }
      .pagination {
        display: flex;
        align-content: center;
        justify-content: center;
      }
      .item-bar-images {
        width: 120px;
        height: 80px;
        position: relative;
        .bar-images-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: none;
          align-items: center;
          justify-content: space-around;
        }
        &:hover {
          .bar-images-layer {
            display: flex;
          }
        }
      }
      .item-bar-text {
        font-size: 13px;
        color: #333333;
        line-height: 18px;
        &:last-child {
          padding-bottom: 10px;
        }
      }
      .page-deduction-item {
        .deduction-item-type {
          font-size: 13px;
          color: #333333;
          padding: 10px 20px;
          border-bottom: 1px solid #E5E7E9;
        }
        .deduction-item-list {
          font-size: 13px;
          color: #333333;
          padding: 10px 20px;
          border-bottom: 1px solid #E5E7E9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-list-name {
            flex: 0 0 auto;
          }
          .item-list-title {
            flex: 0 0 auto;
            span {
              margin-left: 20px;
              color: #3B73E6;
            }
          }
          .item-list-tab {
            flex: 1;
            text-align: right;
            span {
              margin-left: 20px;
              color: #3B73E6;
            }
          }
        }
      }
    }
  }
  ::v-deep .el-descriptions-item__label {
    min-width: 100px;
    text-align: right;
    font-size: 13px;
    color: #333333;
  }
  ::v-deep .el-table  {
    margin-bottom: 10px;
  }
  ::v-deep .cell {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  ::v-deep .el-icon-circle-plus-outline {
    color: #FFFFFF;
    font-size: 24px;
  }
  ::v-deep .el-icon-download {
    color: #FFFFFF;
    font-size: 24px;
  }
}
</style>