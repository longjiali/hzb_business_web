<template>
  <div class='product-Center'>
    <!-- <el-card class='product-Center-header'>
      <el-form :inline='true' :model="searchForm">
        <el-form-item label='产品名称'>
          <el-input placeholder="请输入产品名称" v-model="searchForm.productName" clearable size="small" style="width: 240px"/>
        </el-form-item>
        <el-form-item label='保险公司'>
          <el-input placeholder="请输入保险公司" v-model="searchForm.insuranceCompany" clearable size="small" style="width: 240px"/>
        </el-form-item>
        <el-form-item>
          <el-button type="cyan" icon="el-icon-search" size="small" @click="getList()">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-refresh" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <div class='product-Center-item'>
      <div class='center-item-bar'>
        <el-row type="flex" style="flex-wrap: wrap" v-loading="loading">
          <el-col :span='7' v-for='(item, index) in list' :key='index' :offset="index%3 !== 0 ? 1 :0 " style="min-height:100%;margin-bottom:20px">
            <el-card>
              <el-image :src="item.productImgPath" class="banner"></el-image>
              <div class="main">
                <div class="head">
                  <span class="title">
                    <Tooletip :text="item.productName"/>
                  </span>
                  <span class="type">
                      <Tooletip :text="item.insuranceCompany" :textLength="5"/>
                  </span>
                </div>
                <div class="content">
                    <Tooletip :text="item.productDesc" :textLength="25"/>
                </div>
                <el-button type="primary" round @click="goto(item)">
                  我要购保
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { queryProductList } from '@/api/productCenter/productCenter.js';
import { getToken } from '@/utils/auth'
import Tooletip from './tooletip.vue';
export default {
  components:{Tooletip},
  data () {
    return {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      list:[],
      searchForm:{
        insuranceCompany:'',
        productName:''
      },
      loading: false
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.loading = true
      queryProductList({pageNum: 1, pageSize: 999, ...this.searchForm }).then(({data})=>{
        this.list = data.records
        this.loading = false
      })
    },
    goto(item){
      const { custNo } = this.$route.query
      console.log(process.env.VUE_APP_EMPLOYER_LINK);
      window.open(`${process.env.VUE_APP_EMPLOYER_LINK}/#/insurance?productId=${item.productId}&token=${getToken()}${custNo ? '&custNo='+ custNo : '' }`)
    }
  }
}
</script>

<style lang='scss' scoped>
.product-Center {
  padding: 20px;
  .product-Center-item {
    // margin-top: 20px;
    padding: 20px;
    background: #FFFFFF;
    border-radius: 8px;
    .el-card{
      margin: 20px 0;
      border-radius: 8px;
      height: 100%;
      ::v-deep .el-card__body{
        padding: 0;
      }
    }
    .center-item-bar {
      .banner{
        width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
        min-height: 80px;
        line-height: 80px;
        ::v-depp img{
          width: 100%;
          height: auto;
          min-height: 80px;
        }
      }
      .main{
        padding: 20px;
        .head{
          display: flex;
          .title{
            flex: 1;
            font-size: 16px;
            color: #333;
          }
          .type{
            font-size: 14px;
          }
        }
        .content{
          margin-top: 20px;
        }
        .el-button{
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
  .center-item-pagination {
    display: flex;
    align-content: center;
    justify-content: center;
  }
}
</style>