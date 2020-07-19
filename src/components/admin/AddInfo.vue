<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>货物相关</el-breadcrumb-item>
      <el-breadcrumb-item>库存信息</el-breadcrumb-item>
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
        <el-table-column prop="goods" label="商品名字"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="time" label="入库时间"></el-table-column>
        <el-table-column prop="id" label="库存编码"></el-table-column>
        <el-table-column prop="cname" label="公司姓名"></el-table-column>
        <el-table-column prop="state" label="验收情况"></el-table-column>

        <!-- <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="130">
          <template>
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteData()"></el-button>
            <!-- 分配角色 -->
            <!-- <el-tooltip effect="dark" content="购买信息" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip> -->
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
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="商品名字" prop="goods">
          <el-input v-model="addForm.goods"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="addForm.count"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="库存编码" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="cname">
          <el-input v-model="addForm.cname"></el-input>
        </el-form-item>
        <el-form-item label="验收情况" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="changeForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="商品名字" prop="goods">
          <el-input v-model="addForm.goods"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="addForm.count"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="time">
          <el-input v-model="addForm.time"></el-input>
        </el-form-item>
        <el-form-item label="库存编码" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="cname">
          <el-input v-model="addForm.cname"></el-input>
        </el-form-item>
        <el-form-item label="验收情况" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUser" :plain="true">确 定</el-button>
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
          goods: "矿泉水",
          count: 110,
          time: "2020/2/21",
          id: "daskksal56",
          cname: "bat",
          state: "待审核"
        },
        {
          goods: "矿泉水",
          count: 110,
          time: "2020/2/21",
          id: "daskksal56",
          cname: "bat",
          state: "待审核"
        }
      ],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        goods: "",
        count: '',
        time: "",
        id: "",
        cname: "",
        state: ""
      },
      changeForm: {
        goods: "",
        count: '',
        time: "",
        id: "",
        cname: "",
        state: ""
      },
      addFormRules: {
        goods: [{ required: true, message: "请输入商品名字", trigger: "blur" }],
        count: [{ required: true, message: "请输入数量", trigger: "blur" }],
        time: [{ required: true, message: "请输入入库时间", trigger: "blur" }],
        id: [{ required: true, message: "请输入库存编码", trigger: "blur" }],
        cname: [{ required: true, message: "请输入公司姓名", trigger: "blur" }],
        state: [{ required: true, message: "请输入验收情况", trigger: "blur" }]
      },
      editDialogVisible: false
    };
  },
  created(){
      this.total=this.tableData.length;
  },
  methods: {
    async getUserList() {
      this.userlist = this.tableData;
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      // 案例中是根据当前页面需要的数据数量来发起请求
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    // 监听添加用户表单的关闭事件并清除其中的数据
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确认按钮的事件
    // 这个位置有bug，在教程中是直接把数据交到后端，再重新拿数据渲染
    // 但此处加入tableData的数据和addForm绑定死了，分不开，在加入数据了之后
    // 清除表单里的数据还是会把已经加入界面里的删掉，就算不清除表单里的数据，加入表格里的也会每个数据都一模一样
    // 解决方案：Object.assign({}, this.addForm)需要深拷贝
    addUser() {
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
    changeUser() {},
    // 展示编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true;
    },
    deleteDate(){}
  }
};
</script>

<style lang='less' scoped>
</style>
