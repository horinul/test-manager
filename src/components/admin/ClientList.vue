<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户相关</el-breadcrumb-item>
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
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="" label="公司"></el-table-column>
        <!-- <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="180">
          <template>
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色 -->
            <el-tooltip effect="dark" content="购买信息" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
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
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emails">
          <el-input v-model="addForm.emails"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emails">
          <el-input v-model="addForm.emails"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :plain="true">确 定</el-button>
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
          name: '王11',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        },
        {
          name: '王小五',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        },
        {
          name: '王小五',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        },
        {
          name: '王小五',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        },
        {
          name: '王小五',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        },
        {
          name: '王小五',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '超级管理员',
          state: true
        },
        {
          name: '李小六',
          emails: '123456789@qq.com',
          phone: 86935642,
          status: '用户',
          state: true
        }
      ],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 24,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: '',
        emails: '',
        phone: '',
        status: '用户',
        state: true
      },
      // 添加用户表单的验证规则对象
      addFormRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        emails: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      editDialogVisible: false
    }
  },
  methods: {
    async getUserList() {
      this.userlist = this.tableData
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      // 案例中是根据当前页面需要的数据数量来发起请求
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
    },
    // 监听添加用户表单的关闭事件并清除其中的数据
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击确认按钮的事件
    // 这个位置有bug，在教程中是直接把数据交到后端，再重新拿数据渲染
    // 但此处加入tableData的数据和addForm绑定死了，分不开，在加入数据了之后
    // 清除表单里的数据还是会把已经加入界面里的删掉，就算不清除表单里的数据，加入表格里的也会每个数据都一模一样
    // 解决方案：Object.assign({}, this.addForm)需要深拷贝
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message('请填写完整信息')
          this.addDialogClosed()
        } else {
          this.addDialogVisible = false
          this.tableData.push(Object.assign({}, this.addForm))
          this.addDialogClosed()
        }
      })
    },
    // 展示编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
</style>
