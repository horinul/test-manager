<template>
  <div class="login_container">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login_box">
      <h1 class="regiser_title">欢迎注册</h1>

      <el-form
        ref="loginFormRef"
        label-width="90px"
        class="login_form"
        :model="loginForm"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="userName" style="width:350px">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-radio v-model="loginForm.userSex" label="0">男</el-radio>
          <el-radio v-model="loginForm.userSex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="身份" prop="isManager">
          <el-radio v-model="loginForm.isManager" label="0">客户</el-radio>
          <el-radio v-model="loginForm.isManager" label="1">管理员</el-radio>
        </el-form-item>
        <el-form-item label="电话" prop="userTel" style="width:350px">
          <el-input v-model="loginForm.userTel" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company" style="width:350px">
          <el-input v-model="loginForm.company"></el-input>
        </el-form-item>
        <el-form-item label="设置账号" prop="userAccount" style="width:350px">
          <el-input v-model="loginForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" prop="userPassword1" style="width:350px">
          <el-input
            v-model="loginForm.userPassword1"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次确认" prop="userPassword2" style="width:350px">
          <el-input
            v-model="loginForm.userPassword2"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按钮区 -->

        <el-button type="primary" class="sumbtn" plain @click="login"
          >确定</el-button
        >
        <el-form-item class="btns">
          <el-button type="text" plain @click="resetLoginForm"
            >返回登陆界面</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      loginForm: {
        userSex: "",
        userAccount: "",
        userName: "",
        company: "",
        isManager: "",
        isManager: "",
        userTel: "",
        userAccount: "",
        userPassword1: "",
        userPassword2: "",
      },
      postForm: {
        userName: "",
        userSex: "",
        userAccount: "",
        company: "",
        userPassword: "",
        isManager: "",
        userTel: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
        ],
        userTel: [
          { required: true, message: "请输入您的电话号码", trigger: "blur" },
        ],
        userAccount: [
          { required: true, message: "请输入您想要的用户名", trigger: "blur" },
        ],
        company: [
          { required: true, message: "请输入您的所在公司名", trigger: "blur" },
        ],
        userPassword1: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码过短", trigger: "blur" },
        ],
        userPassword2: [
          {
            required: true,
            message: "请再次输入密码进行确实",
            trigger: "blur",
          },
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        isManager: [{ required: true, message: "请选择身份", trigger: "blur" }],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$router.push("/login");
    },
    login() {
      // console.log(this.loginForm)
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } else if (
          this.loginForm.userPassword1 !== this.loginForm.userPassword2
        ) {
          this.$message("密码不匹配,请重新输入密码");
        } else {
          this.openLoading();
          // console.log(this.loginForm);
          let psw = this.$md5(this.loginForm.userPassword1);
          let psw_pro = this.$md5(psw);
          this.postForm.userName = this.loginForm.userName;
          this.postForm.userSex = this.loginForm.userSex;
          this.postForm.isManager = this.loginForm.isManager;
          this.postForm.userTel = this.loginForm.userTel;
          this.postForm.company = this.loginForm.company;
          this.postForm.userAccount = this.loginForm.userAccount;
          this.postForm.userPassword = psw_pro;
          //let comValue = JSON.stringify(this.postForm)
          let comValue = this.$qs.stringify(this.postForm);
          console.log(comValue);
          console.log(this.api + "user/insertAll" + comValue);
          this.$http
            .post(this.api + "user/insertAll", comValue)
            .then((res) => {
              if (res.data.code == 500) {
                this.openLoading().close();
                this.$message({
                  message: "账号已存在",
                  type: "danger",
                });
              } else {
                console.log(res);
                this.openLoading().close();
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.loginForm = {
                  userName: "",
                  userSex: "",
                  isManager: "",
                  userTel: "",
                  company: "",
                  userAccount: "",
                  company: "",
                  userPassword1: "",
                  userPassword2: "",
                };
                this.$router.push("/login");
              }
            })
            .catch((error) => {
              // console.log(error);
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 770px;
}
.login_box {
  width: 450px;
  height: 650px;
  background-color: #fff;
  border-radius: 9px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  border: 1px solid #eee;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
.login_form {
  position: absolute;
  bottom: -15px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.regiser_title {
  text-align: center;
  opacity: 0.6;
  line-height: 30px;
}
.el-form {
  margin-bottom: 15px;
}
.sumbtn {
  position: absolute;
  width: 230px;
  margin: 0 88px auto;
  bottom: 32px;
}
</style>