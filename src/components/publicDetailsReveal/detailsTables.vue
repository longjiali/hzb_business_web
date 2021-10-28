<template>
  <div class="details-table">
    <div class="details-table-item" v-for='(item, index) in modelListData[listData.model]' :key='index'>
      <el-descriptions :column="Titem.column" :size="'medium'" border v-for="(Titem, Tindex) in listData.children" :key="Tindex">
        <template v-if='Titem.type === "Single"'>
          <el-descriptions-item v-for='(Sitem, Sindex) in Titem.children' :key="Sindex">
            <template slot="label">{{ Sitem.name }}</template>
            <template>
              <div :class="['details-from-text', `details-from-text_${Sitem.textAlign}`]">
                <text-lable :params="item" :item="Sitem"></text-lable>
              </div>
            </template>
          </el-descriptions-item>
        </template>
        <template v-if="Titem.type === 'multiline'">
          <el-descriptions-item>
            <template slot="label">{{ Titem.name }}</template>
            <template>
              <el-descriptions :size="'medium'" :column="Titem.column2" border>
                  <el-descriptions-item v-for="(Sitem, Sindex) in Titem.children" :key="Sindex">
                    <template slot="label">{{ Sitem.name }}</template>
                    <template>
                      <div :class="['details-from-text', `details-from-text_${Sitem.textAlign}`,]">
                        <text-lable :params="item" :item="Sitem"></text-lable>
                      </div>
                    </template>
                  </el-descriptions-item>
                </el-descriptions>   
            </template>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import textLable from '@/components/publicDetailsTable/text'
export default {
  props: {
    listData: {
      type: Object,
      default: () => {
        return {}
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
  }
}
</script>

<style lang='scss' scoped>
.details-table {
  .details-table-item {
    margin-top: 15px;
  }
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