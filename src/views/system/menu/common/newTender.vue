<template>
  <div>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog
      :visible.sync="isVisible"
      :title="this.titles"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="parentId">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="是否外链">
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'M'" label="权限标识">
              <el-input v-model="form.permission" placeholder="请输入权限标识" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="显示状态">
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import {
  listMenu,
  getMenu,
  delMenu,
  addMenu,
  updateMenu,
} from "@/api/system/menu";
export default {
  props: {
    isShow: Boolean,
    dialogRow: Object,
    title: String,
    parentId: Number,
  },
  components: { Treeselect, IconSelect },
  data() {
    return {
      isVisible: this.isShow,
      titles: this.title,
      // 表单参数
      form: {
        parentId: undefined,
        isFrame: "",
        menuType: "M",
        menuName: "",
        icon: null,
        path: "",
        permission: "",
        component: "",
        visible: "0",
        // status: "0",
      },
      visibleOptions: [
        { value: "0", label: "显示" },
        { value: "1", label: "隐藏" },
      ],
      statusOptions: [
        { value: "0", label: "正常" },
        { value: "1", label: "停用" },
      ],
      menuOptions: [],
      // 表单校验
      rules: {
        orderNum: [
          { required: true, message: "显示顺序不能为空", trigger: "blur" },
        ],
        parentId: [
          { required: true, message: "上级菜单不能为空", trigger: "change" },
        ],
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        menuType: [
          { required: true, message: "菜单类型不能为空", trigger: "blur" },
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getTreeselect();
  },
  mounted() {
    let arr = Object.keys(this.$props.dialogRow);
    if (arr.length != 0 && this.$props.dialogRow.parentId != undefined) {
      this.form = this.$props.dialogRow;
    }
  },
  methods: {
    // 取消按钮
    cancel() {
      this.isVisible = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        permission: undefined,
        menuId: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        isFrame: "1",
        visible: "0",
        status: "0",
      };
      this.resetForm("form");
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.permissionId,
        label: node.menuName,
        children: node.children,
      };
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      listMenu().then((response) => {
        this.menuOptions = [];
        const menu = {
          permissionId: 0,
          parentId: 0,
          menuName: "主类目",
          children: [],
        };
        menu.children = this.handleTree(response.data, "permissionId");
        this.menuOptions.push(menu);
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.permissionId != undefined) {
            updateMenu(this.form).then((response) => {
              if (response.state == 200) {
                this.msgSuccess("修改成功");
                this.$emit("closeDialog");
                this.$emit("getList");
                this.reset();
              }
            });
          } else {
            if (this.form.icon == null) {
              this.form.icon = "default";
            }
            addMenu(this.form).then((response) => {
              if (response.state == 200) {
                this.msgSuccess("新增成功");
                this.$emit("closeDialog");
                this.$emit("getList");
                this.reset();
              }
            });
          }
        }
      });
    },
    closeDialog() {
      this.$emit("closeDialog");
      this.reset();
    },
  },
};
</script>
