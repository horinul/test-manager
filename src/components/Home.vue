<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/snow.png" alt class="logo" />
        <span class="title">仓库管理系统</span>
      </div>
      <div>
        <el-button @click="logout">退出登录</el-button>
        <el-button @click="personMessage">个人信息</el-button>
      </div>
    </el-header>

    <el-container>
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
              <i class="el-icon-user-solid"></i>
              <span>货物相关</span>
            </template>
            <el-menu-item-group>
              <!-- users -->
              <el-menu-item index="users" @click="saveNavState('goodInfo')">
                <i class="el-icon-menu"></i>
                <span>库存信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>管理员相关</span>
            </template>
            <el-menu-item-group>
              <!-- users -->
              <el-menu-item index="clientList" @click="saveNavState('clientList')">
                <i class="el-icon-menu"></i>
                <span>客户信息</span>
              </el-menu-item>
              <el-menu-item index="addInfo" @click="saveNavState('addInfo')">
                <i class="el-icon-menu"></i>
                <span>入库信息</span>
              </el-menu-item>
              <el-menu-item index="outInfo" @click="saveNavState('outInfo')">
                <i class="el-icon-menu"></i>
                <span>出库信息</span>
              </el-menu-item>
              <!-- <el-menu-item index="OutInfo" @click="saveNavState('outInfo')">
                <i class="el-icon-menu"></i>
                <span>入库操作</span>
              </el-menu-item>-->
              <el-menu-item index="clientAppli" @click="saveNavState('clientAppli')">
                <i class="el-icon-menu"></i>
                <span>客户出库申请信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>客户相关</span>
            </template>
            <el-menu-item-group>
              <!-- roles -->
              <el-menu-item index="appliOut" @click="saveNavState('appliOut')">
                <i class="el-icon-menu"></i>
                <span>申请出库</span>
              </el-menu-item>
              <!-- permission -->
              <el-menu-item index="appliState" @click="saveNavState('appliState')">
                <i class="el-icon-menu"></i>
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
      fold1: "< | |",
      fold2: "| | >",
      fold: "< | |",
      // 是否折叠
      collapse: false,
      // 当前被激活的链接地址
      activePath: ""
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    toggleCollapse() {
      // 点击按钮实现菜单的折叠和展开
      this.collapse = !this.collapse;
      // this.fold = this.fold === this.fold1 ? this.fold2 : this.fold1
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
</style>
