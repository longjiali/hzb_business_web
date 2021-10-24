<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="菜单名称">
        <el-input
          v-model="queryParams.menuName"
          placeholder="菜单名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="onScreeoutMoney"
        />
      </el-form-item>
      <el-form-item label="菜单状态">
        <el-select v-model="queryParams.status" style="width: 240px" placeholder="菜单状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
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
      queryParams: {
        menuName: undefined,
        visible: undefined,
      },
    };
  },
  mounted() {
    this.getDicts("sys_normal_disable").then((response) => {
      this.statusOptions = response.data;
      this.$emit("fromChild", this.statusOptions);
    });
  },
  methods: {
    resetQuery() {
      this.queryParams = {
        menuName: undefined,
        visible: undefined,
      };
      this.dateRange = [];
      this.onScreeoutMoney();
    },
    onScreeoutMoney() {
      const para = Object.assign({}, this.queryParams);
      const criteria = this.queryParams;
      this.$emit("onScreeoutMoney", criteria, this.dateRange);
    },
  },
};
</script>
