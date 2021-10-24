<template>
  <div class='employer-report' v-loading='loadingState'>
    <div class='employer-report-item'>
      <el-collapse v-model="activeNames">
        <el-collapse-item title='保单信息' name="2">
          <pageReveal :listData='listDataInfo' :listDetailsData='listDetailsData'></pageReveal>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class='employer-report-item'>
      <el-collapse v-model="activeNames">
        <el-collapse-item title='保单信息' name="1">
          <div class='report-item-content'>
            <public-Page-From :infoData='listDataInput'></public-Page-From>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class='employer-report-buttom'>
        <el-button type="primary" @click='preservationFrom'>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import pageReveal from '@/views/compensate/components/pageReveal.vue';
import * as axios from '@/api/insurancePolicy/index'
import LsitInfo from '@/utils/publicPageTablTool'
export default {
  data () {
    return {
      activeNames: ['1'],
      loadingState: false,
      listDataInfo: new LsitInfo().getEmployerReportDetails(),
      listDataInput: new LsitInfo().getEmployerReportInput(),
      listDetailsData: {},
      pageTableList: ''
    }
  },
  components: {
    pageReveal
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
    this.getEmployerPolicyDetail()
  },
  methods: {
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
    /**
     * @name 保存报案信息
     */
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
      axios.setNonCarClaimsLregist(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success('报案信息提交成功')
          this.$router.push(`/compensate/employer`)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 设置表格头部样式
     */
    pageTableHead () {
      return 'text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;'
    }
  }
}
</script>

<style lang='scss' scoped>
.employer-report {
  padding: 20px;
  .employer-report-item {
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 8px;
    margin-top: 20px;
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
  }
  .employer-report-buttom {
      margin: 20px auto 0 auto;
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  ::v-deep .employerDetails {
    padding: 0;
    .employer-details-step {
      display: none;
    }
  }
}
.employer-report /deep/ .el-collapse {
  border: none;
}
.employer-report /deep/ .el-collapse-item__header {
  border: none;
}
.employer-report /deep/ .el-descriptions-item__label {
  min-width: 155px;
  text-align: right;
  color: #999999;
}
.employer-report /deep/ .el-collapse-item__wrap {
  border: none;
  border-top: 1px solid #e6ebf5;
  padding-top: 20px;
}
</style>