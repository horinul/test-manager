<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item prop="userAcount">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.userAcount"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPassword">
          <el-input prefix-icon="el-icon-unlock" v-model="loginForm.userPassword" type="userPassword"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
       
          <el-button type="primary" class="sumbtn" plain @click="login">登录</el-button>
           <el-form-item class="btns">
          <el-button type="text" plain @click="resetLoginForm">注册账号</el-button>
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
        userAcount: "",
        userPassword: ""
      },
      postForm: {
        userAcount: "",
        userPassword: ""
      },
      rules: {
        userAcount: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
   
        
    resetLoginForm() {
      this.$router.push("/regist")
    },
    login() {

  
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } else { 
          this.openLoading();
             var psw = this.$md5(this.loginForm.userPassword);
             var psw_pro = this.$md5(psw)
             this.postForm.userPassword = psw_pro
             this.postForm.userAcount = this.loginForm.userAcount

           console.log(this.postForm)
           this.$http
            .post("url", this.postForm)
            .then(res => {
                 this.openLoading().close();
             if(res==0) {
               this.$message({
                message: "登陆成功",
                type: "success"
              });
              this.loginForm = {
                userAcount: "",
                userPassword: ""
              };
              this.$message.success("登录成功！");
              this.$router.push("/home");}
              else{
                 this.$message({
                message: "账号或者密码错误",
                type: "danger"
              });
              this.$refs.loginFormRef.resetFields()
              }
            })
            .catch(error => {
             // console.log(error);
            });
               
          
         }

      
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
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
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.sumbtn{
    position: absolute;
    width: 230px;
    margin: 0 88px auto

}
</style>
