<template>
 <div>

  

 <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户相关</el-breadcrumb-item>
      <el-breadcrumb-item>申请出库</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="库存编码" prop="goodsNum">
    <el-input v-model="ruleForm.goodsNum"></el-input>
  </el-form-item>
  <el-form-item label="出库仓库" prop="depotNum">
    <el-select v-model="ruleForm.depotNum" placeholder="请选择活动区域">
      <el-option label="一号仓库" value="0"></el-option>
      <el-option label="二号仓库" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="出库时间" required>
    <el-col :span="11">
      <el-form-item prop="outboundTime1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.outboundTime1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="outboundTime2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.outboundTime2"  style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>


 <el-form-item label="姓名" prop="userName">
    <el-input v-model="ruleForm.userName"></el-input>
  </el-form-item>

   <el-form-item label="电话号码" prop="userTel">
    <el-input v-model="ruleForm.userTel"></el-input>
  </el-form-item>

  <el-form-item label="备注" prop="userPs">
    <el-input type="textarea" v-model="ruleForm.userPs"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">发布申请</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
 </el-card>
</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          goodsNum: '',
          depotNum: '',
          outboundTime: '',
          outboundTime1: '',
          outboundTime2: '',
          userName: '',
          userTel: '',
          userPs: ''
        },
        postForm:{
            goodsNum: '',
          depotNum: '',
          outboundTime: '',
          userName: '',
          userTel: '',
          userPs: ''
        },
        rules: {
          goodsNum: [
            { required: true, message: '请输入库存编码', trigger: 'blur' }
            
          ],
          depotNum: [
            { required: true, message: '请选择仓库', trigger: 'change' }
          ],
          outboundTime1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          outboundTime2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          userName: [
            { required: true, message: '请输入您的姓名', trigger: 'change' }
          ],
          userTel: [
            { required: true, message: '请输入您的电话号码', trigger: 'change' }
          ],
          userPs: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      
      submitForm(formName) {
        let ymd = this.ruleForm.outboundTime1 
         var y = ymd.getFullYear()
      var m = ymd.getMonth() + 1
      var d = ymd.getDate()
             
             let hms = this.ruleForm.outboundTime2   
             var hh = hms.getHours()
        var mm = hms.getMinutes()
        var ss = hms.getSeconds()
        let filter_date = y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
//console.log(filter_date)
  this.postForm.goodsNum = this.ruleForm.goodsNum
   this.postForm.depotNum = this.ruleForm.depotNum
    this.postForm.outboundTime = filter_date
     this.postForm.userName = this.ruleForm.userName
      this.postForm.userTel = this.ruleForm.userTel
      this.postForm.userPs = this.ruleForm.userPs
   // console.log( this.postForm)
      this.openLoading()

        this.$http.post(api+"/apply/insert",this.ruleForm).then(res => {
           this.openLoading().close()
          this.resetForm()
         this.$message({
          message: " 申请成功",
           type: "success"
         });
      })
       
      },
      resetForm() {
        this.$refs[this.formName].resetFields();
         Object.keys(this.postForm).forEach(key => (this.postForm[key] = ''));
      },

    }
  }
</script>