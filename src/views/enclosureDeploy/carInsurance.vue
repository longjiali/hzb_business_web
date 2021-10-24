<template>
  <div class='carInsurance' v-loading="loadingState">
    <div class='carInsurance-item' v-for='(item, index) in listData' :key='index'>
      <div class='carInsurance-item-head'>
        <div class='item-head-left'>
          <div class='head-left-icon'></div>
          配置车险{{item.type === 'Subject' ? '标的' : '三者'}}资料收集附件
        </div>
      </div>
      <div class='carInsurance-item-content'>
        <div class='content-list-button'>
          <el-button type="primary" @click='addLabel(item.type)'>新增标签</el-button>
        </div>
        <div class='content-label-list' v-if='item.config.length'>
          <div class='label-list-item' :class='{"label-list-item_a": Titem.choose}' v-for='(Titem, Tindex) in item.config' :key='Tindex' @click='changeLabel(item, Titem)'>
            {{ Titem.labelName}}
            <i class='el-icon-close' @click.stop='deleteLabel(item, Titem)'></i>
          </div>
        </div>
        <div class='item-content-list' v-if='item.config.length'>
          <div class='content-list-tab' v-for='(Titem, Tindex) in getConfigItem(item.type)' :key='Tindex'>
            <div class='list-tab-name'>附件名称:</div>
            <div class='list-tab-input'>
              <el-input v-model="Titem.attachmentName" placeholder="请输入附件名称"></el-input>
            </div>
            <div class='list-tab-input'>
              <el-input v-model="Titem.attachmentRemark" placeholder="请输入附件备注、描述"></el-input>
            </div>
            <div class='list-tab-check'>
              <el-checkbox v-model="Titem.required" true-label='Y'>必填</el-checkbox>
            </div>
            <div class='list-tab-reduce' v-if='getConfigItem(item.type).length > 1' @click="deleteEnclosure(item,Titem)"></div>
            <div class='list-tab-add' v-if='getConfigItem(item.type).length  === Tindex + 1' @click='preservationLabelData(item,Titem, "add")'></div>
          </div>
          <div class='item-content-button'>
             <el-button type="primary" @click='preservationLabelData(item, "", "preservationLabel")'>保存</el-button>
          </div>
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
      addLabelType: '',
      addLabelName: ''
    }
  },
  created () {
    this.getAttConfCarConfig()
  },
  methods: {
    /**
     * @name 开启新增标签对话框
     */
    addLabel (item) {
      this.dialogVisible = true
      this.addLabelType = item
    },

    /**
     * @name 切换标签
     */
    changeLabel (item, Titem) {
      this.listData = this.listData.map(el => {
        if (el.type === item.type) {
          el.config = el.config.map(val => {
            return { ...val, choose: val.labelId === Titem.labelId }
          })
        }
        return el
      })
    },

    /**
     * @name 删除当前配置标签
     */
    deleteLabel (item, Titem) {
      const params = Titem
      params.type = 'car'
      params.labelType = item.type
      this.loadingState = true
      axios.delAttConfDeleteLabel (params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          this.$message.success('删除标签成功')
          this.getAttConfCarConfig()
        }
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
        labelType: this.addLabelType,
        type: 'car'
      }
      axios.setAttConfSaveLabel(params).then(res => {
        if (res.msg === 'Success') {
          this.$message.success('新增标签成功')
          this.dialogVisible = false
          this.getAttConfCarConfig()
        }
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 删除当前标签配置
     */
    deleteEnclosure (item, Titem) {
      const label = item.config.find(el => el.choose)
      const params = {
        id: Titem.id,
        items: [
          {
            attachmentName: Titem.attachmentName,
            attachmentRemark: Titem.attachmentRemark,
            id: Titem.id,
            labelId: label.labelId,
            required: Titem.required  || ''
          }
        ],
        type: 'car'
      }
      this.loadingState = true
      axios.delAttConfDeleteItem(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          // this.$message.success('附件删除成功')
          this.getAttConfCarConfig(item.type, label.labelId)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 新增修改当前标签附件
     */
    preservationLabelData (item, Titem, state) {
      const label = item.config.find(el => el.choose)
      let params = {}
      if (state === 'add') {
        params = {
          id: state === 'add' ? '' : Titem.id,
          items: [
            {
              attachmentName: '',
              attachmentRemark: '',
              id: '',
              labelId: label.labelId,
              required: ''
            }
          ],
          type: 'car'
        }
      }
      if (state === 'preservationLabel') {
        const dome = label.items.find(el => el.attachmentName === '')
        if (dome) {
          this.$message.error('请填写附件名称、或删除多余附件')
          return
        }
        params = {
          items: label.items,
          type: 'car'
        }
      }
      this.loadingState = true
      axios.adddelAttConfUpsertItem(params).then(res => {
        this.loadingState = false
        if (res.msg === 'Success') {
          if (state !== 'add') {
            this.$message.success('附件修改成功')
          }
          this.getAttConfCarConfig(item.type, label.labelId)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 获取标签对应配置
     */
    getConfigItem (item) {
      const config = this.listData.find(el => el.type === item) && this.listData.find(el => el.type === item).config
      const dome = config && config.find(el => el.choose)
      if (!dome || !dome.items || !dome.items.length) {
        dome.items.push({ attachmentName: '', attachmentRemark: '', id: '', required: '' })
      }
      return dome.items
    },
    /**
     * @name 查询车险配置信息列表
     */
    getAttConfCarConfig (item, state) {
      this.loadingState = true
      axios.getAttConfCarConfig('all').then(res => {
        this.listData = res.data
        this.loadingState = false
        this.listData = this.listData.map(el => {
          if (el.type === item && state ) {
            if (el.config.length > 0) {
              el.config = el.config.map(val => {
                return { ...val, choose: val.labelId === state}
              })
            }
          } else {
            if (el.config.length > 0) {
              el.config = el.config.map((val, index) => {
                return { ...val, choose: index === 0}
              })
            }
          }
          return el
        })
      }).catch(() => {
        this.loadingState = false
      })
    },
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
    margin-top: 20px;
    &:nth-child(1) {
      margin-top: 0;
    }
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
          &:last-child {
            margin-bottom: 0;
          }
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
        }
      }
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