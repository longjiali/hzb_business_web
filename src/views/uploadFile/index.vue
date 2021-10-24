<template>
  <div class='uploadFile' id='uploadFile' @touchstart='setTouchstart' @touchmove='setTouchmove' @touchend='setTouchend'>
    <div class='uploadFile-header'>
      <div class='uploadFile-header-item'>
        <div class='header-item-icon'>
          <img src="@/assets/logo/icon_1@2x.png" alt="">
        </div>
        {{registNo}}报案自助
      </div>
    </div>
    <div class='uploadFile-main'>
      <div class='uploadFile-main-item'>
        <div class='uploadFile-main-toast'>
          <div class='main-toast-header'>
            <div class='toast-header-icon'><img src='@/assets/logo/icon_@2x.png' alt=""></div>
            报案信息
          </div>
          <div class='main-toast-list'>
            <div class='toast-list-item' v-for='(item, index) in toastList[pageType]' :key='index'>
              <div class='list-item-name'>{{ item.name }}:</div>
              <div class='list-item-title'>
                <template v-if='item.type'>
                  {{ toastListData[item.model] ? transformationDate(toastListData[item.model]) : '无' }}
                </template>
                <template v-else>
                  {{ toastListData[item.model]}}
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class='main-toast-from' v-loading='uploadState'>
          <div class='toast-from-header'>
            <div class='from-header-icon'><img src='@/assets/logo/icon_2@2x.png' alt=""></div>
            报案信息
          </div>
          <div class='toast-from-list' v-if='pageType === "employer"'>
            <div class='from-list-item' v-for='(item, index) in meansListData' :key='index'>
              <dataCollection :boxSata='item.choose' v-if='item.status === "ADD"'>
              <template slot='collectionTitle'>
                <div class='page-collapse-title'>
                  <div class='collapse-title-left' @click='openCollapse(index)'>
                    <div class='title-left-icon' :class='{"title-left-icon_a": item.choose}'></div>
                    {{item.labelName}}
                  </div>
                </div>
              </template>
              <template slot='collectionCentent'>
                <div class='header-from-item'>
                  <div class='header-from-tag' v-for='(Titem, Tindex) in item.items' :key='Tindex'>
                    <template v-if='Titem.status === "ADD"'>
                      <div class='from-tag-header'>
                        <div class='tag-header-left'>
                          {{ Titem.attName }}
                          <span v-if='Titem.required'>*</span>
                          <el-tooltip effect="dark" :content='Titem.attRemark' placement="top-start">
                            <i v-if='Titem.attRemark' class='el-icon-question'></i>
                          </el-tooltip>
                        </div>
                        <div class='tag-header-upload'>
                          <div class='header-upload-tab'>
                            <i class='el-icon-upload2'></i>
                            <input type="file" accept='image/*' @change='uploadFile($event, Tindex)'>
                          </div>
                        </div>
                      </div>
                      <div class='from-tag-base'>
                        <div class='tag-base-list' v-for='(Sitem, Sindex) in Titem.atts' :key='Sindex'>
                          <div class='base-list-item' v-if='Sitem.attPath && Sitem.status === "ADD"'>
                            <i class='el-icon-paperclip'></i>
                            <div class='list-item-name'>
                              <a :href='Sitem.attPath' :download='`我的附件_${Sindex + 1}`'>
                                {{`我的附件_${Sindex + 1}`}}
                              </a>
                            </div>
                            <i class='el-icon-close' @click='deleteUploadFile(Tindex, Sitem.attPath)'></i>
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
          <div class='toast-from-list' v-if='pageType === "carInsurance"'>
            <div class='from-list-item' v-for='(item, index) in meansListData' :key='index'>
              <dataCollection :boxSata='item.choose' v-if='item.status === "ADD"'>
                <template slot='collectionTitle'>
                  <div class='page-collapse-title'>
                    <div class='collapse-title-left' @click='openCollapse(index)'>
                      <div class='title-left-icon' :class='{"title-left-icon_a": item.choose}'></div>
                      {{item.materialType === 'Subject' ? '标的' : '三者'}}
                    </div>
                  </div>
                </template>
                <template slot='collectionCentent'>
                  <div class='header-from-item' v-for='(Titem, Tindex) in item.types' :key='Tindex'>
                    <dataCollection :boxSata='Titem.choose' v-if='Titem.items.length > 0'>
                      <template slot='collectionTitle'>
                        <div class='page-collapse-title'>
                          <div class='collapse-title-left' @click='twoStageState(Tindex)'>
                            <div class='title-left-icon' :class='{"title-left-icon_a": Titem.choose}'></div>
                            {{Titem.labelName}}
                          </div>
                        </div>
                      </template>
                      <template slot='collectionCentent'>
                        <div class='header-from-item' v-for='(Sitem, Sindex) in Titem.items' :key='Sindex'>
                          <dataCollection :boxSata='Sitem.choose' v-if='Titem.labelName ===  "车损资料" || Titem.labelName ===  "物损资料" || Titem.labelName ===  "人伤资料"'>
                            <template slot='collectionTitle'>
                                <div class='page-collapse-title'>
                                  <div class='collapse-title-left' @click='threeLevelState(Sindex)'>
                                    <div class='title-left-icon' :class='{"title-left-icon_a": Sitem.choose}'></div>
                                    {{Sitem.numberPlate || Sitem.thingName || Sitem.personName}}
                                  </div>
                                </div>
                              </template>
                              <template slot='collectionCentent'>
                                <div class='header-from-item'>
                                  <div class='header-from-tag' v-for='(Citem, Cindex) in Sitem.remarks' :key='Cindex'>
                                    <template v-if='Citem.status === "ADD"'>
                                      <div class='from-tag-header'>
                                        <div class='tag-header-left'>
                                          {{ Citem.attName }}
                                          <span v-if='Citem.required'>*</span>
                                          <el-tooltip effect="dark" :content='Citem.attRemark' placement="top-start">
                                            <i v-if='Citem.attRemark' class='el-icon-question'></i>
                                          </el-tooltip>
                                        </div>
                                        <div class='tag-header-upload'>
                                          <div class='header-upload-tab'>
                                            <i class='el-icon-upload2'></i>
                                            <input type="file" accept='image/*' @change='uploadFile($event, Cindex, "carInsurance")'>
                                          </div>
                                        </div>
                                      </div>
                                      <div class='from-tag-base'>
                                        <div class='tag-base-list' v-for='(Sitem, Sindex) in Citem.atts' :key='Sindex'>
                                          <div class='base-list-item' v-if='Sitem.attPath && Sitem.status === "ADD"'>
                                            <i class='el-icon-paperclip'></i>
                                            <div class='list-item-name'>
                                              <a :href='Sitem.attPath' :download='`我的附件_${Sindex + 1}`'>
                                                {{`我的附件_${Sindex + 1}`}}
                                              </a>
                                            </div>
                                            <i class='el-icon-close' @click='deleteUploadFile(Cindex, Sitem.attPath, "carInsurance")'></i>
                                          </div>
                                        </div>
                                    </div>
                                    </template>
                                  </div>
                                </div>
                              </template>
                          </dataCollection>
                          <template v-else>
                            <div class='header-from-item'>
                              <div class='header-from-tag' v-for='(Citem, Cindex) in Titem.items[0].remarks' :key='Cindex'>
                                <template v-if='Citem.status === "ADD"'>
                                  <div class='from-tag-header'>
                                    <div class='tag-header-left'>
                                      {{ Citem.attName }}
                                      <span v-if='Citem.required'>*</span>
                                      <el-tooltip effect="dark" :content='Citem.attRemark' placement="top-start">
                                        <i v-if='Citem.attRemark' class='el-icon-question'></i>
                                      </el-tooltip>
                                    </div>
                                    <div class='tag-header-upload'>
                                      <div class='header-upload-tab'>
                                        <i class='el-icon-upload2'></i>
                                        <input type="file" accept='image/*' @change='uploadFileDouble($event, Cindex)'>
                                      </div>
                                    </div>
                                  </div>
                                  <div class='from-tag-base'>
                                    <div class='tag-base-list' v-for='(Sitem, Sindex) in Citem.atts' :key='Sindex'>
                                      <div class='base-list-item' v-if='Sitem.attPath && Sitem.status === "ADD"'>
                                        <i class='el-icon-paperclip'></i>
                                        <div class='list-item-name'>
                                          <a :href='Sitem.attPath' :download='`我的附件_${Sindex + 1}`'>
                                            {{`我的附件_${Sindex + 1}`}}
                                          </a>
                                        </div>
                                        <i class='el-icon-close' @click='delectFileDouble(Cindex, Sitem.attPath, Sindex)'></i>
                                      </div>
                                    </div>
                                </div>
                                </template>
                              </div>
                            </div>
                          </template>
                        </div>
                      </template>
                    </dataCollection>
                  </div>
                </template>
              </dataCollection>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='uploadFile-footer'>
      <div class='uploadFile-footer-item'>
        <el-button type="primary" @click='submitMeans'>提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dataCollection from './components/dataCollection.vue'
import * as axios from '@/api/compensate/index'
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  data () {
    return {
      toastList: {
        carInsurance: [
          { name: '保单号', model: 'policyNo'},
          { name: '报案号', model: 'registNo'},
          { name: '车牌号', model: 'licenseNo'},
          { name: '报案日期', model: 'reportDate', type: 'date'},
          { name: '报案人姓名', model: 'reportorName'},
          { name: '报案人手机号码', model: 'reportorMobile'},
          { name: '出险日期', model: 'damageStartDate', type: 'date'},
          { name: '出险地点', model: 'damageAddress'},
          { name: '出险原因', model: 'damagereasonDesc'}
        ],
        employer: [
          { name: '保单号', model: 'policyNo'},
          { name: '报案号', model: 'registNo'},
          { name: '报案日期', model: 'reportDate', type: 'date'},
          { name: '报案人姓名', model: 'reportorName'},
          { name: '报案人手机号码', model: 'reportorPhoneNumber'},
          { name: '出险日期', model: 'damageStartDates', type: 'date'},
          { name: '出险地点', model: 'damageAddress'},
          { name: '出险原因', model: 'damagereasonDesc'} 
        ]
      },
      loadingState: false,
      uploadState: false,
      toastListData: {},
      meansListData: [],
      modeId: '',
      showType: '',
      pageType: '',
      registNo: '',
      accidentNo: '',
      statrY: '',
      endY: ''
    }
  },
  components: {
    dataCollection
  },
  created () {
    const query = this.$route.query
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key]
        this[key] = element
      }
    }
    if (this.pageType === 'employer') { // 非车险
      this.loadEmplouerData()
    } else { // 车险
      this.loadCarInsuranceData()
    }
  },
  methods: {
    transformationDate (item) {
      return publicPageTool.transformationDate(item)
    },
    setTouchstart (item) {
      this.statrY = item.targetTouches[0].pageY
    },
    setTouchmove (item) {
      this.endY = item.targetTouches[0].pageY
      if (this.endY > this.statrY) {
        document.getElementById('uploadFile').scrollTop = this.endY - this.statrY
      } else {
        document.getElementById('uploadFile').scrollTop = this.statrY - this.endY
      }
    },
    setTouchend (item) {
    },
    /**
     * @name 一级面板控制
     */
    openCollapse (index) {
      this.meansListData = this.meansListData.map((el, item) => {
        if (index === item) {
          el.choose = !el.choose
        } else {
          el.choose = false
        }
        return el
      })
    },
    /**
     * @name 二级面板控制
     */
    twoStageState (index) {
      this.meansListData = this.meansListData.map(el => {
        if (el.choose) {
          el.types = el.types.map((val, key) => {
            if (index === key) {
              val.choose = !val.choose
            } else {
              val.choose = false
            }
            return val
          })
        }
        return el
      })
    },

    /**
     * @nmae 控制三级面板状态
     */
    threeLevelState (index) {
      this.meansListData = this.meansListData.map(el => {
        if (el.choose) {
          el.types = el.types.map(val => {
            if (val.choose) {
              val.items = val.items.map((ev, key) => {
                if (index === key) {
                  ev.choose = !ev.choose
                } else {
                  ev.choose = false
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
     * @name 加载非车险配置信息
     */
    loadEmplouerData () {
      /**
       * @nmae 加载资料信息
       */
      this.loadingState = true
      axios.getOdsMaterialDetail(this.registNo).then(res => {
        this.loadingState = false
        this.meansListData = res.data.map((el, index) => {
          el.items.map((val, index2) => { return { ...val, choose: index2 === 0 }})
          return { ...el, choose: index === 0}
        })
      }).catch(() => {
        this.loadingState = false
      })
      axios.getNonCarClaimsdetail(this.registNo).then(res => {
        this.loadingState = false
        this.toastListData = res.data.nonCarLregistDTO
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 获取车险配置
     */
    loadCarInsuranceData () {
      this.loadingState = true
      axios.getMaterialDetail(this.accidentNo, this.modeId).then(res => {
        this.loadingState = false
        this.meansListData = res.data.map((el, index) => {
          el.types = el.types.map((val, index2) => {
            val.items = val.items.map((en, index3) => {
              return { ...en, choose: index3 === 0 }
            })
            return { ...val, choose: index2 === 0 }
          })
          return { ...el, choose: index === 0 }
        })
      }).catch(() => {
        this.loadingState = false
      })
      axios.getCarClaimsDetail(this.registNo).then(res => {
        this.loadingState = false
        this.toastListData = res.data.carLregistDTO
        console.log(this.toastListData.reportorMobile)
      }).catch(() => {
        this.loadingState = false
      })
    },

    /**
     * @name 双层结构上传文件
     */
    uploadFileDouble (file, index) {
      const fileInfo = file.target.files
      if (fileInfo.length > 1) {
        this.$message.error('单次只能上传单张图片')
        return
      }
      const form = new FormData()
      form.append("file", fileInfo[0])
      this.loadingState = true
      axios.setFileUpload(form).then(res => {
        this.loadingState = false
        this.meansListData = this.meansListData.map(el => {
          if (el.choose) {
            el.types = el.types.map(val => {
              if (val.choose) {
                val.items[0].remarks = val.items[0].remarks.map((ev, key) => {
                  if (key === index) {
                    ev.atts.push({
                      attPath: res.data,
                      id: '',
                      status: 'ADD'
                    })
                  }
                  return ev
                })
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
     * @name 双层结构删除
     */
    delectFileDouble (index, path, Sindex) {
      this.meansListData = this.meansListData.map(el => {
        if (el.choose) {
          el.types = el.types.map(val => {
            if (val.choose) {
              val.items[0].remarks = val.items[0].remarks.map((ev, key) => {
                if (key === index) {
                  ev.atts = ev.atts.map((et, state) => {
                    if (et.attPath === path && state === Sindex) {
                      et.status = 'DELETE'
                    }
                    return et
                  })
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
     * @name 上传附件
     */
    uploadFile (file, index, state) {
      if (this.uploadState) {
        this.$message.error('文件上传中,请稍等...')
        return
      }
      const fileInfo = file.target.files
      if (fileInfo.length > 1) {
        this.$message.error('单次只能上传单张图片')
        return
      }
      const form = new FormData()
      form.append("file", fileInfo[0])
      this.loadingState = true
      this.uploadState = true
      axios.setFileUpload(form).then(res => {
        this.loadingState = false
        this.uploadState = false
        if (state === 'carInsurance') { // 车险
          this.meansListData = this.meansListData.map(el => {
            if (el.choose) {
              el.types = el.types.map(val => {
                if (val.choose) {
                  val.items = val.items.map(ev => {
                    if (ev.choose) {
                      ev.remarks = ev.remarks.map((et, key) => {
                        if (key === index) {
                          et.atts.push({
                            attPath: res.data,
                            id: '',
                            status: 'ADD'
                          })
                        }
                        return et
                      })
                    }
                    return ev
                  })
                }
                return val
              })
            }
            return el
          })
        } else { // 非车险
          this.meansListData = this.meansListData.map(el => {
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
        }
      }).catch(() => {
        this.loadingState = false
        this.uploadState = false
      })
    },
    /**
     * @name 删除附件
     */
    deleteUploadFile (index, path, state) {
      this.meansListData = this.meansListData.map(el => {
        if (el.choose) {
          if (state === 'carInsurance') {
            this.meansListData = this.meansListData.map(el => {
              if (el.choose) {
                el.types = el.types.map(val => {
                  if (val.choose) {
                    val.items = val.items.map(ev => {
                      if (ev.choose) {
                        ev.remarks = ev.remarks.map((et, key) => {
                          if (key === index) {
                            et.atts = et.atts.map(em => {
                              if (em.attPath === path) {
                                em.status = 'DELETE'
                              }
                              return em
                            })
                          }
                          return et
                        })
                      }
                      return ev
                    })
                  }
                  return val
                })
              }
              return el
            })
          } else {
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
        }
        return el
      })
    },
    /**
     * @name 提交资料
     */
    submitMeans () {
      if (this.pageType === 'employer') {
        this.loadingState = true
        axios.setOdsMaterialSave(this.meansListData).then(res => {
          this.loadingState = false
          if(res.msg === 'Success') {
            this.$message.success('保存成功')
          }
        }).catch(() => {
          this.loadingState = false
        })
      } else if (this.pageType === 'carInsurance') {
        this.loadingState = true
        axios.setMaterialSave(this.meansListData).then(res => {
          this.loadingState = false
          if(res.msg === 'Success') {
            this.$message.success('保存成功')
          }
        }).catch(() => {
          this.loadingState = false
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/style/uploadFile.scss';
</style>