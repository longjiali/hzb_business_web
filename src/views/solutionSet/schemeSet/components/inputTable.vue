<template>
  <el-table :data="tableData">
    <el-table-column v-for="(item,index) in tableOpt" :key="index" :label="item.label">
      <template slot-scope="{ row }">
        <template v-if="!item.input">
          <span>{{row[item.value]}}</span>
        </template>
        <template v-else>
          <el-input-number v-model="row[item.value]" :placeholder="`请输入${item.label}`" :min="0.01" :step="0.01" controls-position="right" v-if="item.number"></el-input-number>
          <el-input v-model="row[item.value]" v-else></el-input>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  model: {
    prop: 'tableData',
    // 随便命名事件，对应下面$emit即可
    event: 'tableDataUpdata'
  },
  props:{
    tableData:{
      type: Array,
      required: true
    },
    tableOpt:{
      type: Array,
      required: true
    }
  },
  watch:{
    tableData:{
      handler(val){
        this.$emit('tableDataUpdata',val)
      },
      deep:true
    }
  }
}
</script>