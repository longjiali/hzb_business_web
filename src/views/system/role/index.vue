<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <selectItem @searchList="getList" @fromChild='getchlid' @onScreeoutMoney="onScreeoutMoney"></selectItem>
    <!-- 操作按钮 -->
    <el-row :gutter="10" class="mb8" style="margin-bottom: 15px">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
          v-hasPermi="['system:role:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="small"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:role:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="small"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>
      </el-col> -->
    </el-row>
    <!-- 列表数据 -->
    <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="序号" align="center" />
      <!-- <el-table-column label="角色编号" prop="roleId" width="120" /> -->
      <el-table-column label="角色名称" prop="roleName" align="center" :show-overflow-tooltip="true"  />
      <el-table-column label="权限字符" prop="roleKey" align="center" :show-overflow-tooltip="true"  />
      <!-- <el-table-column label="显示顺序" prop="roleSort" /> -->
      <el-table-column label="角色状态" align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="small" v-hasPermi="['system:role:edit']" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <!-- <el-button
            size="small"
            type="text"
            icon="el-icon-circle-check"
            @click="handleDataScope(scope.row)"
            v-hasPermi="['system:role:edit']"
          >数据权限</el-button> -->
          <el-button
            size="small"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:role:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 新增/修改弹框 -->
    <newTender
       v-if='newTender.show'
      :isShow="newTender.show"
      :dialogRow="newTender.dialogRow"
      :title='newTender.title'
      @getList="getList"
      @closeDialog="hideNewtender"
    ></newTender>
    <dataScope v-if='dataScope.show'
      :isShow="dataScope.show"
      :dialogRow="dataScope.dialogRow"
      :title='dataScope.title'
      @getList="getList"
      @closeDialog="hideDatascope"></dataScope>
  </div>
</template>

<script>
import {
  listRole,
  getRole,
  delRole,
  addRole,
  updateRole,
  exportRole,
  getRoleDetail,
  changeRoleStatus
} from "@/api/system/role";
import {
  treeselect as menuTreeselect,
  roleMenuTreeselect
} from "@/api/system/menu";
import {
  treeselect as deptTreeselect,
  roleDeptTreeselect
} from "@/api/system/dept";
import selectItem from "./common/selectItem";
import newTender from "./common/newTender";
import dataScope from './common/dataScope';
export default {
  components: {
    selectItem,
    newTender,
    dataScope
  },
  name: "Role",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],

      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // 多选修改
      selectJons:{},
      newTender:{
        show:false,
        dialogRow:{},
        title:''
      },
      dataScope:{
        show:false,
        dialogRow:{},
        title:''
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取字典值
    getchlid(data){
      this.statusOptions=data
    },
    // 获取查询条件
    onScreeoutMoney(data,dateRange) {
      console.log(data, dateRange);
      this.queryParams = data;
      this.dateRange = dateRange;
      this.getList();
    },
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
        response => {
          this.roleList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then(response => {
        this.menuOptions = response.data;
      });
    },
    /** 查询部门树结构 */
    getDeptTreeselect() {
      deptTreeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getHalfCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus;
        this.$refs.menu.setCheckedKeys(response.checkedKeys);
      });
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.depts;
        this.$refs.dept.setCheckedKeys(response.checkedKeys);
      });
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.roleName + '"角色吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return changeRoleStatus(row.roleId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
          this.getList()
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection)
      this.ids = selection.map(item => item.roleId);
      this.single = selection.length != 1;
      this.selectJons=selection[0]
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.newTender.show=true
      this.newTender.title = "添加角色";
      this.newTender.dialogRow={}
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      const roleId = row.roleId || this.ids;
      getRole(roleId).then(response => {
      // getRoleDetail(roleId).then(response => {
        this.newTender.show=true
        this.newTender.dialogRow=response.data
        this.newTender.title='修改角色'
      })
    },
    hideDatascope(){
      this.dataScope.show=false
    },
    hideNewtender(){
      this.newTender.show=false
    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      // this.reset();
      // this.$nextTick(() => {
      //   this.getRoleDeptTreeselect(row.roleId);
      // });
      // getRole(row.roleId).then(response => {
      //   this.form = response.data;
      //   this.openDataScope = true;
      //   this.title = "分配数据权限";
      // });
      this.dataScope.show=true
      this.dataScope.dialogRow=row
      this.dataScope.title='分配数据权限'
    },


    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$confirm(
        '是否确认删除角色编号为"' + roleIds + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delRole(roleIds);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有角色数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportRole(queryParams);
        })
        .then(response => {
          this.download(response.msg);
        })
        .catch(function() {});
    }
  }
};
</script>
