<template>
  <div class='page-reveal'>
    <div class='details-content-item' v-for='(item, index) in listData.children' :key='index'>
        <div class='content-item-header' v-if='item.name'>
          <div class='item-header-icon'></div>
          {{ item.name }}
        </div>
        <div class='content-item-bar'>
          <template v-if='item.type === "browse" '>
            <el-descriptions class="margin-top" :column=" item.column || 3" size="small" border>
              <el-descriptions-item v-for='(Sitem, Sindex) in item.children' :key='Sindex' content-class-name="my-content">
                <template slot="label">
                  {{Sitem.name}}
                </template>
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
                <template v-else-if='Sitem.type === "date"'>
                  {{listDetailsData[item.model] ? transformationDate(listDetailsData[item.model][Sitem.model]) : ''}}
                </template>
                <template v-else-if="Sitem.type === 'address'">
                  {{ getAddressName(listDetailsData[item.model], Sitem)}}
                </template>
                <template v-else-if='Sitem.type === "code"'>
                  {{ listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] ||  0 >= listDetailsData[item.model][Sitem.model] ? getCodeName(listDetailsData[item.model][Sitem.model], Sitem.model) : '无'  : '无'}}
                </template>
                <template v-else>
                  <span>
                    {{listDetailsData[item.model] ? listDetailsData[item.model][Sitem.model] ||  0 >= listDetailsData[item.model][Sitem.model] ? listDetailsData[item.model][Sitem.model] : '无'  : '无'}}
                  </span>
                </template>
              </el-descriptions-item>
            </el-descriptions>
          </template>
          <template v-if='item.type === "Array"'>
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
            <el-table :data='listDetailsData[item.model]' border style="width: 100%;" :header-cell-style="pageTableHead">
              <el-table-column :prop="item.model" :fixed='item.fixed' :label="item.name" v-for='(item, index) in item.children' :key='index'>
                <template slot-scope="scope">
                  <template v-if='item.tips'>
                    <el-tooltip effect="dark" :content="item.type === 'address' ? `${scope.row[item.model1]}${scope.row[item.model2]}${scope.row[item.model3]}${scope.row[item.model]}` :scope.row[item.model]" placement="top-start">
                      <span v-if='item.type === "code"'>
                        {{ getCodeName(scope.row[item.model], 'insuredPersonCardTypeId') }}
                      </span>
                      <span v-else-if='item.type === "address"'>
                        {{ getAddressName(scope.row, item) }}
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
                        {{ getAddressName(scope.row, item) }}
                      </span>
                      <span v-else>
                        {{scope.row[item.model]}}
                      </span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template v-if='item.type === "text"'>
            <el-row>
              <el-col :span='24' v-for='(Titem, Tindex) in listDetailsData[item.model]' :key="Tindex">
                <div class='item-bar-text'>{{ Titem[item.val] }}</div>
              </el-col>
            </el-row>
          </template>
          <template v-if='item.type === "collapse"'>
            <div class='page-collapse-item'>
              <el-collapse v-if='listDetailsData[item.model] && listDetailsData[item.model].length'>
                <el-collapse-item :title="getCollapseTitle(Titem, item.class)" :name="Tindex" v-for='(Titem, Tindex) in listDetailsData[item.model]' :key='Tindex'>
                  <el-descriptions :column=" item.column || 3" size="small" border>
                    <el-descriptions-item v-for='(Sitem, Sindex) in item.children' :key='Sindex'>
                      <template slot="label">
                        {{Sitem.name}}
                      </template>
                      <template v-if='Sitem.type === "images"'>
                        <div class='item-bar-images'>
                            <el-image ref='elImages' style="width: 100%; height: 100%" :src="Titem[Sitem.model] ? Titem[Sitem.model] : ''" 
                              :preview-src-list="[Titem[Sitem.model] ? Titem[Sitem.model] : '']">
                            </el-image>
                            <div class='bar-images-layer' v-if='Titem[Sitem.model] && Titem[Sitem.model]'>
                              <i @click="lookImages" class="el-icon-circle-plus-outline"></i>
                              <a :href="Titem[Sitem.model] ? Titem[Sitem.model] : ''">
                                <i class="el-icon-download"></i>
                              </a>
                            </div>
                          </div>
                      </template>
                      <template v-else-if='Sitem.type === "date"'>
                        {{transformationDate(Titem[Sitem.model])}}
                      </template>
                      <template v-else-if="Sitem.type === 'address'">
                        {{ Titem[Sitem.model] }}
                      </template>
                      <template v-else-if='Sitem.type === "code"'>
                        {{ getCodeName(Titem[Sitem.model], Sitem.model)}}
                      </template>
                      <template v-else>
                        <span>
                          {{Titem[Sitem.model]}}
                        </span>
                      </template>
                    </el-descriptions-item>
                  </el-descriptions>
                </el-collapse-item>
              </el-collapse>
            </div>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  props: {
    listData: {
      type: Object,
      default: () => { return {} }
    },
    listDetailsData: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    /**
     * @name 时间转换
     */
    transformationDate (item) {
      return publicPageTool.transformationDate(item)
    },
    
    /**
     * @name 转编码
     */
    getCodeName (item, type) {
      if (type === 'insuredCarFlag') {
        return item * 1 === 0 ? '三者' : '标的'
      } else if (type === 'sex') {
        return item * 1 === 1 ? '男' : '女'
      } else if (type === 'isvideosurveyFlag') {
        return item * 1 === 1 ? '视频' : '非视频'
      } else if ( type === 'bigcaseFlag') {
        return item * 1 === 1 ? '是' : '否'
      } else if ( type === 'firstSiteFlag') {
        return item * 1 === 1 ? '第一现场' : item * 1 === 2 ? '第二现场' : '第三现场'
      } else if ( type === 'claimType') {
        return item * 1 === 0 ? '有责涉及死亡的赔案' : item * 1 === 1 ? '有责不涉及死亡的赔案' : item * 1 === 2 ? '无责赔案' : item * 1 === 3 ? '垫付赔款' : item * 1 === 4 ? '垫付救助基金' : '其他'
      }
    },

    /**
     * @name 折叠面板标题
     */
    getCollapseTitle (item, type) {
      if (type === 'vehicle') {
        return `${this.getCodeName(item.insuredCarFlag, 'insuredCarFlag')} / ${item.licenseNo}`
      } else if (type === 'matter') {
        return `${item.propertylossName}`
      } else if (type === 'people') {
        return `${item.personName} / ${this.getCodeName(item.sex, 'sex')} / ${item.age}`
      } else if (type === 'adjustment') {
        return `编号:${item.ompenSateNo}`
      } else if (type === 'adjustment1') {
        return `编号:${item.claimNo}`
      } else if (type === 'adjustment2') {
        return `编号:${item.claimNo}`
      } else {
        return ``
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
      if (!item) {
        return
      }
      if (item[params.model] || item[params.model1] || item[params.model2] || item[params.model3])
      return `${item[params.model1] ? item[params.model1] : ''}${item[params.model2] ? item[params.model2] : ''}${item[params.model3] ? item[params.model3] : ''}${item[params.model] ? item[params.model] : ''}`
      else
      return '无'
    },
    pageTableHead () {
      return 'text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;'
    }
  }
}
</script>
<style>
.my-content {
  width: calc((100% -300px) / 5);
}
</style>

<style lang='scss' scoped>
.page-reveal {
  background: #fff;
  .details-content-item {
    margin-top: 20px;
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
    }
  }
}
.page-reveal /deep/ .el-descriptions-item__label {
  width: 100px;
  text-align: right;
  font-size: 13px;
  color: #333333;
}
.page-reveal /deep/ .el-table  {
  margin-bottom: 10px;
}
.page-reveal /deep/ .cell {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
.page-reveal /deep/ .el-col-12 {
  .el-descriptions-item__label {
    min-width: 240px !important;
    text-align: right;
  }
  .page-reveal /deep/ .el-icon-circle-plus-outline {
    color: #FFFFFF;
    font-size: 24px;
  }
  .page-reveal /deep/ .el-icon-download {
    color: #FFFFFF;
    font-size: 24px;
  }
}
</style>