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
        <el-form-item prop="userAccount">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.userAccount"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPassword">
          <el-input prefix-icon="el-icon-unlock" v-model="loginForm.userPassword" type="password"></el-input>
        </el-form-item>
         <el-form-item prop="code">
          <el-input prefix-icon="el-icon-unlock" v-model="loginForm.code" style="width:280px"></el-input>
         <img src="http://pjmxkh.natappfree.cc/kyaru/user/getCode" th:src="@{/index/getCode}" @click="changeCode" id="codeImg">
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
      userData: {},
      fullscreenLoading: false,
      loginForm: {
        userAccount: "",
        userPassword: "",
        code:""
      },
      postForm: {
        userAccount: "",
        userPassword: "",
        code:""
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }
        
        ],
         code: [{ required: true, message: "请输入验证码", trigger: "blur" }
        
        ]
      }
    };
  },
  created: function(){
    // 获取后端数据后
    ///this.tableData=数据
    
   var img =  document.getElementById("codeImg")
    // 当某个操作过于频繁   地址都是一样的 浏览器就有可能出现直接从上一次的缓存中获取值
    img.src = this.api+"user/getCode?time="+ new Date().getTime();
 
        
  },
  methods: {
     changeCode(){
   var img =  document.getElementById("codeImg")
    // 当某个操作过于频繁   地址都是一样的 浏览器就有可能出现直接从上一次的缓存中获取值
    img.src = this.api+"user/getCode?time="+ new Date().getTime();
},
        
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
             this.postForm.userAccount = this.loginForm.userAccount
             this.postForm.code = this.loginForm.code
            let comValue = this.$qs.stringify(this.postForm)
                      // console.log(comValue)
           this.$http
            .post(this.api+"user/login", comValue)
            .then(res => {
             console.log(res.data.data[0].userName)
                 this.openLoading().close();
             if(res.data.code==200) {
               this.$message({
                message: "登陆成功",
                type: "success"
              });
              
                 let useri = res.data
              this.personInfo.userName = "ss"
                //  console.log(this.personInfo.userName)
              // console.log(useri.userName)
          
              this.personInfo.userName = res.data.data[0].userName
              this.personInfo.userSex = res.data.data[0].userSex
              this.personInfo.isManager = res.data.data[0].isManager
              this.personInfo.userTel = res.data.data[0].userTel
              this.personInfo.company = res.data.data[0].company
              this.personInfo.userAccount = res.data.data[0].userAccount
              this.personInfo.userId = res.data.data[0].userId
      console.log(this.personInfo)
            
              this.$message.success("登录成功！");
              this.loginForm = {
                userAccount: "",
                userPassword: "",
                code:""
              };
              this.$router.push("/home");
              }
              else if(res.data.code==500){
                 this.$message({
                message: "账号或者密码错误",
                type: "danger"
              });
              this.$refs.loginFormRef.resetFields()
              }
            })
            .catch(error => {
               this.openLoading().close();
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
  height: 360px;
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
#codeImg{
  position: absolute;
}
</style>
