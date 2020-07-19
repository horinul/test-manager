<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员相关</el-breadcrumb-item>
      <el-breadcrumb-item>客户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框区 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="addDialogVisible=true">添加信息</el-button>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="tableData" border :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="user_name" label="姓名"></el-table-column>
        <el-table-column prop="user_sex" label="性别"></el-table-column>
        <el-table-column prop="user_tel" label="联系电话"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column label="操作" width="130">
          <template>
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <div class="block">
        <!-- size-change在切换分页（如100页为一格）的时候触发，current-change在只要换页的时候就会触发 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加信息对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="changeForm" :rules="FormRules" ref="changeFormRef" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.user_sex"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addForm.user_tel"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="cname">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="changeForm" :rules="FormRules" ref="changeFormRef" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.user_sex"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addForm.user_tel"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="cname">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeData" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          user_name: "11",
          user_sex: "male",
          user_tel: "11233",
          company: "bat"
        },
        {
          user_name: "11",
          user_sex: "male",
          user_tel: "11233",
          company: "bat"
        }
      ],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 24,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: "",
        sex: "",
        phone: "",
        cname: ""
      },
      changeForm: {
        name: "",
        sex: "",
        phone: "",
        cname: ""
      },
      // 添加用户表单的验证规则对象
      FormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        cname: [{ required: true, message: "请输入公司名", trigger: "blur" }]
      },
      editDialogVisible: false
    };
  },
  created() {
    this.total = this.tableData.length;
  },
  methods: {
    async getUserList() {
      this.userlist = this.tableData;
    },
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addData() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } else {
          this.addDialogVisible = false;
          this.tableData.push(Object.assign({}, this.addForm));
          this.addDialogClosed();
        }
      });
    },
    changeData() {},
    // 展示编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true;
    }
  }
};
</script>

<style lang='less' scoped>
</style>
