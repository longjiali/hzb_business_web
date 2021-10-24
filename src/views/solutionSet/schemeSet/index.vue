<template>
  <div class='employer'>
    <ELTable :column="publicTableList" @getTableData="getTableData">
      <template #table_button>
        <el-button type="primary" @click="add()">新增</el-button>
      </template>
      <template #table_opt="{row}">
        <el-button type="text" @click="$router.push({name:'schemeSetAdd', query:{ programmeId:row.productProgrammeId }})">编辑</el-button>
      </template>
    </ELTable>
  </div>
</template>

<script>
import ELTable from '@/components/ELTable/index.vue'
import { queryScheme } from '@/api/solutionSet.js';
export default {
  components:{ELTable},
  data () {
    return {
      publicTableList: [
         {name: "序号", type: 'index', model:'index'},
         {name: "产品名称",  model: "productName"},
         {name: "方案名称", model: "programmeName"},
        { name: "操作",  width: "120px",  fixed: 'right', model: "opt"}
      ],
    }
  },
  methods:{
    getTableData(parame,callback){
      callback(queryScheme(parame))
    },
    add(){
      this.$router.push({name:'schemeSetAdd'})
    }
  }
}
</script>