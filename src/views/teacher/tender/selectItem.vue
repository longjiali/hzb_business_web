<template>
  <div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="88px">
      <el-form-item label="时间类型" prop="userAccount">
        <el-input
          v-model="queryParams.userAccount"
          placeholder="请输入时间类型"
          clearable
          style="width: 240px;"
          size="small"
        />
      </el-form-item>
      <el-form-item label="险种" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入险种"
          clearable
          style="width: 240px;"
          size="small"
        />
      </el-form-item>
      <el-form-item label="下单状态" prop="loginState">
        <el-select
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option>已下单</el-option>
          <el-option>未下单</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缴费状态" prop="loginState">
        <el-select
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option>已缴费</el-option>
          <el-option>待缴费</el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="操作时间">-->
<!--        <el-date-picker-->
<!--          v-model="dateRange"-->
<!--          size="small"-->
<!--          style="width: 240px"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          type="daterange"-->
<!--          range-separator="-"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--        ></el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="small" @click="onScreeoutMoney">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: [],
      statusOptions: [],
      typeOptions:[],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userAccount:undefined,
        userName:undefined,
        loginState: undefined,
      }
    };
  },
  mounted() {
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userAccount:undefined,
        userName:undefined,
        loginState: undefined,
      };
      this.dateRange = [];
      this.onScreeoutMoney();
    },
    onScreeoutMoney() {
      const para = Object.assign({}, this.queryParams);
      const criteria = this.queryParams;
      this.$emit("onScreeoutMoney", criteria, this.dateRange);
    }
  }
};
</script>
