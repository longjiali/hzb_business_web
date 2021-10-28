<template>
  <div>
    <template v-if='item.type === "date" || item.type === "time"'>
      {{dateEnCode(params[item.model], item.type, item.enCode)}}
    </template>
    <template v-else-if="item.type === 'money'">
      {{moneyEncode(params[item.model])}}
    </template>
    <template v-else-if='item.type === "address"'>
      {{addressEnCode(params, item)}}
    </template>
    <template v-else-if="item.type === 'certificates'">
      {{ publicEnCode(params[item.model], 'certificates')}}
    </template>
    <template v-else-if="item.type === 'term'">
      {{ termEnCode(params, item)}}
    </template>
    <template v-else>
      <template v-if='params[item.model] === 0'>
        {{ params[item.model] }}{{item.unit}}
      </template>
      <template v-else>
        {{ params[item.model] || '无'}}{{item.unit}}
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
     * @name 金额转换
     */
    moneyEncode (item) {
      return `${publicPageTool.moneyEncode(item)}`
    },
    /**
     * @name 地址转换
     */
    addressEnCode (item, Titem) {
      return publicPageTool.addressEnCode(item, Titem)
    },

    /**
     * @name 数字转编码
     */
    publicEnCode(item, type) {
      return publicPageTool.publicEnCode(item, type)
    },

    /**
     * @name 期限计算
     */
    termEnCode (params, item) {
      const statrDate = publicPageTool.dateEncode(params[item.startTiem], 'date')
      const endDate = publicPageTool.dateEncode(params[item.endTime], 'date')
      return `自 ${statrDate} 00时00分起至${endDate} 24时00分止`
      // return publicPageTool.termEnCode(params, item)
    }
  },
}
</script>
