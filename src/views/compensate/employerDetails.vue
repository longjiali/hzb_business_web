<template>
  <div class='compensate-details' v-loading="loadingState">
    <div class='compensate-details-subject'>
      <div class='details-subject-header'>
        <div class='subject-header-title'>
          <div class='header-title-name'>资料收集</div>
          <div class='header-title-right'>
            <div class='title-right-name' @click='copyUploadUrl'>复制上传链接</div>
            <div class='title-right-name' @click='addDataType'>新增资料类型</div>
          </div>
        </div>
        <div class='subject-header-from'>
          <div class='item' v-for='(item, index) in listData' :key='index'>
            <dataCollection :boxSata='item.choose' v-if='item.status === "ADD"'>
              <template slot='collectionTitle'>
                <div class='page-collapse-title'>
                  <div class='collapse-title-left' @click='openCollapse(index)'>
                    <div class='title-left-icon' :class='{"title-left-icon_a": item.choose}'></div>
                    {{item.labelName}}
                  </div>
                  <div class='collapse-title-right'>
                    <div class='title-right-name' v-if='setRightNameState()' @click="deleteData(index)">删除资料</div>
                  </div>
                </div>
              </template>
              <template slot='collectionCentent'>
                <div class='header-from-item'>
                  <div class='header-from-tag' v-for='(Sitem, Sindex) in item.items' :key='Sindex'>
                    <template v-if='Sitem.status === "ADD"'>
                      <div class='from-tag-header'>
                        <div class='tag-header-input'>
                          <el-input placeholder='请输入附件名称' v-model="Sitem.attName"></el-input>
                        </div>
                        <div class='tag-header-input'>
                          <el-input placeholder='请输入备注' v-model='Sitem.attRemark'></el-input>
                        </div>
                        <div class='tag-header-check'>
                          <el-checkbox v-model="Sitem.required" true-label='Y'>必填</el-checkbox>
                        </div>
                        <div class='tag-header-reduce' v-if='setReduceState(item.items)' @click='deteleEnclosure(Sindex)'></div>
                        <div class='tag-header-add' @click='addEnclosure()'></div>
                        <div class='tag-header-upload'>
                          <div class='header-upload-tab'>
                            <i class='el-icon-upload2'></i>
                            <input type="file" accept='image/*' @change='addUploadFile($event, Sindex)'>
                          </div>
                        </div>
                      </div>
                      <div class='from-tag-base'>
                        <div class='tag-base-list' v-for='(Ditem, Dindex) in Sitem.atts' :key='Dindex'>
                          <div class='base-list-item' v-if='Ditem.attPath && Ditem.status === "ADD"'>
                            <i class='el-icon-paperclip'></i>
                            <div class='list-item-name'>
                              <a :href='Ditem.attPath' :download='`我的附件_${Dindex + 1}`'>
                                {{`我的附件_${Dindex + 1}`}}
                              </a>
                            </div>
                            <i class='el-icon-close' @click='deleteUploadFile(Sindex, Ditem.attPath)'></i>
                          </div>
                        </div>
                    </div>
                    </template>
                  </div>
                </div>
              </template>
            </dataCollection>
          </div>
        </div>
        <div class='subject-header-button'>
          <div class='header-button-item' @click='setOdsMaterialSave'>保存</div>
        </div>
      </div>
      <div class='details-subject-base'>
        <div class='subject-base-head'>
          <div class='base-head-item' :class='{"base-head-item_a": item.choose}' v-for='(item, index) in headList' :key='index' @click='changeHeadItem(item)'>{{ item.name }}</div>
        </div>
        <div class='subject-base-content'>
          <div class='base-content-item'>
            <pageReveal :listData='getPageReveallList()' :listDetailsData='infoDataDefault'></pageReveal>
          </div>
        </div>
      </div>
    </div>
    <div class='compensate-details-step'>
      <div class='details-step-header'>
        <div class='step-header-name'>跟踪情况</div>
        <div class='step-header-button' @click='openTrackInfo'>
          <div class='header-button-icon'></div>
          新增跟踪
        </div>
      </div>
      <div class='details-step-list'>
        <el-timeline v-if='noCarClaimsFollow.length > 0'>
          <el-timeline-item v-for='(item, index) in noCarClaimsFollow' :key='index'>
            <div class='step-list-head'>
              <div class='list-head-name'>{{ transformationDate(item.createTime, 2) }}</div>
              {{ item.createUser }}
            </div>
            <div class='step-list-item'>{{ item.content }}</div>
          </el-timeline-item>
        </el-timeline>
        <div class='step-list-item_no' v-else>当前案件暂无进展</div>
      </div>
    </div>
    <el-dialog title='新增资料类型' :visible.sync="dialogVisible" width="30%" >
      <el-input placeholder='请输入资料类型名称' v-model='addDataTypeName'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title='新增跟踪情况' :visible.sync="trackInfoState" width="30%" >
      <el-input type='textarea' placeholder='请输入新增跟踪情况' v-model='trackInfoContent'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trackInfoState = false">取 消</el-button>
        <el-button type="primary" @click="setNonCarClaimsFollowCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pageReveal from './components/pageReveal.vue'
import dataCollection from './components/dataCollection.vue'
import publicPageTablTool from '@/utils/publicPageTablTool'
import * as publicPageTool from '@/utils/publicPageTool'
import * as axios from '@/api/compensate/index'
import { getAttConfPolicyConfig } from '@/api/enclosureDeploy/index'
export default {
  data () {
    return {
      headList: [
        { name: '保单信息', model: 'policy', type: 'policy', choose: true },
        { name: '报案信息', model: 'nonCarLregistDTO', type: ''},
        { name: '立案信息', model: 'nonCarLclaimDTO', type: '' },
        { name: '估损信息', model: 'nonCarLclaimlossDTO', type: '' },
        { name: '理算信息', model: 'nonCarLcompensateDTO', type: '' },
        { name: '赔案信息', model: 'nonCarWebListLpDTO', type: '' }
      ],
      noCarClaimsFollow: [],
      listData: [],
      infoDataDefault: {},
      infoDataList: {},
      dialogVisible: false,
      trackInfoState: false,
      loadingState: false,
      showType: 'policy',
      trackInfoContent: '',
      addDataTypeName: ''
    }
  },
  components: {
    pageReveal,
    dataCollection
  },
  created () {
    this.getNonCarClaimsdetail(),
    this.getNonCarClaimsFollowQuery()
    this.getOdsMaterialDetail()
  },
  methods: {
    /**
     * @name 一级面板状态控制
     */
    openCollapse (item) {
      this.listData = this.listData.map((el, index) => {
        if (index === item) {
          el.choose = !el.choose
        } else {
          el.choose = false
        }
        return el
      })
    },

    /**
     * @name 复制上传链接
     */
    copyUploadUrl () {
      this.loadingState = true
      axios.setOdsMaterialSave(this.listData).then(res => {
        if (res.msg === 'Success') {
            axios.getOdsMaterialDetail(this.$route.query.registNo).then(rps => {
            this.listData = publicPageTool.nCarContrastData(this.listData, rps.data)
            const host = this.$router.mode === 'hash' ? `http://${window.location.host}/business/#/` : `http://${window.location.host}/business/`
            const url = `${host}uploadFile?pageType=employer&registNo=${this.$route.query.registNo}&accidentNo=${this.$route.query.accidentNo}`
            axios.setShortUrl({longUrl: url}).then(rps => {
              this.loadingState = false
              if (rps.msg === 'Success') {
                const longUrl = rps.data
                const inputTest = document.createElement('input')
                inputTest.value = longUrl
                document.body.appendChild(inputTest)
                inputTest.select()
                document.execCommand('Copy')
                inputTest.className = 'oInput'
                inputTest.style.display = 'none'
                this.$message.success('复制成功')
              }
            }).catch(() => {
              this.loadingState = false
              inputTest.value = url
              document.body.appendChild(inputTest)
              inputTest.select()
              document.execCommand('Copy')
              inputTest.className = 'oInput'
              inputTest.style.display = 'none'
              this.$message.success('复制成功')
            })
          }).catch(() => {
            this.loadingState = false
          })
        }
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 新增资料类型
     */
    addDataType () {
      this.addDataTypeName = ''
      this.dialogVisible = true
    },

    /**
     * @name 删除按钮状态
     */
    setReduceState (item) {
      const dome = item.filter(el => { return el.status === 'ADD'})
      return dome.length === 1 ? false : true
    },

    /**
     * @name 删除资料按钮状态
     */
    setRightNameState () {
      const dome = this.listData.filter(el => { return el.status === 'ADD'})
      return dome.length === 1 ? false : true
    },
    /**
     * @name 新增资料类型
     */
    confirmAdd () {
      const dome = this.listData.filter(el => { return el.labelName === this.addDataTypeName})
      if (dome.length) {
        this.$message.error('改资料类型已存在')
        return  
      }
      if (!this.addDataTypeName) {
        this.$message.error('请输入资料类型名称')
        return
      }
      this.listData.push({
        id: '',
        items: [
          {
            attName: '',
            attRemark: '',
            atts: [],
            id: '',
            status: 'ADD' 
          }
        ],
        labelName: this.addDataTypeName,
        registNo: this.$route.query.registNo,
        status: 'ADD'
      })
      this.dialogVisible = false
    },

    /**
     * @name 删除资料
     */
    deleteData (item) {
      this.listData = this.listData.map((el, key) => {
        if (key === item) {
          el.status = 'DELETE'
        }
        return el
      })
    },

    /**
     * @name 新增附件
     */
    addEnclosure () {
      this.listData = this.listData.map(el => {
        if (el.choose) {
          el.items.push({
            attName: '',
            attRemark: '',
            atts: [],
            id: '',
            status: 'ADD' 
          })
        }
        return el
      })
    },

    /**
     * @name 删除附件
     */
    deteleEnclosure (item) {
      this.listData = this.listData.map(el => {
        if (el.choose) {
          el.items.map((val, index) => {
            if (index === item) {
              val.status = 'DELETE'
            }
            return val
          })
        }
        return el
      }) 
    },

    /**
     * @name 删除上传附件文件
     */
    deleteUploadFile (index, path) {
      this.listData = this.listData.map(el => {
        if (el.choose) {
          el.items = el.items.map((val, key) => {
            if (key === index) {
              val.atts = val.atts.map(ev => {
                if (ev.attPath === path) {
                  ev.status = 'DELETE'
                }
                return ev
              })
            }
            return val
          })
        }
        return el
      })
    },

    /**
     * @name 上传附件文件
     */
    addUploadFile (file, index) {
      const fileInfo = file.target.files
      const form = new FormData()
      form.append("file", fileInfo[0])
      this.loadingState = true
      axios.setFileUpload(form).then(res => {
        this.loadingState = false
        this.listData = this.listData.map(el => {
          if (el.choose) {
            el.items = el.items.map((val, key) => {
              if (key === index) {
                val.atts.push({
                  attPath: res.data,
                  id: '',
                  status: 'ADD'
                })
              }
              return val
            })
          }
          return el
        })
      }).catch(() => { this.loadingState = false })
    },

    /**
     * @name 开启跟踪弹框
     */
    openTrackInfo () {
      this.trackInfoState = true
      this.trackInfoContent = ''
    },

    /**
     * @name 时间转换
     */
    transformationDate (item, state) {
      const dome = new Date(parseInt(item))
      console.log(dome)
      const year = dome.getFullYear()
      const month = dome.getMonth() + 1 >= 10 ? dome.getMonth() + 1 : `0${dome.getMonth() + 1}`
      const data = dome.getDate() >= 10 ? dome.getDate() : `0${dome.getDate()}`
      const hours = dome.getHours() >= 10 ? dome.getHours() : `0${dome.getHours()}`
      const minutes = dome.getMinutes() >= 10 ? dome.getMinutes() : `0${dome.getMinutes()}`
      const seconds = dome.getSeconds() >= 10 ? dome.getSeconds() : `0${dome.getSeconds()}`
      return `${year}-${month}-${data} ${hours}:${minutes}:${seconds}`
    },
    /**
     * @name 底部展示信息切换
     */
    changeHeadItem (item) {
      this.headList = this.headList.map(el => { return { ...el, choose: item.model === el.model }})
    },
    /**
    /**
     * @name 获取底部展示信息模板
     */
    getPageReveallList () {
      const data = new publicPageTablTool().getEmployerDetailsArray()
      const dome = this.headList.find(el => el.choose)
      const list = data.find(el => el.name === dome.name)
      return list
    },

    /**
     * @name 查询理赔详情
     */
    getNonCarClaimsdetail () {
      axios.getNonCarClaimsdetail(this.$route.query.registNo).then(res => {
        this.infoDataDefault = res.data
        this.infoDataDefault.insured = this.infoDataDefault.insured.map((el, index) => {
          el.number = index + 1
          return el
        })
        this.infoDataDefault.person = this.infoDataDefault.person.map((el, index) => {
          el.number = index + 1
          return el
        })
      })
    },
    /**
     * @name 查询跟踪详情
     */
    getNonCarClaimsFollowQuery () {
      axios.getNonCarClaimsFollowQuery(this.$route.query.registNo).then(res => {
        this.noCarClaimsFollow = res.data || []
      })
    },

    /**
     * @name 新增情况跟踪
     */
    setNonCarClaimsFollowCommit () {
      if (!this.trackInfoContent) {
        this.$message.error('跟踪情况不能为空')
        return
      }
      this.loadingState = true
      this.trackInfoState = false
      axios.setNonCarClaimsFollowCommit({ content: this.trackInfoContent, registNo: this.$route.query.registNo }).then(res => {
        this.loadingState = false
        if (res.msg = 'Success') {
          this.$message.success('新增成功')
          this.trackInfoState = false
          this.getNonCarClaimsFollowQuery()
        }
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 保存资料收集信息
     */
    setOdsMaterialSave () {
      for (let index = 0; index < this.listData.length; index++) {
        const element = this.listData[index]
        if (element.status === 'ADD') {
          for (let index1 = 0; index1 < element.items.length; index1++) {
            const val = element.items[index1]
            if (val.status === 'ADD' && !val.attName) {
              this.$message.error(`请完善${element.labelName}附件名称,或删除`)
              return
            }
          }
        }
      }
      this.loadingState = true
      axios.setOdsMaterialSave(this.listData).then(res => {
        if (res.msg === 'Success') {
          axios.getOdsMaterialDetail(this.$route.query.registNo).then(rps => {
            this.loadingState = false
            this.$message.success('资料收集成功')
            this.listData = publicPageTool.nCarContrastData(this.listData, rps.data)
          }).catch(() => {
            this.loadingState = false
          })
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    
    /**
     * @name 查询理赔资料收集信息
     */
    getOdsMaterialDetail () {
      this.loadingState = true
      axios.getOdsMaterialDetail(this.$route.query.registNo).then(res => {
        if (res.data.length === 0) {
          getAttConfPolicyConfig().then(rps => {
            this.loadingState = false
            this.listData = this.listDataSort(this.handleListData(rps.data))
          }).catch(() => {this.loadingState = false})
        } else {
          this.loadingState = false
          this.listData = this.listDataSort(res.data)
        }
      }).catch(() => {this.loadingState = false})
    },

    /**
     * @name 处理资料收集数据
     */
    handleListData (item) {
      const listData = []
      item.forEach(el => {
        const items = []
        el.items.forEach(val => {
          items.push({
            attName: val.attachmentName,
            attRemark: val.attachmentRemark,
            atts: [],
            id: '',
            status: 'ADD' 
          })
        })
        listData.push({
          id: '',
          items: items,
          labelName: el.labelName,
          registNo: this.$route.query.registNo,
          status: 'ADD'
        })
      })
      return listData
    },

    listDataSort (item) {
      return item.map((el, index) => {
        el.items.map((val, index2) => { return { ...val, choose: index2 === 0 }})
        return { ...el, choose: index === 0}
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/compensateDetails.scss';
</style>