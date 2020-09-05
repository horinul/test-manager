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
  <el-form-item label="库存编码" prop="goodsId">
    <el-input v-model="ruleForm.goodsId"></el-input>
  </el-form-item>
  <!-- <el-form-item label="出库时间" required>
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
  </el-form-item> -->

<el-form-item label="商品名" prop="goodsName">
    <el-input v-model="ruleForm.goodsName"></el-input>
  </el-form-item>
 <el-form-item label="出货数量" prop="goodsCount">
    <el-input v-model="ruleForm.goodsCount"></el-input>
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
          goodsId: '',
          depotNum: '',
          outboundTime: '',
          outboundTime1: '',
          outboundTime2: '',
          goodsCount: '',
          goodsName: '',
          userPs: ''
        },
        postForm:{
            goodsId: '',
          goodsCount: '',
          goodsName: '',
          userPs: '',
          checkSituarion: 0,
          userId: ''
        },
        rules: {
          goodsId: [
            { required: true, message: '请输入库存编码', trigger: 'blur' }
            
          ],
          outboundTime1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          outboundTime2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          goodsCount: [
            { required: true, message: '请输入出库货物数量', trigger: 'blur' }
          ],
          goodsName: [
            { required: true, message: '请输入商品名', trigger: 'blur' }
          ],
          userPs: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      
      submitForm(formName) {
  this.postForm.goodsId = this.ruleForm.goodsId
    // this.postForm.outboundTime = filter_date
    this.postForm.goodsName = this.ruleForm.goodsName
     this.postForm.goodsCount = this.ruleForm.goodsCount
      this.postForm.goodsId = this.ruleForm.goodsId
      this.postForm.userPs = this.ruleForm.userPs
      this.postForm.userId = this.personInfo.userId
      let comValue = this.$qs.stringify(this.postForm)
   // console.log( this.postForm)
      this.openLoading()
      console.log(comValue)

        this.$http.post(this.api+"/apply/insert",comValue).then(res => {
          console.log(res)
           this.openLoading().close()  
        this.ruleForm = []
          
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