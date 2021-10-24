<template>
  <div class='carInsurance-report' v-loading='loadingState'>
    <div class='carInsurance-report-item'>
      <el-collapse v-model="activeNames">
        <el-collapse-item title='保单信息' name="1">
          <CarInsuranceDetails class="detail"/>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class='carInsurance-report-item'>
      <el-collapse v-model="activeNames">
        <el-collapse-item title='报案信息录入' name="2">
          <public-Page-From :infoData='listDataInput'></public-Page-From>
        </el-collapse-item>
      </el-collapse>
      <div class='carInsurance-report-buttom'>
        <el-button type="primary"  @click='preservationFrom'>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from '@/api/insurancePolicy/index'
import LsitInfo from '@/utils/publicPageTablTool'
import CarInsuranceDetails from './carInsuranceDetails.vue';
export default {
  data () {
    return {
      activeNames: ['2'],
      loadingState: false,
      listDataInput: new LsitInfo().getCarInsuranceReportInput(),
    }
  },
  components:{
    CarInsuranceDetails
  },
  created () {
    const userInfo = this.$store.getters.userInfo
    const query = this.$route.query
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const el = query[key]
        this.listDataInput = this.listDataInput.map(val => {
          val = val.map(ev => {
            if (ev.key === key) {
              ev.model = el
            }
            if (ev.type === 'date') {
              ev.model = new Date()
            }
            if (ev.key === 'reportorName' || ev.key === 'linkerName') {
              ev.model = userInfo.username
            }
            if (ev.key === 'reportorMobile' || ev.key === 'linkerMobileNumber') {
              ev.model = userInfo.phone
            }
            return ev
          })
          return val
        })
      }
    }
  },
  methods: {
    preservationFrom () {
      const params = {}
      this.listDataInput.forEach(el => {
        el.forEach(val => {
          params[val.key] = val.type === 'address' ? '' : val.model
        })
      })
      for (let index = 0; index < this.listDataInput.length; index++) {
        const element = this.listDataInput[index]
        for (let index2 = 0; index2 < element.length; index2++) {
          const val = element[index2]
          if (val.type === 'address') {
            if (!val.model) {
              this.$message.error(`请选择${val.name}省市区`)
              return
            }
            if (!val.model2) {
              this.$message.error(`请输入${val.name}详细地址`)
              return
            }
            val.model.forEach(ev => {
              params[val.key] = params[val.key] + ev
            })
            params[val.key] = params[val.key] + val.model2
          } else {
            if (!val.model) {
              this.$message.error(`请${val.type === 'input' || val.type === 'number' ? '请输入' : '请选择'}${val.name}`)
              return
            }
          }
        }
      }
        this.loadingState = true
      axios.setCarClaimsLregist(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success('报案信息提交成功')
          this.$router.push(`/compensate/carInsurance`)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.carInsurance-report {
  padding: 20px;
  .carInsurance-report-item {
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 8px;
    .report-item-content {
      .item-content-head {
        @include flex_layout(center, flex-start);
        height: 48px;
        background: #F5F5F5;
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        .content-head-icon {
          flex: 0 0 auto;
          width: 4px;
          height: 14px;
          background: #3B73E6;
          border-radius: 2px;
          margin-right: 10px;
        }
      }
      .item-conetnt-list {
        margin-top: 20px;
      }
      .item-conetnt-list_input {
        @include flex_layout;
        .content-list-item {
          flex: 1;
          @include flex_layout(center, flex-start);
        }
      }
    }
    &:last-child {
      margin-top: 20px;
      padding-bottom: 20px;
    }
    .carInsurance-report-buttom {
      margin: 20px auto 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.detail{
  padding: 0;
  /deep/.details-list-item{
    padding: 0 !important;
  }
}
.carInsurance-report /deep/ .el-collapse {
  border: none;
}
.carInsurance-report /deep/ .el-collapse-item__header {
  border: none;
}
.carInsurance-report /deep/ .el-descriptions-item__label {
  min-width: 155px;
  text-align: right;
  color: #999999;
}
.carInsurance-report /deep/ .el-collapse-item__wrap {
  border: none;
  border-top: 1px solid #e6ebf5;
  padding-top: 20px;
}
</style>