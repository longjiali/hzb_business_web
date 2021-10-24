<template>
  <div class="app-container">
    <!-- 条件搜索 -->
    <selectItem @searchList="getList" @fromChild='getchild' @onScreeoutMoney="onScreeoutMoney"></selectItem>
    <!-- 操作按钮 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
          v-hasPermi="['system:menu:add']"
        >新增</el-button>
      </el-col>
    </el-row>
    <!-- 列表数据 -->
    <el-table
      v-loading="loading"
      :data="menuList"
      row-key="permissionId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <!-- <el-table-column prop="icon" label="图标" align="center" width="100">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>-->
      <el-table-column prop="path" label="路由地址"  align="center"></el-table-column>
      <el-table-column prop="orderNum" label="显示顺序" align="center"></el-table-column>
      <el-table-column prop="permission" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="菜单状态" align="center" :formatter="statusFormat"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:menu:edit']"
          >修改</el-button>
          <el-button
            size="small"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['system:menu:add']"
          >新增</el-button>
          <el-button
            size="small"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:menu:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/修改弹框 -->
    <newTender
      v-if="newTender.show"
      :isShow="newTender.show"
      :dialogRow="newTender.dialogRow"
      :title="newTender.title"
      @getList="getList"
      :parentId="newTender.parentId"
      @closeDialog="hideNewtender"
    ></newTender>
  </div>
</template>

<script>
import {
  listMenu,
  getMenu,
  delMenu,
  addMenu,
  updateMenu
} from "@/api/system/menu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import selectItem from "./common/selectItem";
import newTender from "./common/newTender";
//
export default {
  name: "Menu",
  components: { Treeselect, IconSelect, selectItem, newTender },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      newTender: {
        show: false,
        dialogRow: {},
        title: "",
        parentId: null
      },
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取字典值
    getchild(data){
      this.statusOptions=data
    },
    /* 条件搜索 */
    onScreeoutMoney(data, dateRange) {
      console.log(data, dateRange);
      this.queryParams = data;
      this.dateRange = dateRange;
      this.getList();
    },
    /* 隐藏弹框 */
    hideNewtender() {
      this.newTender.show = false;
    },
    /** 查询菜单列表 */
    getList() {
      this.loading = true;
      listMenu(this.queryParams).then(response => {
        this.menuList = this.handleTree(response.data, "permissionId");
        console.log(this.menuList);
        this.loading = false;
      });
    },

    /** 查询菜单下拉树结构 */
    getTreeselect() {
      listMenu().then(response => {
        this.menuOptions = [];
        const menu = { menuId: 0, menuName: "主类目", children: [] };
        menu.children = this.handleTree(response.data, "menuId");
        this.menuOptions.push(menu);
      });
    },
    // 显示状态字典翻译
    visibleFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.visibleOptions, row.visible);
    },
    // 菜单状态字典翻译
    statusFormat(row, column) {
      if (row.menuType == "F") {
        return "";
      }
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      if (row != null) {
        this.newTender.dialogRow.parentId = row.permissionId;
      }
      this.newTender.title = "添加菜单";
      this.newTender.show = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      getMenu(row.permissionId).then(res => {
        this.newTender.show = true;
        this.newTender.title = "修改菜单";
        this.newTender.dialogRow = res.data;
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(
        '是否确认删除名称为"' + row.menuName + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return delMenu(row.permissionId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    }
  }
};
</script>
