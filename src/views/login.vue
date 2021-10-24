
<template>
  <div class="login">
    <div class="login-content">
      <div class="logo mb32">
        <div class="logo-head">
          <img alt="" style=" display: block; height: 50px;width: 60px; margin-bottom: 33px;" src="@/assets/logo/logoBac.png">
          <span class="text-color-style">惠众保业务核心系统</span>
        </div>
      </div>

        <div class="login_">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
<!--            <h3 class="title">管理系统</h3>-->
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" :clearable='true' type="text" auto-complete="off" placeholder="用户帐号">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input

                v-model="loginForm.password" :show-password='true'
                type="password"
                auto-complete="off"
                placeholder="用户密码"
                @keyup.enter.native="handleLogin"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="small"
                type="primary"
                style="border:1px solid #1890ff; width:100%;background: #1890ff;"
                @click.native.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
          <!--  底部  -->
          <div class="el-login-footer">
<!--            <a target="_blank" href="http://www.rendersea.com/">www.rendersea.com</a>-->
            <!-- <span>© 深圳市深职院科技有限公司 All Rights Reserved.</span> -->
          </div>
        </div>
      <!-- 登录 -->
<!--      <div class="form" >-->
<!--        <a-form :form="form">-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              @pressEnter="handleSubmit"-->
<!--              placeholder="账号"-->
<!--              size="large"-->
<!--              v-decorator="['account',{rules: [{ required: true, message: '请输入您的账户!' }, {validator: checkAccount,}],getValueFromEvent: event => event.target.value.replace(/\s+/g, ''),}]"-->
<!--            >-->
<!--              <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>-->
<!--            </a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              @pressEnter="handleSubmit"-->
<!--              placeholder="密码"-->
<!--              size="large"-->
<!--              type="password"-->
<!--              v-decorator="['password',{rules: [{ required: true, message: '请输入您的密码!' }]}]"-->
<!--            >-->
<!--              <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock"/>-->
<!--            </a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-button-->
<!--              :loading="loading"-->
<!--              @click="handleSubmit"-->
<!--              block-->
<!--              size="large"-->
<!--              type="primary"-->
<!--            >登录</a-button>-->
<!--            &lt;!&ndash; <div class="forget">-->
<!--                <span @click="forgetClick">忘记密码</span>-->
<!--            </div>&ndash;&gt;-->
<!--          </a-form-item>-->
<!--        </a-form>-->
<!--      </div>-->
      <!-- 忘记密码 -->
<!--      <div class="form-forget" v-else>-->
<!--        <a-form :form="formForget">-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              placeholder="账号"-->
<!--              size="large"-->
<!--              v-decorator="['account',{rules: [{ required: true, message: '请输入您的账户!' }, {validator: checkAccount,}]}]"-->
<!--            >-->
<!--              &lt;!&ndash; <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user" /> &ndash;&gt;-->
<!--            </a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              placeholder="11 位手机号"-->
<!--              size="large"-->
<!--              v-decorator="['phone',{rules: [{ required: true, message: '请输入手机号!' }, {validator: checkPhone,}]}]"-->
<!--            >-->
<!--              <a-select-->
<!--                slot="addonBefore"-->
<!--                style="width: 70px"-->
<!--                v-decorator="['prefix',{ initialValue: '86' }]"-->
<!--              >-->
<!--                <a-select-option value="86">+86</a-select-option>-->
<!--                <a-select-option value="87">+87</a-select-option>-->
<!--              </a-select>-->
<!--            </a-input>-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-row :gutter="8">-->
<!--              <a-col :span="17">-->
<!--                <a-input-->
<!--                  placeholder="输入验证码"-->
<!--                  size="large"-->
<!--                  v-decorator="['captcha',{rules: [{ required: true, message: '请输入验证码!' }]}]"-->
<!--                />-->
<!--              </a-col>-->
<!--              <a-col :span="6">-->
<!--                <a-button-->
<!--                  :disabled="btnDisable"-->
<!--                  @click="getMsg"-->
<!--                  class="getNumber"-->
<!--                >{{btnDisable ? countdown + 's' : '获取验证码'}}</a-button>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              placeholder="新密码 6-16位，可包含数字、字母（区分大小写）"-->
<!--              size="large"-->
<!--              type="password"-->
<!--              v-decorator="['password',{rules: [{required: true, message: '请输入密码!',}, {validator: validateToNextPassword,}],}]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-input-->
<!--              @blur="handleConfirmBlur"-->
<!--              placeholder="确认密码 6-16位，可包含数字、字母（区分大小写）"-->
<!--              size="large"-->
<!--              type="password"-->
<!--              v-decorator="['confirm',{rules: [{required: true, message: '请输入密码!',}, {validator: compareToFirstPassword,}],}]"-->
<!--            />-->
<!--          </a-form-item>-->
<!--          <a-form-item>-->
<!--            <a-row :gutter="8">-->
<!--              <a-col :span="12">-->
<!--                <a-button @click="handleBack" block size="large">返回</a-button>-->
<!--              </a-col>-->
<!--              <a-col :span="12">-->
<!--                <a-button-->
<!--                  :loading="loading"-->
<!--                  @click="handleForgetSubmit"-->
<!--                  block-->
<!--                  size="large"-->
<!--                  type="primary"-->
<!--                >登录</a-button>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--          </a-form-item>-->
<!--        </a-form>-->
<!--      </div>-->
    </div>
    <div class="footer text-black-45">
      <!-- <div class="footer-top mb8">
          <span class="mr40">帮助中心</span>
          <span>意见反馈</span>
      </div>-->
      <div class="footer-bottom pb56">Copyright @ 深圳市惠众保科技有限公司</div>
    </div>
    <img alt="" class="bgImg bgImg-one" src="@/assets/image/login_1.png">
    <img alt="" class="bgImg bgImg-two" src="@/assets/image/login_2.png">
    <img alt="" class="bgImg bgImg-three" src="@/assets/image/login_3.png">
    <img alt="" class="bgImg bgImg-four" src="@/assets/image/login_4.png">
  </div>

</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import md5 from "js-md5";
import { encryption } from "@/utils/encryption";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        account: "",
        password: "",
        rememberMe: false,
        sign:'',
        code: "",
      },
      selectField:{
          payList:[]
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", message: "用户帐号不能为空" },
          {validator:this.validatorAccount}
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log("route---",route);
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
     // this.getDicts("PAY_TYPE").then(response => {
     //    this.selectField.payList = response.data;
     //    console.log(this.selectField.payList)
     //  });

    this.getCookie();
  },
  methods: {
    getCookie() {
      const account = Cookies.get("account");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        account: account === undefined ? this.loginForm.account : account,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          let userinfo={
            password:this.loginForm.password,
            account:this.loginForm.account
          }
          // let userinfo = this.loginForm;

          // userinfo.password = userinfo.password;
          let pwd = userinfo.password;
          let json = encryption(pwd);
          userinfo.password = json.arr1;
          userinfo.sign = json.math;
          if (this.loginForm.rememberMe) {
            Cookies.set("account", this.loginForm.account, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("account");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch("Login", userinfo)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.login {
  min-height: 560px;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 26vh;
  background: #f0f3f7;

  &-content {
    width: 368px;

    input {
      font-size: 14px;
    }
  }

  .forget {
    text-align: center;
    margin-top: 10px;

    > span {
      //color: $text-primary;
      cursor: pointer;
    }
  }

  .getNumber {
    width: 100px;
    height: 40px;
    background: #ffffff;
  }

  .logo {
    text-align: center;

    &-head {
      // @include pxAndLh(22);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      flex-direction: column;

      img {
        display: block;
        width: 50px;
        height: 50px;
        margin-bottom: 12px;
      }
    }

    .text-color-style {
      color: #192a54;
      font-size: 24px;
      font-weight: 500;
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    text-align: center;

    &-top {
      // @include pxAndLh(14);
    }

    &-bottom {
      // @include pxAndLh(12);
    }
  }

  .bgImg {
    position: absolute;

    &-one {
      top: 98px;
      left: 176px;
    }

    &-two {
      bottom: 54px;
      left: 77px;
    }

    &-three {
      top: 71px;
      right: 274px;
    }

    &-four {
      right: 0;
      bottom: 88px;
    }
  }
}
</style>
<style scoped>
.el-button--small{
  padding: 13px 15px;
  font-size: 15px;
  border-radius: 4px;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.login_ {
  //padding-bottom: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  //height: 100%;
  //background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
  //background: #f0f3f7;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  //background: #ffffff;
  width: 400px;
  //padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: rgba(0,0,0,.45);
  font-family: Arial;
  font-size: 17px;
  letter-spacing: 1px;
}
</style>
