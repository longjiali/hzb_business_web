<template>
  <div class='carInsurance' v-loading="loadingState">
    <div class='carInsurance-item'>
      <div class='carInsurance-item-head'>
        <div class='item-head-left'>
          <div class='head-left-icon'></div>
          报案客户自助上传附件配置
        </div>
      </div>
      <div class='carInsurance-item-content'>
        <div class='content-list-button'>
          <el-button type="primary" @click='addLabel'>新增标签</el-button>
        </div>
        <div class='content-label-list'>
          <div class='label-list-item' :class='{"label-list-item_a": item.choose}' v-for='(item, index) in listData' :key='index' @click='changeLabel(item)'>
            {{ item.labelName }}
            <i class='el-icon-close' @click.stop='deleteLabel(item)'></i>
          </div>
        </div>
        <div class='item-content-list'>
          <div class='content-list-tab' v-for='(item, index) in getListItem()' :key='index'>
            <div class='list-tab-name'>附件名称:</div>
            <div class='list-tab-input'>
              <el-input v-model="item.attachmentName" placeholder="请输入附件名称"></el-input>
            </div>
            <div class='list-tab-input'>
              <el-input v-model="item.attachmentRemark" placeholder="请输入附件备注、描述"></el-input>
            </div>
            <div class='list-tab-check'>
              <el-checkbox v-model="item.required" true-label='Y'>必填</el-checkbox>
            </div>
            <div class='list-tab-reduce' v-if='getListItem().length > 1' @click="deleteEnclosure(item)"></div>
            <div class='list-tab-add' v-if='getListItem().length === index + 1' @click='addEnclosure'></div>
          </div>
          <div class='item-content-button'><el-button type="primary" @click='preservationLabelData()'>保存</el-button></div>
        </div>
      </div>
    </div>
    <el-dialog title='新增标签' :visible.sync='dialogVisible' width="30%">
      <div class='page-dialog-tab'>
        <el-input v-model="addLabelName" placeholder="请输入标签名称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click='setAttConfSaveLabel'>确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '@/api/enclosureDeploy/index'
export default {
  data () {
    return {
      listData: [],
      dialogVisible: false,
      loadingState: false,
      addLabelName: ''
    }
  },
  created () {
    this.getAttConfPolicyConfig()
  },
  methods: {
    /**
     * @name 切换标签
     */
    changeLabel (item) {
      this.listData = this.listData.map(el => {
        return { ...el, choose: el.labelName === item.labelName }
      })
    },
    /**
     * @name 开启新增标签对话框
     */
    addLabel () {
      this.dialogVisible = true
    },
    /**
     * @name 删除当前配置标签
     */
    deleteLabel (item) {
      const params = item
      params.type = 'policy'
      this.loadingState = true
      axios.delAttConfDeleteLabel (params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success('删除标签成功')
          this.getAttConfPolicyConfig()
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 删除当前标签配置
     */
    deleteEnclosure (item) {
      const label = this.listData.find(el => el.choose)
      const params = {
        id: item.id,
        items: [
          {
            attachmentName: item.attachmentName,
            attachmentRemark: item.attachmentRemark,
            id: item.id,
            labelId: label.labelId,
            required: item.required
          }
        ],
        type: 'policy'
      }
      this.loadingState = true
      axios.delAttConfDeleteItem(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          // this.$message.success('附件删除成功')
          this.getAttConfPolicyConfig(label.labelId)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 当前标签新增配置
     */
    addEnclosure () {
      const label = this.listData.find(el => el.choose)
      const params = {
        items: [
          {
            attachmentName: '',
            attachmentRemark: '',
            id: '',
            labelId: label.labelId,
            required: ''
          }
        ],
        type: 'policy'
      }
      this.loadingState = true
      axios.adddelAttConfUpsertItem(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          // this.$message.success(`附件新增成功`)
          this.getAttConfPolicyConfig(label.labelId)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @nmae 新增\修改当前标签附件
     */
    preservationLabelData () {
      const label = this.listData.find(el => el.choose)
      const dome = label.items.find(el => el.attachmentName === '')
      if (dome) {
        this.$message.error('请填写附件名称、或删除多余附件')
        return
      }
      const params = {
        items: label.items,
        type: 'policy'
      }
      this.loadingState = true
      axios.adddelAttConfUpsertItem(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success(`数据保存成功`)
          this.getAttConfPolicyConfig(label.labelId)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 获取当前选择标签配置内容
     */
    getListItem () {
      const dome = this.listData.find(el => el.choose)
      if (!dome || !dome.items || !dome.items.length) {
        dome.items.push({ attachmentName: '', attachmentRemark: '', id: '', required: '' })
      }
      return dome.items
    },
    /**
     * @name 查询雇主责任险配置信息
     */
    getAttConfPolicyConfig (item) {
      this.loadingState = true
      axios.getAttConfPolicyConfig().then(res =>{
        this.loadingState = false
        this.listData = res.data
        this.listData = this.listData.map((el, index) => {
          return { ...el, choose: item ? el.labelId === item :  index === 0 }
        })
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 新增标签
     */
    setAttConfSaveLabel () {
      const params = {
        labelId: '',
        labelName: this.addLabelName,
        type: 'policy'
      }
      this.loadingState = true
      axios.setAttConfSaveLabel(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success('新增标签成功')
          this.dialogVisible = false
          this.getAttConfPolicyConfig()
        }
      }).catch(() => {
        this.loadingState = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.carInsurance {
  padding: 20px;
  min-height: 100%;
  .carInsurance-item {
    padding: 20px 8px;
    background: #FFFFFF;
    border-radius: 8px;
    .carInsurance-item-head {
      @include flex_layout;
      padding: 10px 0;
      background: #F5F5F5;
      .item-head-left {
        flex: 1;
        @include flex_layout(center, flex-start);
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        .head-left-icon {
          width: 4px;
          height: 14px;
          background: #3B73E6;
          border-radius: 2px;
          margin-right: 8px;
        }
      }
      .item-head-button {
        flex: 0 0 auto;
        margin-right: 16px;
      }
    }
    .carInsurance-item-content {
      .content-list-button {
        margin-top: 20px;
      }
      .content-label-list {
        margin-top: 20px;
        border-bottom: 2px solid #EAEAEA;
        @include flex_layout(center, flex-start);
        .label-list-item {
          flex: 0 0 auto;
          font-size: 14px;
          color: #222222;
          padding-bottom: 14px;
          margin-right: 20px;
          i {
            margin-left: 5px;
            cursor: pointer;
          }
          &:last-child {
            margin-right: 0;
          }
        }
        .label-list-item_a {
          font-weight: bold;
          border-bottom: 2px solid #3B73E6;
          margin-bottom: -2px;
        }
      }
      .item-content-list {
        margin-top: 20px;
        .item-content-button {
          margin-top: 20px;
          @include flex_layout;
        }
        .content-list-tab {
          @include flex_layout(center, flex-start);
          margin-bottom: 20px;
          .list-tab-name {
            flex: 0 0 auto;
            font-size: 13px;
            color: #999999;
          }
          .list-tab-input {
            flex: 0 0 auto;
            margin-left: 15px;
          }
          .list-tab-check {
            flex: 0 0 auto;
            margin-left: 15px;
          }
          .list-tab-add {
            width: 24px;
            height: 24px;
            background: #3B73E6;
            border-radius: 50%;
            margin-left: 15px;
            position: relative;
            cursor: pointer;
            &::after {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              -ms-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
              background: #FFFFFF;
              border-radius: 2px;
              width: 2px;
              height: 14px;
            }
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              -ms-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
              background: #FFFFFF;
              border-radius: 2px;
              width: 14px;
              height: 2px;
            }
          }
          .list-tab-reduce {
            width: 24px;
            height: 24px;
            background: #E6593B;
            border-radius: 50%;
            margin-left: 15px;
            position: relative;
            cursor: pointer;
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              -ms-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
              background: #FFFFFF;
              border-radius: 2px;
              width: 14px;
              height: 2px;
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .carInsurance-item-buttom {
      margin-top: 20px;
      @include flex_layout;
    }
  }
  .page-dialog-tab {
    .dialog-footer {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>