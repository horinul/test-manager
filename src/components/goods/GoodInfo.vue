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
        <el-table-column prop="goodsName" label="商品名字"></el-table-column>
        <el-table-column prop="goodsCount" label="数量"></el-table-column>
        <el-table-column prop="inboundTime" label="入库时间"></el-table-column>
        <el-table-column prop="goodsId" label="库存编码"></el-table-column>
        <el-table-column prop="company" label="公司姓名"></el-table-column>
        <el-table-column prop="checkSituation" label="验收情况"></el-table-column>

        <!-- <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog()"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteData(scope)"></el-button>
            <!-- 分配角色 -->
            <!-- <el-tooltip effect="dark" content="购买信息" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>-->
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
        <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商品名字" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goodsCount">
          <el-input v-model="addForm.goodsCount"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="inboundTime">
          <el-input v-model="addForm.inboundTime"></el-input>
        </el-form-item>
        <el-form-item label="库存编码" prop="goodsId">
          <el-input v-model="addForm.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="company">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>
        <el-form-item label="验收情况" prop="checkSituation">
          <el-input v-model="addForm.checkSituation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商品名字" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goodsCount">
          <el-input v-model="addForm.goodsCount"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" prop="inboundTime">
          <el-input v-model="addForm.inboundTime"></el-input>
        </el-form-item>
        <el-form-item label="库存编码" prop="goodsId">
          <el-input v-model="addForm.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="company">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>
        <el-form-item label="验收情况" prop="checkSituation">
          <el-input v-model="addForm.checkSituation"></el-input>
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
          goodsName: "qq",
          goodsCount: "ww",
          inboundTime: "ee",
          goodsId: "rr",
          company: "tt",
          checkSituation: "yy"
        },
        {
          goodsName: "qq",
          goodsCount: "ww",
          inboundTime: "ee",
          goodsId: "rr",
          company: "tt",
          checkSituation: "yy"
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
        goodsName: "",
        goodsCount: "",
        inboundTime: "",
        goodsId: "",
        company: "",
        checkSituation: ""
      },
      changeForm: {
        goodsName: "",
        goodsCount: "",
        inboundTime: "",
        goodsId: "",
        company: "",
        checkSituation: ""
      },
     
     
     rules: {
        goodsName: [
          { required: true, message: "请输入商品名字", trigger: "blur" }
        ],
        goodsCount: [
          { required: true, message: "请输入数量", trigger: "blur" }
        ],
        inboundTime: [
          { required: true, message: "请输入入库时间", trigger: "blur" }
        ],
        goodsId: [
          { required: true, message: "请输入库存编码", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请输入公司姓名", trigger: "blur" }
        ],
        checkSituation: [
          { required: true, message: "请输入验收情况", trigger: "blur" }
        ]
      },
      editDialogVisible: false
    }

  
  },





  created() {
    // 获取后端数据后
    ///this.tableData=数据
    fetch();
    this.total = this.tableData.length;
  },
  methods: {
    async getUserList() {
      this.userlist = this.tableData;
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize);
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
        console.log(valid)
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } 
      else {
          this.addDialogVisible = false;
          this.tableData.push(Object.assign({}, this.addForm));
          this.addDialogClosed();


          //向前端发送数据 @rk---
          //console.log(this.addForm)
          this.$http.post("/commodity/update", this.addForm).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.addForm = {
           goodsName: "",
           goodsCount: "",
           inboundTime: "",
           goodsId: "",
           company: "",
        checkSituation: ""
          };
          this.fetch();
        }).catch(error=>{
                        console.log(error);
                    });
        }
      });
    },
    


    //向后端申请数据 @rk---
    // {
    //       goodsName: "",
    //       goodsCount: "",
    //       inboundTime: "",
    //       goodsId: "",
    //       company: "",
    //       checkSituation: ""
    //     },
    fetch() {
      this.$http.get("/commodity/getAll").then(res => {
        this.tableData= res.data;
        
      });
    },

    //修改信息  @rk---
    changeUser() {
       this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } else {
          this.addDialogVisible = false;
          this.tableData.push(Object.assign({}, this.addForm));
          this.addDialogClosed();


          //向前端发送数据 @rk---
          //console.log(this.addForm)
          this.$http.post("/commodity/update", this.addForm).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.addForm = {
           goodsName: "",
           goodsCount: "",
           inboundTime: "",
           goodsId: "",
           company: "",
        checkSituation: ""
          };
          this.fetch();
        }).catch(error=>{
                        console.log(error);
                    });
        }
      });

    },
    // 展示编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true;
    },

    //出库操作 @rk---
    deleteData(scope) {      
      //console.log("index的值是：",scope.$index)
      this.tableData.splice(scope.$index, 1)
      //console.log("出库的货物编码:",scope.row.goodsId)
    }
  }
};
</script>

<style lang='less' scoped>
</style>
