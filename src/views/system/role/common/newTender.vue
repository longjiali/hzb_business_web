<template>
  <div>
    <el-dialog :visible.sync="isVisible"
    :title="this.titles"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog">
      <!-- 添加或修改角色配置对话框 -->
      <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" >
          <el-tree
            :data="menuOptions"
            show-checkbox
            ref="menu"
            accordion
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
      <!-- </el-dialog> -->
    </el-dialog>
  </div>
</template>

<script>
import {roleMenuTreeselect,treeselect} from "@/api/system/menu"
import {addRole,updateRole,getRoleDetail} from "@/api/system/role"
export default {
  props: {
    isShow: Boolean,
    dialogRow: Object,
    title:String
  },
  data() {
    return {
      isVisible: this.isShow,
      titles:this.title,
      // 表单参数
      form: {
        roleName: "",
        roleKey: "",
        status: "0",
        remark: "",
        menuIds:[]
      },
      menuOptions:[],
      defaultProps: {
        children: "children",
        label: "label"
      },
      statusOptions:[],
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ],
        menuIds: [
          { required: true, message: "角色菜单不能为空", trigger: "change" }
        ],
      }
    };
  },
  created(){

  },
  mounted(){
    this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
    });
    console.log(this.$props.dialogRow)
      let arr=Object.keys(this.$props.dialogRow)
      if(arr.length!=0){
          //编辑
        getRoleDetail(this.$props.dialogRow.roleId).then(response => {
          this.$refs.menu.setCheckedKeys(response.data.checkedKeys);
         })
        this.form ={
          roleId:this.$props.dialogRow.roleId,
          roleKey:this.$props.dialogRow.roleKey,
          roleName:this.$props.dialogRow.roleName,
          roleSort:this.$props.dialogRow.roleSort,
          status:this.$props.dialogRow.status,
        }
          this.getroleMenuTreeselect()
          this.getMenuTreeselect()
      }else{
        this.getMenuTreeselect()
      }
  },
  methods: {
        // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
        /** 查询菜单树结构 */
    getMenuTreeselect() {
      treeselect().then(response => {
        this.menuOptions = response.data;
      });
    },
    /** 查询角色菜单树结构 */
    getroleMenuTreeselect() {
      // roleMenuTreeselect(this.form.roleId).then(response => {
      //   this.menuOptions = response.data.menus;
      //   this.$refs.menu.setCheckedKeys(response.data.checkedKeys);
      // });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.form.menuIds = this.getMenuAllCheckedKeys();
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            updateRole(this.form).then(response => {
              if (response.state == 200) {
                this.msgSuccess("修改成功");
                this.cancel()
                this.$emit('getList')
              }
            });
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then(response => {
              if (response.state == 200) {
                this.msgSuccess("新增成功");
                this.cancel()
                this.$emit('getList')
              }
            });
          }
        }
      });
    },
    closeDialog(){
        this.$emit("closeDialog");
    },
    // 取消按钮
    cancel() {
      this.reset()
      this.$emit("closeDialog");
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: undefined,
        status: "0",
        menuIds: [],
        deptIds: [],
        remark: undefined
      };
      this.resetForm("form");
    },
  }
};
</script>
