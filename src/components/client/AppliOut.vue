<template>
 <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="库存编码" prop="goods_num">
    <el-input v-model="ruleForm.goods_num"></el-input>
  </el-form-item>
  <el-form-item label="出库仓库" prop="depot_num">
    <el-select v-model="ruleForm.depot_num" placeholder="请选择活动区域">
      <el-option label="一号仓库" value="0"></el-option>
      <el-option label="二号仓库" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="出库时间" required>
    <el-col :span="11">
      <el-form-item prop="outbound_time">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.outbound_time" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="outbound_time2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>


 <el-form-item label="姓名" prop="user_name">
    <el-input v-model="ruleForm.user_name"></el-input>
  </el-form-item>

   <el-form-item label="电话号码" prop="user_tel">
    <el-input v-model="ruleForm.user_tel"></el-input>
  </el-form-item>

  <el-form-item label="备注" prop="user_ps">
    <el-input type="textarea" v-model="ruleForm.user_ps"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">发布申请</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          goods_num: '',
          depot_num: '',
          outbound_time: '',
          outbound_time2: '',
          user_name: '',
          user_tel: '',
          user_ps: ''
        },
        rules: {
          goods_num: [
            { required: true, message: '请输入库存编码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          depot_num: [
            { required: true, message: '请选择仓库', trigger: 'change' }
          ],
          outbound_time: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          outbound_time2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          user_name: [
            { required: true, message: '请输入您的姓名', trigger: 'change' }
          ],
          user_tel: [
            { required: true, message: '请输入您的电话号码', trigger: 'change' }
          ],
          user_ps: [
            { required: false, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {


        this.$http.post("url",this.ruleForm).then(res => {
         this.$message({
          message: " 申请成功",
           type: "success"
         });
      })
       
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>