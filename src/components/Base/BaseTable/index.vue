<template>
  <div class="data-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      @selection-change="onSelectChange"
    >
      <template v-if="hasSelectedRow">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </template>
      <template v-if="indexOf">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center">
          <template slot-scope="scope">
            <!-- 有分页时，序号显示 -->
            <span>{{(pagination.currentPage - 1) * pagination.size + scope.$index + 1}}</span>
          </template>
        </el-table-column>
      </template>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <el-table-column v-if="col.slot"
                         :name="col.slot"
                         :key="index"
                         :label="col.label"
                         :width="col.width"
                         :align="col.align?col.align:'center'"
        >
          <template  slot-scope="scope">
            <slot  :name="col.slot" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!--类型为图片时候展示-->
        <el-table-column v-else-if="col.type==='img'"
                         :key="index"
                         :label="col.label"
                         :width="col.width"
                         :align="col.align?col.align:'center'"
        >
          <template  slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row[col.prop]"
              :preview-src-list="[scope.row[col.prop]]"
            >
            </el-image>
          </template>
        </el-table-column>
        <!--当需要显示文字提示时候展示-->
        <el-table-column v-else-if="col.type==='Tooltip'"
                         :key="index"
                         :label="col.label"
                         :width="col.width"
                         :align="col.align?col.align:'center'"
        >
          <template  slot-scope="scope">
            <el-tooltip class="tooltipStyle" effect="dark" :content="scope.row[col.prop]" placement="top">
              <span>{{scope.row[col.prop]}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- 普通列 -->
        <el-table-column v-else=""
                         :key="index"
                         :prop="col.prop"
                         :label="col.label"
                         :width="col.width"
                         :formatter="col.formatter"
                         :align="col.align?col.align:'center'"
        >
        </el-table-column>
      </template>
    </el-table>
    <!-- 是否调用分页 -->
    <template v-if="hasPagination">
      <div class="mt10 wid100">
        <el-pagination background
                       :page-sizes="[5, 10, 20, 50]"
                       :page-size="pagination.size"
                       :total="pagination.total"
                       :current-page="pagination.currentPage"
                       layout="total, sizes, prev, pager, next, jumper"
                       @current-change="currentChange"
                       @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </template>

  </div>
</template>

<script>
  import api from '../../../api'
  export default {
    name: "BaseTable",
    data(){
      return {
        loading:false,
        tableData:[],//表格数据
        selectedRowKeys:[],
        pagination:{
          size: 10,
          total: 1,
          currentPage: 1
        },//表格分页信息
        queryPage:{
          pageNum: 1,
          pageSize: 10,
        },//查询初始条件
      }
    },
    props:{
      defaultPageSize:{
        type:Number,
        default:10
      },//默认查询几条数据
      indexOf:{
        type:Boolean,
        default:true
      },//是否需要索引 （默认需要）
      columns:{
        type: Array,
        default: () => []
      },//列数据
      api:{
        type:String,
        default:""
      },//api接口名
      apiModule:{
        type:String,
        default:""
      },//api模块名
      body:{
        type: Object,
        default: () => {
          return {}
        }
      },//查询条件内容
      hasPagination:{
        type:Boolean,
        default:true
      },//是狗需要分页
      hasSelectedRow:{
        type:Boolean,
        default:false
      },//是否需要显示checkBox选项
      onSelectData:{
        type:Function,
        default:null
      },//checkBox选中回调
    },
    watch: {
      //监听路有变化刷新数据
      $route:{
        handler(to, from) {
          // console.log("to",to, "from",from);
          if (this.apiModule && this.api) {
            if(this.defaultPageSize){
              this.queryPage.pageSize = this.defaultPageSize
            }
            this.getDataList()
          }
        },
        immediate: true
      }
    },
    methods:{
      //翻页改变事件
      currentChange(current){
        this.queryPage.pageNum=current
        this.getDataList()
      },
      //页码改变事件
      handleSizeChange(current){
        this.queryPage.pageSize=current
        this.getDataList()
      },
      //ChecxkBox选中
      onSelectChange(selectedRowKeys){
        if (this.onSelectData) {
          this.onSelectData(selectedRowKeys);
        }
      },
      //数据获取
      getDataList(){
        this.loading= true
        this.$nextTick(()=>{
          if(this.apiModule&&this.api){
            let queryCondition = Object.assign(this.body, this.queryPage )
            api[this.apiModule][this.api](queryCondition).then((resp)=>{
              if(resp.state==='200'){
                let {list, pageSize, pageNum, total} = resp.data
                this.pagination = {
                  size:pageSize,
                  total,
                  currentPage:pageNum
                }
                this.tableData = list
                this.loading = false
              }
            })
          }
        })

      },
      // 重置调这个
      reset() {
        this.queryPage.pageNum = 1
        this.queryPage.pageSize = this.defaultPageSize
        this.getDataList();
      },
      // 查询
      search() {
        this.getDataList();
      },
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .tooltipStyle{
    margin: 4px;
  }
  .data-table{
    margin-top: 6px;
  }
</style>
