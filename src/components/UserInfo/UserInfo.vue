<template>
  <div>
    <el-page-header @back="goBack" content="个人信息"></el-page-header>
    <el-row type="flex" style="margin-top:20px">
      <el-col :span="1">
        <el-avatar :src="imgUrl"></el-avatar>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入姓名" v-model="user_name">
          <template slot="prepend">姓名</template>
        </el-input>
        <br />
        <el-input placeholder="请输入性别" v-model="user_sex">
          <template slot="prepend">性别</template>
        </el-input>
        <br />
        <el-input placeholder="请输入联系电话" v-model="user_tel">
          <template slot="prepend">联系电话</template>
        </el-input>
        <br />
        <el-input placeholder="请输入公司名字" v-model="company">
          <template slot="prepend">公司名字</template>
        </el-input>
        <br />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_name: "11",
      user_sex: "male",
      user_tel: "11233",
      company: "bat",
      imgUrl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    user_name(newName, oldName) {
        // 这个位置就是个人信息修改后监听的位置
        // console.log(newName)就会在控制台打印出
    },
    user_sex(newSex,oldSex){

    },
    user_tel(newPhone,oldPhone){

    },
    company(newCname,oldCname){

    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 330px;
}
</style>




