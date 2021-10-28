<template>
  <div class="page-details-from">
    <el-descriptions :column="item.column" :size="'medium'" border v-for="(item, index) in listData" :key="index">
      <template v-if='item.class === "insured" && modelListData[item.key]'>
        <el-descriptions-item v-for='(Sitem, Sindex) in modelListData[item.key]' :key="Sindex">
          <template slot="label">{{ `${item.name}${Sindex + 1}` }}</template>
          <template>
            <el-descriptions :size="'medium'" :column="item.column2" border>
              <el-descriptions-item v-for="(Titem, Tindex) in item.children" :key="Tindex">
                <template slot="label">{{ Titem.name }}</template>
                <template>
                  <div :class="['details-from-text', `details-from-text_${Titem.textAlign}`,]">
                    <text-lable :params="Sitem" :item="Titem"></text-lable>
                  </div>
                </template>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-descriptions-item>
      </template>
      <template v-else-if='item.class !== "insured"'>
        <template v-if="item.type === 'Single'">
          <el-descriptions-item v-for="(Titem, Tindex) in item.children" :key="Tindex">
            <template slot="label">{{ Titem.name }}</template>
            <template>
              <div :class="['details-from-text', `details-from-text_${Titem.textAlign}`,]">
                <template v-if='!modelListData[Titem.key]'>
                  无
                </template>
                <template v-else>
                  <text-lable :params="modelListData[Titem.key]" :item="Titem"></text-lable>
                </template>
              </div>
            </template>
          </el-descriptions-item>
        </template>
        <template v-if="item.type === 'multiline'">
          <el-descriptions-item>
            <template slot="label">{{ item.name }}</template>
            <template>
              <el-descriptions :size="'medium'" :column="item.column2" border>
                <el-descriptions-item v-for="(Titem, Tindex) in item.children" :key="Tindex">
                  <template slot="label">{{ Titem.name }}</template>
                  <template>
                    <div :class="['details-from-text', `details-from-text_${Titem.textAlign}`,]">
                      <template v-if='!modelListData[Titem.key]'>
                        无
                      </template>
                      <template v-else>
                        <text-lable :params="modelListData[Titem.key]" :item="Titem"></text-lable>
                      </template>
                    </div>
                  </template>
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-descriptions-item>
        </template>
      </template>
    </el-descriptions>
  </div>
</template>

<script>
import * as publicPageTool from '@/utils/publicPageTool'
import textLable from './text.vue'
export default {
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    modelListData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    textLable
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
    }
  },
};
</script>

<style lang='scss' scoped>
.page-details-from {
  .details-from-text {
    padding: 0 10px;
    text-align: left;
    &_centent {
      text-align: center;
    }
  }
  ::v-deep .el-descriptions-item__label {
    width: 100px !important;
    text-align: center !important;
  }
  ::v-deep .el-descriptions-item__content {
    padding: 0;
  }
  ::v-deep .is-bordered {
    table-layout: fixed !important;
  }
}
</style>