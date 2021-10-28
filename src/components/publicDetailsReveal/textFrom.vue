<template>
  <div class="text-from">
    <template v-if='item.type === "date" || item.type === "time"'>
      {{dateEnCode(params[item.model], item.type, item.enCode)}}
    </template>
    <template v-else-if='
      item.type === "isvideosurveyFlag" || item.type === "bigcaseFlag" ||
      item.type === "firstSiteFlag" || item.type === "claimType" ||
      item.type === "insuredCarFlag" || item.type === "sex"
    '>
      {{publicEnCode(params[item.model], item.type)}}
    </template>
    <template v-else>
      <template v-if='params[item.model] === 0'>
        {{params[item.model]}}
      </template>
      <template v-else>
        {{params[item.model] || '无'}}
      </template>
    </template>
  </div>
</template>

<script>
import * as publicPageTool from '@/utils/publicPageTool'
export default {
  props: {
    params: {
      type: Object,
      default: () => { return {} }
    },
    item: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    /**
     * @name 时间转换
     */
    dateEnCode (item, type, enCode) {
      if (enCode === 'date') {
        return publicPageTool.dateEncode(item, type)
      } else {
        return publicPageTool.timeEncode(item, type)
      }
    },

    /**
     * @name 公共转编码
     */
    publicEnCode (item, type) {
      return publicPageTool.publicEnCode(item, type)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>