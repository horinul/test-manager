<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/snow.png" alt class="logo" />
        <span class="title">仓库管理系统</span>
      </div>
      <div>
      <el-button @click="logout">退出登录</el-button>
      <el-button @click="personMessage">个人信息</el-button></div>
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
              <el-menu-item index="users" @click="saveNavState('users')">
                <i class="el-icon-menu"></i>
                <span>库存信息</span>
              </el-menu-item>
              <el-menu-item index="users" @click="saveNavState('users')">
                <i class="el-icon-menu"></i>
                <span>入库信息</span>
              </el-menu-item>
              <el-menu-item index="users" @click="saveNavState('users')">
                <i class="el-icon-menu"></i>
                <span>出库信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title" >
              <i class="el-icon-tickets"></i>
              <span>客户相关</span>
            </template>
            <el-menu-item-group>
                <!-- roles -->
              <el-menu-item index="users"  @click="saveNavState('users')">
                <i class="el-icon-menu"></i>
                <span>客户列表</span>
              </el-menu-item>
              <!-- permission -->
              <el-menu-item index="users"  @click="saveNavState('users')">
                <i class="el-icon-menu"></i>
                <span>客户购买信息</span>
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
      fold1: '< | |',
      fold2: '| | >',
      fold: '< | |',
      // 是否折叠
      collapse: false,
      // 当前被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      this.$router.push('/login')
    },
    toggleCollapse() { // 点击按钮实现菜单的折叠和展开
      this.collapse = !this.collapse
      this.fold = this.fold === this.fold1 ? this.fold2 : this.fold1
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    },
    personMessage() {
      this.$router.push('/personMessage')
    }
  }
}
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
