<template>
<!-- <div class='carInsurance-details'>
  <div class="page-details-table">
    <publicDetailsTable :listData='listData' :modelListData='listDetailsData'></publicDetailsTable>
  </div>
</div> -->
  <el-main v-loading="loading"  class='carInsurance-details'>
    <div class='carInsurance-details-list' v-if="JSON.stringify(listDetailsData) !== '{}'">
      <div class='details-list-item' v-for='(item, index) in listData' :key='index'>
        <div class='list-item-head'>
          <div class='item-head-icon'></div>
          {{ item.name }}
        </div>
        <div class='list-item-describe' v-if='!item.type'>
          <div class='item-descrilbe-tab' v-for='(Titem, Tindex) in item.children' :key='Tindex'>
            <el-row v-if='!item.type'>
              <el-col :span='8' v-for='(Sitem, Sindex) in Titem' :key='Sindex'>
                 <el-descriptions>
                  <el-descriptions-item :label="Sitem.name">
                    <template v-if='Sitem.type === "date" || Sitem.type === "time"'>
                       {{ transformationDate(listDetailsData[item.model], Sitem) }}
                    </template>
                    <template v-else>
                      {{ listDetailsData[item.model][Sitem.model]}}
                    </template>
                    </el-descriptions-item>
                 </el-descriptions>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class='list-item-describe' v-if='item.type'>
          <div class='item-descrilbe-tab' v-for='(Titem, Tindex) in item.children[showType]' :key='Tindex'>
            <el-row>
              <el-col :span='showType === "business" ? 12 : 8' v-for='(Sitem, Sindex) in Titem' :key='Sindex'>
                 <el-descriptions>
                  <el-descriptions-item :label="Sitem.name">
                    <template v-if='showType === "business"'>
                       {{ listDetailsData[item.model][Sitem.model] }}
                    </template>
                    <template v-else>
                      {{ Sitem.model }}
                    </template>
                    </el-descriptions-item>
                 </el-descriptions>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import LsitInfo from '@/utils/publicPageTablTool'
import publicDetailsTable from '@/components/publicDetailsTable/index'
import * as axios from '@/api/insurancePolicy/index'
import * as publicPageTool from '@/utils/publicPageTool'

export default {
  data () {
    return {
      listData: new LsitInfo().getCarInsuranceDetailsTableList(),
      listDetailsData: {},
      loading: false,
      showType: ''
    }
  },
  components: {
    publicDetailsTable
  },
  created () {
    this.getCarPolicyDetail()
  },
  methods: {
    getCarPolicyDetail () {
      this.loading = true
      axios.getCarPolicyDetail(this.$route.query.policyNo).then(res => {
        this.listDetailsData = res.data
        this.showType = this.listDetailsData.carPolicyDTO.riskName.indexOf('商业')>-1 ? 'business' : 'Jiaoqiang'
        console.log(this.showType)
        this.loading = false
      })
    },
    transformationDate (item, Sitem) {
      return publicPageTool.transformationDate(item[Sitem.model], Sitem.type, Sitem.enCode)
    }
  }
}
</script>

<style lang='scss' scoped>
.page-details-table {
  padding: 20px;
  background: #FFFFFF;
  border-radius: 8px;
  .details-table-from {
    border: 1px solid #e6ebf5;
    .table-from-list {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.carInsurance-details {
  padding: 20px;
  margin: 0;
  min-height: 800px;
  .carInsurance-details-list {
    .details-list-item {
      padding: 20px;
      background: #FFFFFF;
      border-radius: 8px;
      margin-top: 20px;
      .list-item-head {
        @include flex_layout(center, flex-start);
        height: 48px;
        background: #F5F5F5;
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        .item-head-icon {
          flex: 0 0 auto;
          width: 4px;
          height: 14px;
          background: #3B73E6;
          border-radius: 2px;
          margin-right: 10px;
        }
      }
      .list-item-describe {
        margin-top: 20px;
      }
    }
  }
  ::v-deep .el-col-12 {
    .el-descriptions-item__label {
      min-width: 250px !important;
      text-align: right;
    }
  }
}
.carInsurance-details /deep/ .el-descriptions-item__label {
  min-width: 155px;
  text-align: right;
  color: #999999;
}
</style>