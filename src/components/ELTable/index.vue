<template>
  <div>
    <el-card class="search" v-if="searchList.length > 0">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col v-for="(item,index) in searchList" :key="index"  :span="8" :offset="index%3 !==0 ? 1 : 0 " >
            <el-form-item :label="item.name+'：'">
              <el-input v-model="searchForm[item.model]"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="searchOpt" type="flex" justify="end">
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button>重置</el-button>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-loading="tableLoading">
      <div class="table_opt">
        <slot name="table_button"></slot>
      </div>
      <el-table :data="TableData" border>
        <el-table-column  v-for="(item,index) in column" :key="index" :prop="item.model" :label="item.name" v-bind="item">
          <template slot-scope="{ row, $index }">
            <slot :name="`table_${item.model}`" :row="row" v-if="item.type !== 'index'">
              {{row[item.model]}}
            </slot>
            <span v-else>{{ $index+1 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="parame.pageNum"
          :page-size="parame.pageSize"
          layout="total, prev, pager, next"
          :total="parame.total">
        </el-pagination>
      </div>
     
    </el-card>
  </div>
</template>
<script>
export default {
  props:{
    column:{
      tyep: Array,
      required: true
    }
  },
  data(){
    return{
      TableData: [],
      searchList:[],
      searchForm: {},
      tableLoading: false,
      parame:{
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created(){
    this.searchList = this.column.filter(i=>i.search)
    this.searchList.map(i=>{
      this.$set(this.searchForm, i.model, '')
    })
    this.getTableData()
  },
  methods:{
    getTableData(){
      this.tableLoading= true
      this.$emit('getTableData',{...this.searchForm , ...this.parame}, val =>val.then(({data})=>{
        this.TableData = data.records
        this.parame.pageNum = data.current
        this.parame.pageSize = data.size
        this.parame.total = data.total
        this.tableLoading= false
      }))
    },
    search(){
      this.getTableData()
    },
    handleCurrentChange(val){
      this.parame.pageNum = val
      this.getTableData()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  margin: 20px;
  ::v-deep .el-card__body {
    padding:20px 20px 0 20px;
  }
  .el-form {
    .el-form-item {
      display: flex;
      margin: 0 20px 20px 20px;
      &:first-child {
        margin-left: 0;
      }
      ::v-deep .el-form-item__content {
        flex: 1;
      }
    }
    .searchOpt {
      margin-bottom: 20px;
    }
  }
}
.table_opt{
  margin: 10px 0;
  text-align: right;
}
.el-card{
  margin: 20px;
}
</style>