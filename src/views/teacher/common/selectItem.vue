<template>
  <div>
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="教号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="教号"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="教师名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="教师名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="部门名称" prop="dept">
        <el-select
          v-model="queryParams.dept"
          placeholder="部门名称"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in dataEnNameOptions"
            :key="dict.dictLabel"
            :label="dict.dictLabel"
            :value="dict.dictLabel"
          />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="班级" prop="clbum">
        <el-input
          v-model="queryParams.clbum"
          placeholder="班级"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="small"
          @click="onScreeoutMoney"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="small" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { dataEnName } from "@/api/student/student";

export default {
  data() {
    return {
      dataEnNameOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dept: "",
        name: "",
        number: "",
      },
    };
  },
  created() {
    /** 查询部门调换中文名 */
    dataEnName({ enName: "DEPT_DICTIONARY " }).then((response) => {
      this.dataEnNameOptions = response.data;
    });
  },
  methods: {
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        dept: "",
        name: "",
        number: "",
      };
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
