<template>
 
  <el-container class="home-container">
    <el-header>
      <div>
        <img
          src="../assets/snow.png"
          style="position: relative; top:4.3px; width: 60px;height:60px;"
          alt
          class="logo"
        />
        <img
          src="../assets/logo-light-text.png"
          style="position: absolute; width: 260px;height:42px;top:10px;left: 50px;"
          alt
          class="臭鼬仓库"
        />
      </div>
       
      <div>
        <el-button @click="logout">退出登录</el-button>
        <el-button @click="drawer = true">个人信息</el-button>

     
      </div>
    </el-header>
     

    <el-container>
        <el-drawer class="infopale " :visible.sync="drawer" :with-header="true">
          
           <h1 class="infoTitle">个人信息</h1>
          <div class="el-cart box-card is-always-shadow">
      
            <ul class="userinfo-box" >
                
                   <li><p>姓名:</p> <p class="userinfo-text"> {{userData.userName}}</p></li>
                   <li><p>性别:</p><p class="userinfo-text"> {{userDis.sex}}</p> </li>
                   <li><p>身份:</p><p class="userinfo-text"> {{userDis.cor}}</p></li>
                   <li><p>公司:</p><p class="userinfo-text"> {{userData.company}}</p> </li>
                   <li><p>电话:</p><p class="userinfo-text"> {{userData.userTel}}</p> </li>
                  </ul>
                  </div>
       
           
         
           <el-button type="primary" class="sumbtn" plain @click="editInfo">修改信息</el-button>
        </el-drawer>
      <el-aside :width="collapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">{{this.fold}}</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#23A9F2"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-box"></i>
              <span>货物相关</span>
            </template>
            <el-menu-item-group>
              <!-- users -->
              <el-menu-item index="users" @click="saveNavState('goodInfo')">
                <i class="el-icon-shopping-cart-full"></i>
                <span>库存信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2" v-if="userData.isManager == 1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>管理员相关</span>
            </template>
            <el-menu-item-group>
              <!-- users -->
              <el-menu-item index="clientList" @click="saveNavState('clientList')">
                <i class="el-icon-s-custom"></i>
                <span>客户信息</span>
              </el-menu-item>
              <el-menu-item index="outInfo" @click="saveNavState('outInfo')">
                <i class="el-icon-sold-out"></i>
                <span>出库信息</span>
              </el-menu-item>
           
              <el-menu-item index="clientAppli" @click="saveNavState('clientAppli')">
                <i class="el-icon-chat-dot-square"></i>
                <span>客户出库申请信息</span>
              </el-menu-item>
             <el-menu-item index="AllGoodsInfo" @click="saveNavState('allGoodsInfo')">
                <i class="el-icon-folder-opened"></i>
                <span>所有记录</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3" v-if="userData.isManager == 0">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>客户相关</span>
            </template>
            <el-menu-item-group>
              <!-- roles -->
              <el-menu-item index="appliOut" @click="saveNavState('appliOut')">
                <i class="el-icon-sell"></i>
                <span>申请出库</span>
              </el-menu-item>
              <!-- permission -->
              <el-menu-item index="appliState" @click="saveNavState('appliState')">
                <i class="el-icon-s-order"></i>
                <span>申请状况</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </el-container>
  
</template>
<script>
export default {
  data() {
    return {
      iEdit: 0,
       drawer: false,
      visible: 0,
      fold1: " 🌦",
      fold2: "🌈",
      fold: "⛈",
      managerCheck: "",
      userData: {
        userName: "",
        userSex: "",
        isManager: "",
        userTel: "",
        company: "",
        userAccount: "",
        userPassword: "",
        userId:"0"
      },
      userDis:{
          sex:'',
          cor:''
      },
      // 是否折叠
      collapse: false,
      // 当前被激活的链接地址
      activePath: ""
    };
  },

  created() {
   
    this.fetch();
    this.changeInfo()
    this.changeM()
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {

    changeInfo(){
       if(this.userData.userSex == 0){
      this.userDis.sex = "男"
    }
    else{
      this.userDis.sex = "女"
    }
      
    },
    changeM(){
  if(this.userData.isManager == 0){
      this.userDis.cor = "用户"
    }
    else {
      this.userDis.cor = "管理员"
    }
    },
    editInfo(){
      this.drawer = false;
    this.$router.push("/userInfo");
    },
    logout() {
      this.userData = {
        userName: "",
        userSex: "",
        isManager: "",
        userTel: "",
        company: "",
        userAccount: "",
        userPassword: "",
        userId:""
      }
      this.$router.push("/login");
    },
    fetch() {
     
     this.userData = this.personInfo
      console.log(this.userData)
      // this.$http.get(this.api + "apply/insert").then(res => {
      //   // console.log(res.data)
      //   this.userData = res.data;
      // });
    },
    toggleCollapse() {
      // 点击按钮实现菜单的折叠和展开
      this.collapse = !this.collapse;
      this.fold = this.fold === this.fold1 ? this.fold2 : this.fold1;
    },
    saveNavState(activePath) {
      this.$router.push("./" + activePath);
    },
    personMessage() {
      this.$router.push("/userinfo");
    }
  }
};
</script>
<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.logo {
  height: 35px;
  width: 35px;
}
.toggle-button {
  color: #fff;
  font-size: 10px;
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  line-height: 24px;
  cursor: pointer;
}
.infopale{
  opacity: 0.8;
}
.box-card{
  
  opacity: 1 !important;
  background-color: rgb(44, 45, 59);
  border-radius: 5%;
  width: 80%;
  height: 420px;
  margin: 20px auto;
  box-shadow: 0 5px 12px 0 rgba(136, 136, 136, 0.4);
}
.userinfo-box{
  
  position: absolute;;
  list-style:none;
  top:30px;
  color: rgb(236, 236, 236);

}
.infoTitle{
  font-size: 30px;
  color:rgb(31, 31, 31);
  position: absolute;
  top:7px;
  left: 80px;
 
}
.userinfo-box>li{
  padding-top:0.5px;
  display: block;
   margin: o auto;
  position: relative;
   list-style:none;
    font-size: 17px;
  font-weight: 800;
  line-height: 3px;
  margin-top: 80px;
}
.userinfo-box>li>p{
   float:left;
   
 
}
.userinfo-text{
  
  margin-left: 20px;
}
.sumbtn {
  position: absolute;
  left:0;
  right: 0;
  width: 230px;
  margin: auto;
}
</style>
