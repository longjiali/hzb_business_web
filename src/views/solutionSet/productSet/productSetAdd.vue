<template>
  <el-card v-loading="loading">
    <!-- 产品基本信息 -->
    <div class="page">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>产品基本信息</span></div>
        <div class="divider"/>
      </div>
      <FormList :formList="formList" ref="productForm" :baseForm="product" />
    </div>
    <div class="page" v-for="( item, index ) in tableList" :key="index">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>{{item.title}}</span></div>
        <div class="divider"/>
        <div class="title-right">
          <i class="el-icon-edit-outline"/>
          <el-button type="text" @click="showAddTableData(item)">
            新增
          </el-button>
        </div>
      </div>
      <el-table :data="item.tableData" border>
        <el-table-column v-for="column in item.tableColumn" :key="column.value" :prop="column.value" :label="column.label" :width="column.value === 'sort' ? '50px' : 'auto'" align="center" />
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="{ row }">
            <el-button type="text" @click="deleteTabelData(index,row.sort)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>自费药</span></div>
        <div class="divider"/>
      </div>
      <FormList :formList="zfyFormList" ref="drugForm" :baseForm="drug" />
    </div>
    <div class="button">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="save()">提交</el-button>
    </div>
    <el-dialog
      :title="tempTableAdd.title"
      :visible.sync="tempTableAdd.show"
      width="30%">
      <FormList :ref="`formList_tableOpt`" :formList="tempTableAdd.formList" :baseForm="tempTableAdd.form" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="tempTableAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="addTableData()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { sexOptions } from './options';
import FormList from '../components/formList.vue';
import { saveProduct, productDet, editProduct } from '@/api/solutionSet';
import { listData } from '@/api/system/dict/data';
export default {
  components:{ FormList },
  data(){
    const formList=[
      {value:'productCode', label:'产品编号', span:7},
      {value:'productName', label:'产品销售名称', span:7, offset:1},
      {value:'insuranceCompany', label:'保险公司', span:7, offset:1},
      {value:'productDesc', label:'产品介绍',type:'textarea', span:24},
      {value:'productTypeId', label:'产品分类', type:'select' , span:7, options:[] , optionSet:{label:'dictLabel', value:'id'}},
      {value:'enabled', label:'是否上架', type:'radio', default:'y', span:7, offset:1, options: sexOptions},
      {value:'feeRatio', label:'经纪费比例', type:'number', span:7, offset:1 },
      {value:'productImgPath', label:'产品图片', type:'upload',default:'', span:24},
    ]
    const product = {}
    formList.map(i=>{
      product[i.value] = i.default || ''
    })
    const tableList = [
      { title:'赔偿项目类别', tableColumn: [
          {value:'sort', label:'序号', hidden: false, required: false},
          {value:'indemnityCode', label:'类别编号', required: false},
          {value:'indemnityName', label:'类别名称'},
        ],
        key:'indemnity',
        tableData: []
      },
      { title:'职业类别', tableColumn: [
          {value:'sort', label:'序号', hidden: false, required: false},
          {value:'occupationCode', label:'类别编号', required: false},
          {value:'occupationName', label:'类别名称'},
        ],
        key:'occupation',
        tableData: []
      },
      { title:'附加条款', tableColumn: [
          {value:'sort', label:'序号', hidden: false, required: false},
          {value:'clauseContent', label:'条款内容'},
        ],
        clauseClass:24,
        key:'additionalTerms',
        tableData: []
      },
      { title:'免赔额', tableColumn: [
          {value:'sort', label:'序号', hidden: false, required: false},
          {value:'clauseContent', label:'条款内容'},
        ],
        clauseClass:25,
        key:'deductible',
        tableData: []
      },
      { title:'特别约定', tableColumn: [
          {value:'sort', label:'序号', hidden: false, required: false},
          {value:'clauseContent', label:'条款内容'},
        ],
        clauseClass:26,
        key:'specialAppointment',
        tableData: []
      },
      { title:'人员系数', tableColumn: [
          {value:'minimumNum', label:'最低人数'},
          {value:'highestNum', label:'最高人数'},
          {value:'factor', label:'系数'},
        ],
        key:'personnelFactor',
        tableData: []
      }
    ]
    const productId= this.$route.query.productId
    return{
      productId,
      formList,
      product:Object.assign({},product,{productId}),
      tableList,
      tempTableAdd:{
        title:'',
        show:false,
        formList:[],
        form:{},
        ref:''
      },
      zfyFormList:[
        {value:'drugCode', label:'编号', span:7},
        {value:'drugName', label:'名称', span:7},
        {value:'factor', label:'调整系数', type:'number',  span:7, offset:1},
        {value:'drugContent', label:'内容',type:'textarea', span:24},
      ],
      drug:{
        drugName:'',
        factor:'',
        drugContent:''
      },
      loading: false
    }
  },
  created(){
    this.loading = true
    listData({pageNum:1,pageSize:9999,enName:"product_type"}).then(({data})=>{
      this.formList.map(i=>{
        if (i.value === 'productTypeId') {
          i.options= data.list
        }
      })
      if (this.productId) {
        productDet(this.productId).then(({data}) =>{
          const {product, drug} = data
          this.product = product
          this.drug = drug
          this.tableList.map(i=>{
            i.tableData =data[i.key]
          })
          this.loading = false
        })
      }else{
        this.loading = false
      }
    })
  },
  methods:{
    showAddTableData(item){
      const tempList = {}
      item.tableColumn.map(i=>{
        tempList[i.value] = ""
      })
      if (item.clauseClass) {
        tempList.clauseClass = item.clauseClass
      }
      this.tempTableAdd = {
        title:`新增${item.title}`,
        show: true,
        formList: item.tableColumn,
        form: tempList,
      }
    },
    addTableData(){
      this.$refs.formList_tableOpt.validate().then(()=>{
        const shallowCopy =this.tableList.find(i=> i.tableColumn === this.tempTableAdd.formList)
        shallowCopy.tableData.push({...this.tempTableAdd.form , sort: shallowCopy.tableData.length+1 })
        this.tempTableAdd={
          title:'',
          show:false,
          formList:[],
          form:{},
        }
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      })
    },
    deleteTabelData(index, tabIndex){
      this.tableList[index].tableData.splice(this.tableList[index].tableData.findIndex(i=>i.index === tabIndex) , 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    save(){
      const {drugForm, productForm} = this.$refs
      Promise.all([drugForm.validate(), productForm.validate()]).then(()=>{
        const data = Object.assign({},{product: this.product},{drug: this.drug})
        this.tableList.map(i=>{
          data[i.key] = i.tableData
        })
        saveProduct({...data, operating : this.productId ? 'UPDATE' : 'NEW'}).then(res=>{
          this.$message({
            message: `${this.productId ? '编辑' : '新增'}成功`,
            type: 'success'
          })
          this.$router.go(-1)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card{
  margin: 20px;
}
.page{
  margin: 20px 0;
  .title-right{
    color: #409EFF;
    ::v-deep span{
      color: #409EFF;
    }
  }
}
.button{
  text-align: center;
}
</style>