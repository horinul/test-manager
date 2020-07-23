<template>
  <div class="login_container">
    <div class="login_box">
      <h1 class="regiser_title">个人信息修改</h1>

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
        <el-form-item label="电话" prop="userTel" style="width:350px">
          <el-input v-model="loginForm.userTel"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company" style="width:350px">
          <el-input v-model="loginForm.company"></el-input>
        </el-form-item>

        <!-- 按钮区 -->

        <el-button type="primary" class="sumbtn" plain @click="login">确定</el-button>
        <el-form-item class="btns">
          <el-button type="text" plain style="margin-right:20px" @click="resetLoginForm">返回</el-button>
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
        userName: "",
        userSex: "",
        userTel: "",
        company: "",
       
      },
      postForm: {
        userId:"",
        userName: "",
        userSex: "",
        userTel: "",
        company: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入您的姓名", trigger: "blur" }
        ],
        userTel: [
          { required: true, message: "请输入您的电话号码", trigger: "blur" }
        ],

        company: [
          { required: true, message: "请输入您的所在公司名", trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择身份", trigger: "blur" }]
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$router.go(-1);
    },
    login() {
       // console.log(this.loginForm)
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } 
         else {
          this.openLoading();
         // console.log(this.loginForm);
         this.postForm.userName = this.loginForm.userName;      
         this.postForm.userSex = this.loginForm.userSex;
         this.postForm.userTel = this.loginForm.userTel;  
         this.postForm.company = this.loginForm.company;   
         this.postForm.userId = this.personInfo.userId        
            let comValue = this.$qs.stringify(this.postForm)
                        console.log(comValue);
          this.$http
            .post(this.api + "user/update", comValue)
            .then(res => {
              this.openLoading().close();
              this.personInfo.userName = this.postForm.userName;      
         this.personInfo.userSex = this.postForm.userSex;
         this.personInfo.userTel = this.postForm.userTel;  
         this.personInfo.company = this.postForm.company;   
       
             
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.loginForm = {
                userName: "",           
                userSex: "",
                userTel: "",
                company: "",        
               
              };
              this.$router.go(-1);;
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
  background-color: rgb(245, 245, 245);
  height: 100%;
}
.login_box {
  width: 450px;
  height: 400px;
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
.regiser_title {
  text-align: center;
  opacity: 0.6;
}
.el-form {
  margin-bottom: 15px;
}
.sumbtn {
  position: absolute;
  width: 230px;
  margin: 0 88px auto;
}
</style>
