<template>
  <el-table :data="pageTableList" border style="width: 100%;" :header-cell-style="pageTableHead">
    <el-table-column
      :prop="item.model" :fixed='item.fixed' :label="item.name" :width="item.width" 
      v-for='(item, index) in publicTableInfo' :key='index'>
      <template v-if='item.solt'>
        <template slot-scope="scope">
          <slot :name="`table_${item.model}`" :data='{scope, item}'></slot>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    publicTableInfo: {
      type: Array,
      default: () => { return [] }
    },
    pageTableList: {
      type: Array,
      default: () => { return [1,2,3,4,5,6]}
    }
  },
  methods: {
    /**
     * @name 设置表格头部样式
     */
    pageTableHead () {
      return 'text-align: center; background: #F6F7F9; color: #222222; font-size: 13px; font-weight: bold; padding: 0;'
    }
  }
};
</script>