<template>
  <div>
    <div>
      <div style="height:45px;background: #FFFFFF">
        <swiper style="height:45px" :options="headSwiperOtions" >
          <swiper-slide v-for="item in applyList" :key="item">
            <el-row class="announcement">
<!--              <span style="font-weight: bold">{{item.titel}}:</span>-->
              <!--              <span v-html="item.noticeContent"></span>-->
            </el-row>
          </swiper-slide>
        </swiper>
      </div>

      <el-row style="height: 20px;display: flex; height: auto;margin: 20px">

        <el-col :span="6" style="margin-bottom: 20px">

          <div style="display: flex;justify-content: center;padding:65px 20px;background: #FFFFFF;margin-bottom: 20px">
            <div class="leftTitle">欢迎，{{name}}</div>
          </div>
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
              </p>
            </template>
          </el-calendar>
        </el-col>

        <el-col :span="18"  >
          <div class="remand_wrap" >
            <div class="remand">
              <p>
                <span>待更进客户</span>
                <span>{{waitFollow}}</span>
              </p>
            </div>
            <div class="remand">
              <p>
                <span>超期未联系客户</span>
                <span>{{overtimesFollow}}</span>
              </p>
            </div>
            <div class="remand">
              <p>
                <span>未答复咨询</span>
                <span>{{myUnfinishsData.length}}</span>
              </p>
            </div>
            <div class="remand">
              <p>
                <span>理赔待办</span>
                <span>6</span>
              </p>
            </div>
          </div>
          <div class="indexBg">
            <div class="title" style="color: #2D70EE;font-weight: 400">超期未联系客户({{ overtimesFollowInfo?overtimesFollowInfo.length:'0' }})</div>
            <el-table v-loading="loading" :data="overtimesFollowInfo" >
              <el-table-column type="index" label="序号" align="center" width="50" />
              <el-table-column label="企业名称" align="center" prop="customerName" />
              <el-table-column label="跟进主题" align="center" prop="followTitle" />
              <el-table-column label="跟进对象名称" align="center" prop="linkman" />
<!--              <el-table-column label="下次跟进内容" align="center" prop="nextWarnContent" />-->
<!--              <el-table-column label="下次跟进时间" align="center" prop="nextWarnDate" />-->
              <el-table-column label="陪访人" align="center" prop="assistNames" />
              <el-table-column label="事件经过" align="center" prop="visitPass" />
              <el-table-column label="事件结果" align="center" prop="visitResult" />
              <el-table-column label="备注" align="center" prop="remarks" />
            </el-table>
          </div>

        </el-col>
      </el-row>


<!--      <el-row style="height: 530px;">-->
<!--        <el-col :span="8">-->
<!--          <div class="indexBg">-->
<!--            &lt;!&ndash;            <div class="title">系统公告</div>&ndash;&gt;-->
<!--            <el-calendar>-->
<!--              &lt;!&ndash; 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法&ndash;&gt;-->
<!--              <template-->
<!--                slot="dateCell"-->
<!--                slot-scope="{date, data}">-->
<!--                <p :class="data.isSelected ? 'is-selected' : ''">-->
<!--                  {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}-->
<!--                </p>-->
<!--              </template>-->
<!--            </el-calendar>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="indexBg">-->
<!--            <div class="title">客户待更进提醒（2）</div>-->
<!--            <el-row style="background: #a2c9e8;padding: 10px;margin-bottom: 10px" >-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进人:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进客户:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">需要跟进内容:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进时间:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--            </el-row>-->

<!--            <el-row style="background: #a2c9e8;padding: 10px;margin-bottom: 10px" >-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进人:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进客户:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">需要跟进内容:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进时间:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div style="margin-top:20px;padding:20px 0; text-align:center; background:#fff">系统公告</div>-->
<!--          <swiper style="height:400px;background:#fff" :auto-update="true" :options="swiperOptions" >-->
<!--            <swiper-slide v-for="i in 3 " :key="i">-->
<!--              <div class="lineCard" >-->
<!--                <div class="dotCard"></div>-->
<!--                <span class="fontCommon" style="color: #F5222D"> </span>-->
<!--                <span class="fontCommon pointer" @click="examineDetail(item)">-->
<!--                      第2条公告内容xxxxxxxxxxx</span>-->
<!--                <span class="fontSmall"> 你好你好你好</span>-->
<!--                <span class="fontSmall">2021-8-12</span>-->
<!--              </div>-->
<!--            </swiper-slide>-->
<!--            <div class="swiper-pagination"></div>-->
<!--          </swiper>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="16">-->
<!--          <div class="indexBg">-->
<!--            <div class="title">超期未联系客户（3）</div>-->
<!--            <el-table v-loading="loading" :data="oclockOne" @selection-change="handleSelectionChange">-->
<!--              &lt;!&ndash;      <el-table-column type="selection" width="55" align="center" />&ndash;&gt;-->
<!--              <el-table-column type="index" label="序号" align="center" width="50" />-->
<!--              <el-table-column label="客户名称" align="center" prop="userId" />-->
<!--              <el-table-column label="客户类型" align="center" prop="userIp" />-->
<!--              <el-table-column label="标签" align="center" prop="userAccount" />-->
<!--              <el-table-column label="最后跟进时间" align="center" prop="a" />-->
<!--              <el-table-column label="超期未联系天数" align="center" prop="b" />-->
<!--            </el-table>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="indexBg">-->
<!--            <div class="title" style="background: #a2c9e8;">我的咨询(3条未答复) 需要答复(3条未答复)</div>-->
<!--            <el-row style="padding: 10px;margin-bottom: 10px" >-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">询问人:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">咨询问题:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">相关客户:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进时间:</el-col>-->
<!--                <el-col :span="16">2020 12.12 15:00:00</el-col>-->
<!--              </el-row>-->
<!--            </el-row>-->
<!--            <el-row style="padding: 10px;margin-bottom: 10px" >-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">询问人:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">咨询问题:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">相关客户:</el-col>-->
<!--                <el-col :span="16">xxx</el-col>-->
<!--              </el-row>-->
<!--              <el-row style="margin-bottom: 13px">-->
<!--                <el-col :span="8">跟进时间:</el-col>-->
<!--                <el-col :span="16">2020 12.12 15:00:00</el-col>-->
<!--              </el-row>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
// import BaseTable from '../components/Base/BaseTable/index'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/src/swiper.scss';
import { noticeList } from '@/api/system/notice'
import { followUnfinishedCount,followUnfinished,
         followOvertimesCount,followovertimesInfo,
         myUnfinishs,ideaMyIdeas} from '@/api/com'

export default {
  name: "Index",
  components:{
    // BaseTable,
    swiper,
    swiperSlide,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'name'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  data() {
    return {
      oclockOne:[{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      },{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      },{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      },{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      },{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      },{
        userId:"深圳xxx公司", userIp:"企业客户",  userAccount:"重要；华北地区",a:"2020 4.23 14:00",b:3
      }],
      myUnfinishsData:[],
      applyList:[],
      user: {},
      roleGroup: {},
      postGroup: {},
      body:{},
      overtimesFollow:"",
      overtimesFollowInfo:[],
      waitFollow:"",
      waitFollowInfo:[],
      activeTab: "resetPwd",
      columns:[
        {label: '字典名称', prop: 'cnName',type:'Tooltip'},
        {label: '字典状态', prop: 'status',slot: 'status'},
        {label: '备注', prop: 'remark'},
        {label: '创建时间', prop: 'createTime'},
        {label: '操作', prop: 'operate',slot: 'operate'},
      ],
      swiperOptions: {
        loop: true,
        speed:500,
        direction : 'vertical',
        slidesPerView : 5,
        centeredSlides : true,
        centeredSlidesBounds: true,
        autoplay: {
          delay: 500, // 自动轮播
          disableOnInteraction: false,
        },
        pagination:{
          el: '.swiper-pagination'
        }
      },
      headSwiperOtions: {
        loop: true,
        speed:800,
        direction : 'vertical',
        autoplay: {
          delay: 1000, // 自动轮播
        },
        pagination:{
          el: '.swiper-pagination'
        }
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        custType:1,
      }
    };

  },
  mounted() {
    ideaMyIdeas({pageNum:1,pageSize:10,}).then(response => {
      this.myUnfinishsData = response.data.list
    });
    myUnfinishs({pageNum:1,pageSize:10,}).then(response => {
          this.myUnfinishsData = response.data.list
    });

    //获取系统公告
    this.getNotice()
    //超期未联系数量
    followOvertimesCount(1).then(response => {
      console.log('---------------',response)
      this.overtimesFollow =  response.data
    });

    // 超期未联系信息
    followovertimesInfo(this.queryParams).then(response => {
      this.overtimesFollowInfo =  response.data.list
    });
    // 待跟进数量
    followUnfinishedCount(1).then(response => {
     this.waitFollow =  response.data
    });
    // 待跟进信息
    followUnfinished(this.queryParams).then(response => {
      this.waitFollowInfo =  response.data
    });
  },
  methods:{
    getNotice(){
      noticeList().then(response => {
        this.applyList = response.data
        this.applyList.push(response.data[0])
      });
    },

    onSelectData(selectedRowKeys){
      console.log("selectedRowKeys",selectedRowKeys);
    },
    edit(row){
      this.body = {
        beginTime: "",
        endTime: "",
        status: "1"
      }
      console.log("body",this.body);
      this.$refs.BaseTable.reset();
      console.log("row",row);
    }
  }
};
</script>

<style lang="scss" scoped>
.announcement{
  background: #FFFFFF;height: 45px;line-height: 45px;    color: #3c4353;font-size: 14px;padding:0 30px;

}
.remand_wrap{
  background: #fff;
  padding:0 20px;
  padding-bottom: 40px;
  display: flex;justify-content: space-around;

  .remand{
    cursor: pointer;
    margin-right: 40px;
    text-align: center;
    justify-content: center;
    display: flex;
    flex-flow: column;
    p{
      color: #3c495c;
      display: flex;
      flex-flow: column;
    }
    p span:first-child{
      font-weight: 700;
      padding:11px 0;
      font-size: 16px;

    }
    p span:last-child{
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      padding: 0;
    }
  }
  //.remand p:hover{
  //  color: #2D70EE;
  //}
  //.remand p:active{
  //  color: #2D70EE;
  //}
  //.remand:first-child p{
  //  color: #2D70EE;
  //}
}
.is-selected {
  color: #1989FA;
}
.lineCard{
  padding: 18px 0;
  border-bottom: 1px dashed rgba(0,0,0,0.1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span{
    padding-right: 16px;
  }
}
.indexBg{
  overflow: hidden;
  .title{
    padding: 20px 24px;
    color: rgba(0,0,0,.85);
    font-weight: 500;
    font-size: 20px;
  }
  margin:20px;
  border: 1px solid #e8e8e8;
  height: 660px;
  background: #FFFFFF;
}
</style>
