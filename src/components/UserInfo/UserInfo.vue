<template>
  <div>
    <el-page-header @back="goBack" content="个人信息"></el-page-header>
    <el-row type="flex" style="margin-top:20px">
      <el-col :span="1">
        <el-avatar :src="imgUrl"></el-avatar>
      </el-col>
      <el-col :span="10">
        <el-input placeholder="请输入姓名" v-model="name">
          <template slot="prepend">姓名</template>
        </el-input>
        <br />
        <el-input placeholder="请输入性别" v-model="sex">
          <template slot="prepend">性别</template>
        </el-input>
        <br />
        <el-input placeholder="请输入联系电话" v-model="phone">
          <template slot="prepend">联系电话</template>
        </el-input>
        <br />
        <el-input placeholder="请输入公司名字" v-model="Cname">
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
      name: "11",
      sex: "male",
      phone: "11233",
      Cname: "bat",
      imgUrl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    name(newName, oldName) {
        // 这个位置就是个人信息修改后监听的位置
        // console.log(newName)就会在控制台打印出
    },
    sex(newSex,oldSex){

    },
    phone(newPhone,oldPhone){

    },
    Cname(newCname,oldCname){

    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 330px;
}
</style>




