<template>
  <div class="text-from">
    <template v-if='item.type === "date" || item.type === "time"'>
      {{dateEnCode(params[item.model], item.type, item.enCode)}}
    </template>
    <template v-else>
      {{params[item.model]}}
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
  }
}
</script>

<style lang='scss' scoped>

</style>