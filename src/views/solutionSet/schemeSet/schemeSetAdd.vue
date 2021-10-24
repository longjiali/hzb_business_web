<template>
<div>
  <el-card v-loading="pageLoading">
    <div class="page">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>产品基本信息</span></div>
        <div class="divider"/>
      </div>
      <FormList :formList="formList" ref="programme" :baseForm="programme" />
    </div>
    <div class="page" v-loading="itemLoading">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>赔偿项目</span></div>
        <div class="divider"/>
      </div>
      <InputTable :tableData="indemnityList" :tableOpt="indemnityOpt"/>
    </div>
    <div class="page" v-loading="itemLoading">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>职业</span></div>
        <div class="divider"/>
      </div>
      <InputTable :tableData="occupationList" :tableOpt="occupationOpt"/>
    </div>
    <div class="page" v-loading="itemLoading">
      <div class="baseTitle">
        <div class="baseTitle-left"><span>升级方案</span></div>
        <div class="divider"/>
        <div class="title-right">
          <i class="el-icon-edit-outline"/>
          <el-button type="text" @click="showAddTableData()" :disabled="temp_occupationList.length === 0">
            新增
          </el-button>
        </div>
      </div>
      <el-table :data="schemeTableData">
        <el-table-column type="expand">
            <template slot-scope="{ row }">
              <InputTable :tableData="row.items" :tableOpt="occupationOpt"/>
            </template>
        </el-table-column>
        <el-table-column prop="additionalCode" label="方案编号"></el-table-column>
        <el-table-column prop="additionalName" label="方案名称"></el-table-column>
      </el-table>
    </div>
    <div class="button">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="save()">提交</el-button>
    </div>
    <el-dialog
      title="新增方案"
      :visible.sync="dialog.show"
      width="30%">
      <FormList :ref="`formList_tableOpt`" :formList="dialog.formList" :baseForm="dialog.form" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="addTable()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</div>

</template>
<script>
import { queryProduct, productDet, saveScheme, programmeDet } from '@/api/solutionSet.js';
import FormList from '../components/formList.vue';
import InputTable from './components/inputTable.vue';
export default {
  components:{ FormList, InputTable },
  data(){
    return{
      formList:[
        {value:'programmeCode', label:'方案编号', span:7},
        {value:'programmeName', label:'方案名称', span:7, offset:1},
        {value:'productId', label:'关联产品', span:7, offset:1, type:'select', options:[], optionSet:{label:'productName', value:'productId'}},
        {value:'factor', label:'整单调整系数',type:'number', span:7},
        {value:'minFactor', label:'录单时最低调整系数',type:'number', span:7, offset:1},
        {value:'maxFactor', label:'录单时最高调整系数', type:'number', span:7, offset:1},
      ],
      programme:{
        programmeCode:'',
        programmeName:'',
        factor:'',
        maxFactor:'',
        minFactor:'',
        productId:'',
        productPersonnelId:'',
      },
      indemnityList: [],
      indemnityOpt:[
        {value:'indemnityCode', label:'编号', input: true },
        {value:'indemnityName', label:'名称'},
        {value:'indemnityContent', label:'内容', input: true }
      ],
      occupationList: [],
      occupationOpt:[
        {value:'occupationCode', label:'编号'},
        {value:'occupationName', label:'名称'},
        {value:'occupationPrice', label:'单价', input: true, number: true}
      ],
      temp_occupationList: [],
      schemeTableData: [],
      dialog:{
        show:false,
        formList:[
          {value:'additionalCode', label:'方案编号', span:24, required: false},
          {value:'additionalName', label:'方案名称', span:24},
        ],
        form:{
          additionalCode:'',
          additionalName:'',
          items:[]
        }
      },
      programmeId: this.$route.query.programmeId,
      detail: false,
      pageLoading: false,
      itemLoading: false
    }
  },
  watch:{
    'programme.productId':{
      handler(val){
        if (!val) {
          return
        }
        this.itemLoading = true
        productDet(val).then(({data})=>{
          const { indemnity, occupation } = data
          this.temp_occupationList = JSON.parse(JSON.stringify(occupation))
          if (this.detail) {
            this.detail = false
            this.itemLoading = false
            return
          }
          this.indemnityList = indemnity
          this.occupationList = occupation
          this.itemLoading = false
        })
      },
      deep: true
    },
  },
  created(){
    queryProduct({pageNum: 1,pageSize: 99999}).then(({data})=>{
      this.formList.map(i=>{
        if (i.value === 'productId') {
          i.options = data.records
        }
      })
    })
    if (this.programmeId) {
      this.pageLoading = true
      programmeDet(this.programmeId).then(({data}) =>{
        this.indemnityList = data.indemnity
        this.occupationList = data.occupation
        this.schemeTableData = data.additional
        this.detail = true
        for (const key in this.programme) {
          this.programme[key] = data.programme[key]
        }
        this.programme.productProgrammeId = this.programmeId
        this.pageLoading = false
      })
    }
  },
  methods:{
    showAddTableData(){
      this.dialog.form.items  =  JSON.parse(JSON.stringify(this.temp_occupationList))
      this.dialog.show = true
    },
    addTable(){
      this.schemeTableData.push(this.dialog.form)
      this.dialog={
        show:false,
        formList:[
          {value:'additionalCode', label:'方案编号', span:24, required: false},
          {value:'additionalName', label:'方案名称', span:24},
        ],
        form:{
          additionalCode:'',
          additionalName:'',
          items:[]
        }
      }
    },
    save(){
      const {programme} = this.$refs
      Promise.all([programme.validate()]).then(()=>{
        const data = Object.assign({}, {indemnity: this.indemnityList ,occupation:this.occupationList, programme: this.programme, additional: this.schemeTableData})
        saveScheme(data).then(({data})=>{
          this.$message({
            message: `${this.programmeId ? '编辑' : '新增'}成功`,
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