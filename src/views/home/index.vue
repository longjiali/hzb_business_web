<template>
  <div class="home">
    <div class="home_head content">
        <div class="home_head-item" v-for="(item,index) in headList" :key="index">
            <p>{{item.title}}</p>
            <div class="home_head-item-page">
              <div class="home_head-item-page-icon" :style="`background:${item.iconBackground}`">
                <component :color="item.iconColor" :is="item.icon"></component>
              </div>
              <span class="home_head-item-page-title">{{item.count}}<span>个</span></span>
            </div>
        </div>
    </div>
    <div class="div1 content">
      <div class="div1_left">
        <div class="div1_left-1">
          <p>本月累计保单（万元）</p>
          <p>¥ 90,872.63</p>
        </div>
        <div class="div1_left-2">
          <div class="div1_left-2-item">
            <span>今日新增保单金额</span>
            <span>6,200.00<span>元</span></span>
          </div>
          <div class="div1_left-2-item">
            <span>今日新增理赔案件</span>
            <span>6,200.00<span>元</span></span>
          </div>
          <div class="div1_left-2-item">
            <span>今日新增客户</span>
            <span>6,200.00<span>元</span></span>
          </div>
        </div>
      </div>
      <div class="div1_right" id="myChart">
      </div>
    </div>
    <div class="div2">
      <div class="div2-1 content">
        <div class="div2-1-title">
          员工保单排名
          <span>
            查看详情
            <i class="el-icon-caret-right"/>
          </span>
        </div>
        <el-radio-group size="mini" v-model="dataType">
          <el-radio-button label="今日"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
        </el-radio-group>
        <div class="div2-1-list">
          <div class="div2-1-list-item" v-for="(item,index) in 10" :key="item">
            <div class="number">
              <img :src="require(`@/assets/home/sort-${index+1}.png`)" v-if="item<=3"/>
              <template v-else>{{item}}</template>
            </div>
            <span>唐扬扬</span>
            <span>67.23
              <span>元</span>
            </span>
          </div>
          <div class="div2-1-list-item">
            <div class="number"></div>
            <span>均值</span>
            <span>67.23
              <span>元</span>
            </span>
          </div>
        </div>
      </div>
      <div class="div2-2 content">
        <div class="div2-2-title">
          员工保单排名
        </div>
        <el-row type="flex">
            <el-col :span="2"></el-col>
            <el-col :span="4">新增企业客户数</el-col>
            <el-col :span="4">待跟进客户数</el-col>
            <el-col :span="4">客户回收数</el-col>
            <el-col :span="4">新增保单量</el-col>
            <el-col :span="4">新增保单金额</el-col>
        </el-row>
        <el-row type="flex">
            <el-col :span="2">均值</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
        </el-row>
        <el-row type="flex" v-for="item in 10" :key="item">
            <el-col :span="2">唐扬扬</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
            <el-col :span="4">10</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
import Icon1 from '@/assets/home/icon-1.vue';
import Icon3 from '@/assets/home/icon-3.vue';
import Icon4 from '@/assets/home/icon-4.vue';
import { overdueFollowList, overdueFollowFollow,unfinishFollowCount,unfinishFollowList,} from '@/api/com'

export default {
  data() {
    return {
      unfinishCount:null,
      headList: [
        {title:'待跟进客户',icon:Icon1, iconColor:'#3B73E6',iconBackground:'#D8E3FA'},
        {title:'超期未联系客户',icon:Icon1, iconColor:'#FEA83A',iconBackground:'#FFF1D0'},
        {title:'未答复咨询',icon:Icon4, iconColor:'#47C9D5',iconBackground:'#DAF4F7'},
        {title:'理赔待办',icon:Icon3, iconColor:'#DE7A60',iconBackground:'#F8E4DF'},
      ],
      dataType:'今日',
      myChart:null
    }
  },
  mounted(){
    this.myChart = echarts.init(document.getElementById('myChart'));
    this.myChart.setOption({
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
        data: ['1', '2'],
        type:'plain',
        left:'right'
      },
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
              type: 'shadow'
          }
      },
      yAxis: {
          type: 'value'
      },
      grid:{
        width:'80%',
        height:'70%'
      },
      series: [{
        name:'1',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth:'20px',
          itemStyle:{
            normal:{
              barBorderRadius:[4,4, 0, 0],
              color: '#3B73E6',
            }
          }
      },
      {
        name:'2',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          smooth: true,
          symbol:'none',
          lineStyle:{
            normal:{
              color: '#58CED5',
              width: 5,
            }
          }
      }]
  });
    setTimeout(()=>{
      window.onresize= ()=>{
        this.myChart.resize()
      }
    },200)
  },
  created() {
    this.init()
  },
  destroyed(){
    window.onresize = null
  },
  methods:{
    init(){
      overdueFollowList({pageNum:1,pageSize:10}).then(({data})=>{

      }).finally(()=>{

      })
      overdueFollowFollow().then(({data})=>{

      }).finally(()=>{

      })
      unfinishFollowCount().then(({data})=>{
        this.headList[0].count=  data
        console.log(this.headList)
      }).finally(()=>{

      })
      unfinishFollowList({pageNum:1,pageSize:10}).then(({data})=>{

      }).finally(()=>{

      })

    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  padding: 20px;
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 20px;
  width: 100%;
  .content{
    background: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  .home_head{
    display: flex;
    padding:0;
    &-item{
      padding: 20px 40px;
      flex: 1;
      position: relative;
      &::after{
        content: '';
        display: block;
        height: 50px;
        width: 1px;
        background: #EAEAEA;
        position: absolute;
        right: 0;
        top: 30px;
      }
      p{
        font-size: 14px;
        color: #999999;
        margin: 0 0 12px 0;
      }
      &-page{
        &-icon{
          width: 36px;
          height: 36px;
          border-radius: 20px;
          text-align: center;
          line-height: 36px;
          *{
            vertical-align: text-bottom;
          }
        }
        &-title{
          font-size: 28px;
          font-weight: bold;
          color: #222222;
          margin-left: 10px;
          span{
            font-size: 14px;
            color: #555555;
            margin-left: 8px;
          }
        }
        div,span,img{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .div1{
    margin-top: 20px;
    display: flex;
    .div1_left{
      width: 330px;
      &-1{
        height: 98px;
        background: #3B73E6;
        box-shadow: 0px 4px 16px 0px rgba(59, 115, 230, 0.6);
        border-radius: 8px;
        padding: 7px 0 0 24px;
        p{
          &:nth-child(1){
            font-size: 12px;
            color: #FFFFFF;
            margin: 10px 0 8px 0;
          }
          &:nth-child(2){
            font-size: 28px;
            font-weight: bold;
            color: #FFFFFF;
            margin: 0;
          }
        }
      }
      &-2{
        margin-top: 18px;
        &-item{
          height: 53px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 23px;
          position: relative;
          border-bottom: 1px solid #EAEAEA;
          &:last-child{
            border: none;
          }
          &::before{
            content: '';
            display: inline-block;
            width: 6px;
            height: 24px;
            border-radius: 8px;
            position: absolute;
            left: 0;
          }
          &:nth-child(1){
            &::before{
              background: #3B73E6;
            }
          }
          &:nth-child(2){
            &::before{
              background: #FEA83A;
            }
          }
          &:nth-child(3){
            &::before{
              background: #47C9D5;
            }
          }
          span{
            &:nth-child(1){
              font-size: 14px;
              color: #555555;
            }
            &:nth-child(2){
              font-size: 20px;
              font-weight: bold;
              color: #222222;
              span{
                font-size: 14px;
                color: #555555;
                margin-left: 7px;
              }
            }
          }
        }
      }
    }
    .div1_right{
      flex: 1;
      margin-left: 20px;
    }
  }
  .div2{
    display: flex;
    margin-top: 20px;
    &-1{
      width: 374px;
      height: 500px;
      &-title{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        margin-bottom: 20px;
        span{
          font-size: 12px;
          color: #999999;
          cursor: pointer;
          i{
            margin-left: 4px;
          }
        }
      }
      &-list{
        margin-top: 20px;
        &-item{
          display: flex;
          margin-bottom: 16px;
          div{
            width: 30px;
            height: 18px;
            text-align: left;
            font-size: 14px;
            font-weight: bold;
            color: #222222;
            img{
              width: 15px;
              height: 18px;
            }
          }
          span{
            &:nth-child(3){
              font-size: 16px;
              font-weight: bold;
              color: #222222;
              flex: 1;
              text-align: right;
              span{
                font-size: 14px;
                color: #555555;
                margin-left: 7px;
              }
            }
            &:nth-child(2){
              font-size: 14px;
              color: #555555;
            }
          }
          &:last-child{
            background: #FEF6E9;
            padding: 6px 0 ;
            span{
              color: #FCB106;
              span{
                color: #FCB106;
              }
            }
          }
        }
      }
    }
    &-2{
      margin-left: 20px;
      flex: 1;
      &-title{
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        margin-bottom: 20px;
      }
      .el-row{
        margin: 4px 0;
        &:nth-child(2){
          margin-bottom: 12px;
          .el-col{
            color: #555555;
            background: none;
            font-weight: unset;
          }
        }
        &:nth-child(3){
          .el-col{
            color: #FCB106;
            background: #FEF6E9;
          }
        }
        .el-col{
          background: #EEF0F9;
          padding: 8px 0;
          text-align: center;
          margin: 0 4px;
          color: #222222;
          font-size: 14px;
          font-weight: bold;
          &:first-child{
            background: none;
          }
        }
      }
    }
  }
}
</style>
