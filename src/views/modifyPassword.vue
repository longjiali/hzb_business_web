
<template>
  <div class="html5Password">
    <el-form
      ref="form"
      :model="user"
      :rules="rules"
      label-width="88px"
      class="password"
    >
    <div class="title">惠众保</div>
      <el-form-item label="账号" prop="number">
        <el-input
          v-model="user.number"
          placeholder="请输入账号"
          class="inputPassword"
        />
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input
          v-model="user.password"
          placeholder="请输入旧密码"
          class="inputPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="originalPassword">
        <el-input
          v-model="user.originalPassword"
          placeholder="请输入新密码"
          class="inputPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="user.confirmPassword"
          placeholder="请确认密码"
          class="inputPassword"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <!-- <el-button type="danger" size="small" @click="close">关闭</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePassword } from "@/api/student/student";


    var mo = function (e) { e.preventDefault(); };
    function stop() {
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", mo, { passive: false });//禁止页面滑动
    }
    //直接默认不让滑动
    stop();

    /***取消滑动限制***/
    function move() {
        document.body.style.overflow = '';//出现滚动条
        document.removeEventListener("touchmove", mo, { passive: false });
    }
export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.originalPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      test: "1test",
      user: {
        type: 1,
        number: "",
        password: undefined,
        originalPassword: undefined,
        confirmPassword: undefined,
      },

      // 表单校验
      rules: {
        number: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        originalPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updatePassword(this.user).then(
            (response) => {
              if (response.state == 200) {
                this.msgSuccess("修改成功");
              }
            }
          );
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },
  },
};
</script>
<style  scoped>
.html5Password {
  background-size: 100% 100%;
  background-image: url("../assets/image/modifyPassword.jpg");
  position: relative;
  width: 100%;
  height: 100%;
}
  .title {
        font-size: 20px;
        margin-bottom: 20px;
        text-align: center;
        color: #1890ff;
        letter-spacing: 5px;
    }
.password {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
.inputPassword {
  width: 340px;
}
@media screen and (max-width: 480px) {
  .inputPassword {
    width: 200px;
  }
}
</style>
