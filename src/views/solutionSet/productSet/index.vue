<template>
  <div class='employer'>
    <ELTable :column="publicTableList" @getTableData="getTableData">
      <template #table_button>
        <el-button type="primary" @click="add()">新增</el-button>
      </template>
      <template #table_productImgPath="{row}">
        <el-image :src="row.productImgPath" style="width:50px;height:50px"></el-image>
      </template>
      <template #table_opt="{row}">
        <el-button type="text" @click="$router.push({name:'productSetAdd', query:{ productId:row.productId }})">编辑</el-button>
      </template>
    </ELTable>
  </div>
</template>

<script>
import ELTable from '@/components/ELTable/index.vue'
import { queryProduct } from '@/api/solutionSet.js';
export default {
  components:{ELTable},
  data () {
    return {
      publicTableList: [
         {name: "序号", type: 'index', model:'index'},
         {name: "产品销售名称",search:true,  model: "productName"},
         {name: "保险公司",search:true, model: "insuranceCompany"},
         {name: "产品介绍",  model: "productDesc"},
         {name: "产品图片",  model: "productImgPath"},
        { name: "操作",  width: "120px",  fixed: 'right', model: "opt"}
      ],
    }
  },
  methods:{
    getTableData(parame,callback){
      callback(queryProduct(parame))
    },
    add(){
      this.$router.push({name:'productSetAdd'})
    }
  }
}
</script>