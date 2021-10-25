<template>
  <div class="collapse-reveal">
    <div class="collapse-reveal-item">
      <el-collapse v-if='modelDataList[listData.model] && listData.model.length'>
        <el-collapse-item :title="getCollapseTitle(item, listData.class)" :name='index' v-for="(item, index) in modelDataList[listData.model]" :key='index'>
          <browseReveal :listData='listData' :modelDataList='item' :column='listData.column || 3'></browseReveal>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import browseReveal from './browseReveal'

export default {
  props: {
    listData: {
      type: Object,
      default: () => { return {} }
    },
    modelDataList: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {
    browseReveal
  },
  methods: {
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
  }
}
</script>

<style lang='scss' scoped>

</style>