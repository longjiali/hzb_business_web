<template>
  <div class='compensate-details' v-loading='loadingState'>
    <div class='compensate-details-subject'>
      <div class='details-subject-header'>
        <div class='subject-header-title'>
          <div class='header-title-name'>资料收集</div>
          <div class='header-title-name' @click='addThreeInfo'>新增三者</div>
        </div>
        <div class='subject-header-from'>
          <div class='item' v-for='(item, index) in materialDetail' :key='index'>
            <dataCollection :boxSata='item.choose' v-if='item.status === "ADD"'>
              <template slot='collectionTitle'>
                <div class='page-collapse-title'>
                  <div class='collapse-title-left' @click='openCollapse(item, index)'>
                    <div class='title-left-icon' :class='{"title-left-icon_a": item.choose}'></div>
                    {{ item.materialType === 'Subject' ? '标的' : '三者'}}
                  </div>
                  <div class='collapse-title-right'>
                    <div class='title-right-name' @click='copyUploadUrl(item)'>复制上传链接</div>
                    <div class='title-right-name' @click='addDataType(item.materialType)'>新增资料类型</div>
                    <div class='title-right-name' v-if='item.materialType !== "Subject"' @click='deleteDataType(index)'>删除三者</div>
                  </div>
                </div>
              </template>
              <template slot='collectionCentent'>
                <div class='header-from-item' v-for='(Titem, Tindex) in item.types' :key='Tindex'>
                  <dataCollection :boxSata='Titem.choose' v-if='Titem.status === "ADD"'>
                    <template slot='collectionTitle'>
                      <div class='page-collapse-title'>
                        <div class='collapse-title-left' @click='openTwoStage(item, Tindex)'>
                          <div class='title-left-icon' :class='{"title-left-icon_a": Titem.choose}'></div>
                          {{ Titem.labelName }}
                        </div>
                        <div class='collapse-title-right' v-if='Titem.labelName === "物损资料" || Titem.labelName === "人伤资料"'>
                          <div class='title-right-name' @click='addMeans(item,Tindex)'>{{`新增${Titem.labelName}`}}</div>
                        </div>
                        <div class='collapse-title-right' v-if='Titem.labelName !== "车损资料" && Titem.labelName !== "物损资料" && Titem.labelName !== "人伤资料"'>
                          <div class='title-right-name' @click='cutOutMeans(item, Tindex)'>{{`删除资料`}}</div>
                        </div>
                      </div>
                    </template>
                    <template slot='collectionCentent'>
                      <template v-if='Titem.labelName === "车损资料" || Titem.labelName === "物损资料" || Titem.labelName === "人伤资料"'>
                        <div class='header-from-item' v-for='(Sitem, Sindex) in Titem.items' :key='Sindex'>
                          <dataCollection :boxSata='Sitem.choose' v-if='Sitem.status === "ADD"'>
                            <template slot='collectionTitle'>
                              <div class='page-collapse-title'>
                                <div class='collapse-title-left'>
                                  <div class='title-left-icon' :class='{"title-left-icon_a": Sitem.choose}'  @click='openTertiary(item, Sindex)'></div>
                                  <div class='title-left-input'>
                                    <input type="text" v-if='Titem.labelName === "车损资料"' v-model='Sitem.numberPlate' :placeholder='`请输入车牌号`'>
                                    <input type="text" v-if='Titem.labelName === "物损资料"' v-model='Sitem.thingName' :placeholder='`请输入物损名称`'>
                                    <input type="text" v-if='Titem.labelName === "人伤资料"' v-model='Sitem.personName' :placeholder='`请输入伤者姓名`'>
                                  </div>
                                </div>
                                <template v-if='item.materialType === "Subject"'>
                                  <div class='collapse-title-right' v-if='Titem.labelName !== "车损资料"'>
                                    <div class='title-right-name' @click='deleteMeans(item, Sindex)'>{{`删除${Titem.labelName}`}}</div>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class='collapse-title-right'>
                                    <div class='title-right-name' @click='deleteMeans(item, Sindex)'>{{`删除${Titem.labelName}`}}</div>
                                  </div>
                                </template>

                              </div>
                            </template>
                            <template slot='collectionCentent'>
                              <div class='header-from-item'>
                                <div class='header-from-tag' v-for='(Citem, Cindex) in Sitem.remarks' :key='Cindex' v-show='Citem.status === "ADD"'>
                                  <div class='from-tag-header'>
                                    <div class='tag-header-input'>
                                      <el-input placeholder='请输入附件名称' v-model="Citem.attName"></el-input>
                                    </div>
                                    <div class='tag-header-input'>
                                      <el-input placeholder='请输入备注' v-model='Citem.attRemark'></el-input>
                                    </div>
                                    <div class='tag-header-check'>
                                      <el-checkbox v-model="Citem.required" true-label='Y'>必填</el-checkbox>
                                    </div>
                                    <template v-if='Titem.labelName === "车损资料"'>
                                      <div class='tag-header-reduce' v-if='getReduceButtonState(Sitem.remarks) !== 1' @click='deleteEnclosure("children", item, Cindex)'></div>
                                    </template>
                                    <template v-else>
                                      <div class='tag-header-reduce' v-if='getReduceButtonState(Sitem.remarks) !== 1'  @click='deleteEnclosure("children", item, Cindex)'></div>
                                    </template>
                                    <div class='tag-header-add' @click='addEnclosure("children",item)'></div>
                                    <div class='tag-header-upload'>
                                      <div class='header-upload-tab'>
                                        <i class='el-icon-upload2'></i>
                                        <input type="file" @change='uploadFile($event,  item, Cindex)' accept='image/*'>
                                      </div>
                                    </div>
                                  </div>
                                  <div class='from-tag-base'>
                                    <div class='tag-base-list' v-for='(Ditem, Dindex) in Citem.atts' :key='Dindex'>
                                      <div class='base-list-item' v-if='Ditem.attPath && Ditem.status === "ADD"'>
                                        <i class='el-icon-paperclip'></i>
                                        <div class='list-item-name'>
                                          <a :href='Ditem.attPath'>
                                            {{`我的附件_${Dindex + 1}`}}
                                          </a>
                                        </div>
                                        <i class='el-icon-close' @click='deleteUploadFile(item, Cindex, Ditem.attPath)'></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </dataCollection>
                        </div>
                      </template>
                      <template v-else>
                        <div class='header-from-item'>
                          <div class='header-from-tag' v-for='(Sitem, Sindex) in Titem.items[0].remarks' :key='Sindex'>
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
                                <div class='tag-header-reduce' @click='deleteEnclosure("items", item, Sindex)'></div>
                                <div class='tag-header-add' @click='addEnclosure("items",item)'></div>
                                <div class='tag-header-upload'>
                                  <div class='header-upload-tab'>
                                    <i class='el-icon-upload2'></i>
                                    <input type="file" @change='uploadFile($event,  item, Sindex, "items")' accept='image/*'>
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
                                    <i class='el-icon-close' @click='deleteUploadFile(item, Sindex, Ditem.attPath, "items")'></i>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </template>
                  </dataCollection>
                </div>
              </template>
            </dataCollection>
          </div>
        </div>
        <div class='subject-header-button'>
          <div class='header-button-item' @click='setMaterialSave'>保存</div>
        </div>
      </div>
      <div class='details-subject-base'>
        <div class='subject-base-head'>
          <div class='base-head-item' :class='{"base-head-item_a": item.choose}' v-for='(item, index) in headList' :key='index' @click='changeHeadItem(item)'>{{ item.name }}</div>
        </div>
        <div class='subject-base-content'>
          <div class='base-content-item'>
            <Public-Details-Reveal :listData='getPageReveallList()' :modelListData='carClaimsDetailList'></Public-Details-Reveal>
            <!-- <pageReveal :listData='getPageReveallList()' :listDetailsData='carClaimsDetailList'></pageReveal> -->
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
        <el-timeline v-if='carClaimsFollow.length > 0'>
          <el-timeline-item v-for='(item, index) in carClaimsFollow' :key='index'>
            <div class='step-list-head'>
              <div class='list-head-name'>{{ transformationDate(item.createTime) }}</div>
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
    <el-dialog title='新增跟踪情况' :visible.sync="trackInfoState" width="30%" v-loading='addThreeState'>
      <el-input type='textarea' placeholder='请输入新增跟踪情况' v-model='trackInfoContent'></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trackInfoState = false">取 消</el-button>
        <el-button type="primary" @click="getCarClaimsFollowCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pageReveal from './components/pageReveal.vue'
import dataCollection from './components/dataCollection.vue'
import PublicDetailsReveal from '@/components/publicDetailsReveal/index'
import publicPageTablTool from '@/utils/publicPageTablTool'
import * as publicPageTool from '@/utils/publicPageTool'
import * as axios from '@/api/compensate/index'
import { getAttConfCarConfig } from '@/api/enclosureDeploy/index'
export default {
  data () {
    return {
      headList: [
        { name: '保单信息', model: '', choose: true },
        { name: '报案信息', model: '' },
        { name: '立案信息', model: '' },
        { name: '定损信息', model: '' },
        { name: '理算信息', model: '' },
        { name: '结案信息', model: '' }
      ],
      materialDetail: [],
      defaultDetail: [],
      carClaimsFollow: [],
      carClaimsDetailList: {},
      loadingState: false,
      dialogVisible: false,
      addThreeState: false,
      trackInfoState: false,
      addDataTypeStat: '',
      addDataTypeName: '',
      trackInfoContent: ''
    }
  },
  components: {
    pageReveal,
    dataCollection,
    PublicDetailsReveal
  },
  created () {
    this.getCarClaimsDetail()
    this.getMaterialDetail()
    this.getCarClaimsFollowQuery()
  },
  methods: {

    /**
     * @name 新增三者
     */
    addThreeInfo () {
      this.defaultDetail.forEach(el => {
        if (el.materialType === 'three') {
          this.materialDetail.push(el)
        }
      })
    },

    /**
     * @name 复制上传链接
     */
    copyUploadUrl (item) {
      this.loadingState = true
      axios.setMaterialSave(this.materialDetail).then(res => {
        if (res.msg === 'Success') {
          axios.getMaterialDetail(this.$route.query.accidentNo).then(rps => {
            this.materialDetail = publicPageTool.contrastData(this.materialDetail, rps.data)
            const host = this.$router.mode === 'hash' ? `http://${window.location.host}/business/#/` : `http://${window.location.host}/business/`
            const url = `${host}uploadFile?pageType=carInsurance&shoeType=${item.materialType}&registNo=${this.$route.query.registNo}&accidentNo=${this.$route.query.accidentNo}&modeId=${item.id}`
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
    addDataType (item) {
      this.dialogVisible = true
      this.addDataTypeStat = item
      this.addDataTypeName = ''
    },
    /**
     * @name 删除三者
     */
    deleteDataType (index) {
      this.materialDetail = this.materialDetail.map((el, key) => {
        if (key === index) {
          el.status = 'DELETE'
        }
        return el
      })
    },

    /**
     * @name 确认新增
     */
    confirmAdd () {
      if (this.addDataTypeName === "车损资料" || this.addDataTypeName === "物损资料" || this.addDataTypeName === "人伤资料") {
        this.$message.error(`${this.addDataTypeName}已存在,无法新增`)
        return
      }
      const data = {
        id: '',
        items: [
          {
            id: '',
            numberPlate: '',
            personAge: '',
            personCardNo: '',
            personName: '',
            personSex: '',
            status: 'ADD',
            thingName: '',
            remarks: [
              {
                attName: '',
                attRemark: '',
                atts: [],
                id: '',
                status: 'ADD'
              }
            ]
          }
        ],
        labelName: this.addDataTypeName,
        status: 'ADD'
      }
      this.materialDetail = this.materialDetail.map(el => {
        if (el.materialType === this.addDataTypeStat) {
          el.types.push(data)
        }
        return el
      })
      this.dialogVisible = false
      this.$message.success('新增成功')
    },
    /**
     * @name 一级面板状态设置
     */
    openCollapse (item, index) {
      this.materialDetail = this.materialDetail.map((el, state) => { 
        if (el.choose) {
          el.choose = false
        } else {
          el.choose = item.materialType === el.materialType && state === index
        }
        return el
      })
    },

    /**
     * @name 二级面板状态设置
     */
    openTwoStage (item, Tindex) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.choose) {
          el.types = el.types.map((val, state) => {
            if (val.choose) {
              val.choose = false
            } else {
              val.choose = state === Tindex
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 三级面板状态设置
     */
    openTertiary (item,Sindex) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.choose) {
          el.types = el.types.map(val => {
            if (val.choose) {
              val.items = val.items.map((en, state) => {
                if (en.choose) {
                  en.choose = false
                } else {
                  en.choose = state === Sindex
                }
                return en
              })
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 新增资料
     */
    addMeans (item, index) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.choose) {
          el.types = el.types.map((val, state) => {
            if (state === index && val.choose) {
              this.defaultDetail.forEach(del => {
                if (del.materialType === item.materialType) {
                  del.types.forEach(dval => {
                    if (dval.labelName === val.labelName) {
                      val.items.push({
                        id: '',
                        numberPlate: '',
                        personAge: '',
                        personCardNo: '',
                        personName: '',
                        personSex: '',
                        thingName: '',
                        status: 'ADD',
                        remarks: dval.items[0].remarks
                      })
                    }
                  })
                }
              })
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 删除资料
     */
    cutOutMeans (item, Tindex) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.choose) {
          el.types = el.types.map((val, state) => {
            if (state === Tindex) {
              val.status = 'DELETE'
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 删除资料
     */
    deleteMeans (item, Sindex) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.choose) {
          el.types = el.types.map((val) => {
            if (val.choose) {
              val.items = val.items.map((en, state) => {
                if (state === Sindex) {
                  en.status = 'DELETE'
                }
                return en
              })
            }
            return val
          })
        }
        return el
      })
    },

    /**
     * @name 删除附件
     */
    deleteEnclosure (type, item, Cindex) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.materialType === item.materialType) {
          el.types = el.types.map(val => {
            if (val.choose) {
              if (type === 'children') {
                val.items = val.items.map(ev => {
                  if (ev.choose) {
                    ev.remarks = ev.remarks.map((em, state) => {
                      if (state === Cindex) {
                        em.status = 'DELETE'
                      }
                      return em
                    })
                  }
                  return ev
                })
              } else if (type === 'items') {
                val.items[0].remarks = val.items[0].remarks.map((em, state) => {
                  if (state === Cindex) {
                    em.status = 'DELETE'
                  }
                  return em
                })
              }
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 新增附件
     */
    addEnclosure (type, item) {
      this.materialDetail = this.materialDetail.map(el => {
        if (el.materialType === item.materialType) {
          el.types = el.types.map(val => {
            if (val.choose) {
              if (type === 'children') {
                val.items = val.items.map(ev => {
                  if (ev.choose) {
                    ev.remarks.push({
                      attName: '',
                      attRemark: '',
                      atts: [],
                      id: '',
                      required: '',
                      status: 'ADD'
                    })
                  }
                  return ev
                })
              } else if (type === 'items') {
                val.items[0].remarks.push({
                  attName: '',
                  attRemark: '',
                  atts: [],
                  id: '',
                  required: '',
                  status: 'ADD'
                })
              }
            }
            return val
          })
        }
        return el
      })
    },
    /**
     * @name 保存车险资料收集
     */
    setMaterialSave () {
      for (let index = 0; index < this.materialDetail.length; index++) {
        const element = this.materialDetail[index]
        if (element.status === 'ADD') {
          for (let index1 = 0; index1 < element.types.length; index1++) {
            const el = element.types[index1]
            if (el.labelName === "物损资料" || el.labelName === "人伤资料" || el.labelName === '车损资料') {
              const dome = el.items.filter(el => { return el.status === 'ADD'})
              for (let index2 = 0; index2 < dome.length; index2++) {
                const val = dome[index2]
                if (el.labelName === '车损资料' && dome.length !== 0) {
                  if (!val.numberPlate) {
                    this.$message.error(`${element.materialType === 'Subject' ? '标的' : '三者'}车损资料车牌号不能为空`)
                    return
                  }
                  const domes = val.remarks.find(em => !em.attName && em.status === 'ADD')
                  if (domes) {
                    this.$message.error(`请完善${element.materialType === 'Subject' ? '标的' : '三者'}车损资料${val.numberPlate}附件名称, 或删除`)
                    return
                  }
                }
                if (el.labelName === '物损资料' && dome.length !== 0) {
                  if (!val.thingName) {
                    this.$message.error(`${element.materialType === 'Subject' ? '标的' : '三者'}物损资料物损名称不能为空`)
                    return
                  }
                  const domes = val.remarks.find(em => !em.attName && em.status === 'ADD')
                  if (domes) {
                    this.$message.error(`请完善${element.materialType === 'Subject' ? '标的' : '三者'}物损资料${val.thingName}附件名称, 或删除`)
                    return
                  }
                }
                if (el.labelName === '人伤资料' && dome.length !== 0) {
                  if (!val.personName) {
                    this.$message.error(`${eelement.materialType === 'Subject' ? '标的' : '三者'}人伤资料伤者姓名不能为空`)
                    return
                  }
                  const domes = val.remarks.find(em => !em.attName && em.status === 'ADD')
                  if (domes) {
                    this.$message.error(`请完善${element.materialType === 'Subject' ? '标的' : '三者'}人伤资料${val.personName}附件名称, 或删除`)
                    return
                  }
                }
              }
            } else {
              if (el.status === 'ADD') {
                const data = el.items[0].remarks
                const domes = data.find(el => !el.attName && el.status === 'ADD' )
                if (domes) {
                  this.$message.error(`请完善${element.materialType === 'Subject' ? '标的' : '三者'}${el.labelName}附件名称, 或删除`)
                  return
                }
              }
            }
          }
        }
      }
      this.loadingState = true
      axios.setMaterialSave(this.materialDetail).then(res => {
        if (res.msg === 'Success') {
          axios.getMaterialDetail(this.$route.query.accidentNo).then(rps => {
            this.materialDetail = publicPageTool.contrastData(this.materialDetail, rps.data)
            this.loadingState = false
            this.$message.success('资料保存成功')
          })
        }
      }).catch(() => {
        this.loadingState = false
      })
    },

    getReduceButtonState (item) {
      const dome = item.filter(el => el.status === 'ADD')
      return dome.length
    },

    /**
     * @name 开启跟踪弹框
     */
    openTrackInfo () {
      this.trackInfoState = true
      this.addDataTypeName = ''
    },
    /**
     * @name 时间转换
     */
    transformationDate (item) {
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
      this.headList = this.headList.map(el => { return { ...el, choose: item.name === el.name }})
    },
    /**
     * @name 删除指定上传文件
     */
    deleteUploadFile (item, Cindex,attPath, type) {
        this.materialDetail = this.materialDetail.map(el => {
          if (el.materialType === item.materialType) {
            el.types = el.types.map(val => {
              if (val.choose) {
                if (type === 'items') {
                  val.items[0].remarks = val.items[0].remarks.map((ev, key) => {
                    if (key === Cindex) {
                      ev.atts = ev.atts.map(et => {
                        if (et.attPath === attPath) {
                          et.status = 'DELETE'
                        }
                        return et
                      })
                    }
                    return ev
                  })
                } else {
                  val.items = val.items.map(ev => {
                    if (ev.choose) {
                      ev.remarks = ev.remarks.map((em, state) => {
                        if (state === Cindex) {
                          em.atts = em.atts.map(et => {
                            if (et.attPath === attPath) {
                              et.status = 'DELETE'
                            }
                            return et
                          })
                        }
                        return em
                      })
                    }
                    return ev
                  })
                }
              }
              return val
            })
          }
          return el
        })
    },
    /**
     * @name 上传文件
     */
    uploadFile (file, item, Cindex, types) {
      const fileInfo = file.target.files
      const form = new FormData()
      form.append("file", fileInfo[0])
      this.loadingState = true
      axios.setFileUpload(form).then(res => {
        this.loadingState = false
        this.materialDetail = this.materialDetail.map(el => {
          if (el.materialType === item.materialType) {
            el.types = el.types.map(val => {
              if (val.choose) {
                if (types === 'items') {
                  val.items[0].remarks = val.items[0].remarks.map((em, state) => {
                    if (state === Cindex) {
                      em.atts.push({ attPath: res.data, id: '', status: 'ADD'})
                    }
                    return em
                  })
                } else {
                  val.items = val.items.map(ev => {
                    if (ev.choose) {
                      ev.remarks = ev.remarks.map((em, state) => {
                        if (state === Cindex) {
                          em.atts.push({ attPath: res.data, id: '', status: 'ADD'})
                        }
                        return em
                      })
                    }
                    return ev
                  })
                }
              }
              return val
            })
          }
          return el
        })
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 获取底部展示信息模板
     */
    getPageReveallList () {
      const data = new publicPageTablTool().getCarInsuranceDetailsArray()
      const dome = this.headList.find(el => el.choose)
      const list = data.find(el => el.name === dome.name)
      return list
    },

    /**
     * @name 查询理赔详情
     */
    getCarClaimsDetail () {
      axios.getCarClaimsDetail(this.$route.query.accidentNo).then(res => {
        this.carClaimsDetailList = res.data
      })
    },

    /**
     * @name 查询跟踪信息
     */
    getCarClaimsFollowQuery () {
      axios.getCarClaimsFollowQuery(this.$route.query.accidentNo).then(res => {
        if (res.data) {
          this.carClaimsFollow = res.data
        }
      })
    },

    /**
     * @name 保存跟踪信息
     */
    getCarClaimsFollowCommit () {
      if (!this.trackInfoContent) {
        this.$message.error('请输入跟踪详情')
        return
      }
      this.addThreeState = true
      axios.getCarClaimsFollowCommit({
        accidentNo: this.$route.query.accidentNo,
        content: this.trackInfoContent
      }).then(res => {
        this.addThreeState = false
        this.trackInfoState = false
        if (res.msg === 'Success') {
          this.getCarClaimsFollowQuery()
        }
      }).catch(() => {
        this.addThreeState = false
      })
    },

    /**
     * @name 获取车险理赔资料收集配置
     */
    getMaterialDetail () {
      this.loadingState = true
      axios.getMaterialDetail(this.$route.query.accidentNo).then(res => {
        if (res.data.length === 0) {
          getAttConfCarConfig('all').then(rps => {
            this.loadingState = false
            this.defaultDetail = this.handleMaterialDetail(rps.data)
            this.materialDetail = this.handleMaterialDetail(rps.data)
          }).catch(() => {
            this.loadingState = false
          })
        } else {
          getAttConfCarConfig('all').then(rps => {
            this.defaultDetail = this.handleMaterialDetail(rps.data)
          })
          this.loadingState = false
          this.materialDetail = this.materialDetailSlot(res.data)
        }
      }).catch(() => {
        this.loadingState = false
      })
    },
    /**
     * @name 处理车险理赔资料收集配置信息数据
     */
    handleMaterialDetail (item) {
      let dome = []
      item.forEach(el => {
        const data = {}
        const types = []
        el.config.forEach(val => {
          const items = []
          const remarks = []
          val.items.forEach(el => {
            const atts = [{ id: '', attPath: '', status: 'ADD'}]
            remarks.push({ atts: atts, status: 'ADD', id: '', attName: el.attachmentName, attRemark: el.attachmentRemark, required: el.required})
          })
          items.push({
            id: '',
            numberPlate: '',
            personAge: '',
            personCardNo: '',
            personName: '',
            personSex: '',
            thingName: '',
            status: 'ADD',
            remarks: remarks
          })
          types.push({
            id: '',
            labelName: val.labelName,
            status: 'ADD',
            items: items
          })
        })
        data.materialType = el.type
        data.accidentNo = this.$route.query.accidentNo
        data.id = ''
        data.types = types
        data.status = 'ADD'
        dome.push(data)
      })
      return this.materialDetailSlot(dome)
    },

    /**
     * @name 详情数据排序
     */
    materialDetailSlot (item) {
      return item.map((el, index) => {
        el.types = el.types.map((val, index2) => {
          val.items = val.items.map((en, index3) => {
            return { ...en, choose: index3 === 0 }
          })
          return { ...val, choose: index2 === 0 }
        })
        return { ...el, choose: index === 0 }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/compensateDetails.scss';
</style>