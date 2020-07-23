<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员相关</el-breadcrumb-item>
      <el-breadcrumb-item>客户出库申请信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索框区 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- <el-input placeholder="请输入内容" v-model="search"
                       @input="submitFun"
                       ref='searchInput' class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>-->

          <el-input placeholder="请输入商品名或者公司" v-model="search" @input="submitFun" ref="searchInput">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="searchData" border :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goodsName" label="商品名字"></el-table-column>
        <el-table-column prop="goodsCount" label="数量"></el-table-column>
        <el-table-column prop="goodsId" label="库存编码"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="userTel" label="电话"></el-table-column>
        <el-table-column prop="userPs" label="备注"></el-table-column>
        <!-- <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="审核" width="130">
          <template slot-scope="scope">
            <!-- 删除 -->

            <!-- 分配角色 -->
            <el-tooltip effect="dark" content="审批" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mid"
                @click="checkDecision(scope)"
              ></el-button>
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
    <el-dialog title="审批" :visible.sync="addDialogVisible" width="20%">
      <el-form :model="checkedData" ref="addFormRef" label-width="80px" class="demo-ruleForm">
        <el-radio v-model="checkedData.checkSituation" label="1">允许</el-radio>
        <el-radio v-model="checkedData.checkSituation" label="2">拒绝</el-radio>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postForm:"",
      search: "",
      searchData: [],
      tableData: [],
      checkedData: {
        id: "",
        checkSituation: ""
      },
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 15
      },
      userlist: [],
      total: 0,
      radio: 0,
      formIndex: "",
      addDialogVisible: false,
      addForm: {
        id: "",
        checkSituation: ""
      }
    };
  },

  created: function() {
    // 获取后端数据后
    ///this.tableData=数据
    this.fetch();
    this.inintData();
    this.total = this.tableData.length;
  },
  methods: {
    async getUserList() {
      this.userlist = this.tableData;
    },
    //查询功能
    inintData() {
      this.searchData = this.tableData;
    },
    submitFun() {
      let search = this.search;
      this.searchData = this.tableData.filter(function(tabledatas) {
        let searchField = {
          goodsName: tabledatas.goodsName,
          company: tabledatas.company
        };
        return Object.keys(searchField).some(function(key) {
          return (
            String(tabledatas[key])
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      });
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize);
      this.queryInfo.pagesize = newSize;
      // 案例中是根据当前页面需要的数据数量来发起请求
      //this.getUserList();
      this.handleCurrentChange(this.queryInfo.pagenum);
    },
    // 监听页码值改变的事件
    handleCurrentChange(currentPage) {
      //console.log(newPage);
      this.queryInfo.pagenum = currentPage;
      this.currentChangePage(this.tableData, currentPage);
    },
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.queryInfo.pagesize;
      let to = currentPage * this.queryInfo.pagesize;
      this.searchData = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.searchData.push(list[from]);
        }
      }
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

    //向后端申请数据 @rk---
    // {
    //       userId: "",
    //       userSex: "",
    //       userTel: "",
    //       company: "",
    //     },
    fetch() {
       this.openLoading()
      this.$http
        .get(this.api+"/apply/getUnchecked")
        .then(res => {
          console.log(res)
           this.openLoading().close()
          this.tableData = res.data;
          this.inintData();
        });
    },
    checkDecision(scope) {
      this.addDialogVisible = true;
      this.checkedData.id = scope.row.id;
      this.formIndex = scope.$index;
    },
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.addDialogClosed();
        } else {
          this.addDialogVisible = false;
          this.addDialogClosed();
          this.inintData();
       //  console.log(this.checkedData.checkSituation)
         // console.log(this.checkedData.id)
          let comValue = this.$qs.stringify(this.checkedData)
            
          // console.log(comValue)
          this.$http
            .post(this.api +"apply/update", comValue)
            .then(res => {
                console.log(res)
              this.openLoading().close();
              this.$message({
                message: "操作成功",
                type: "success"
              });    
              this.fetch()
              
            })
            .catch(error => {
             // console.log(error);
            });
        }
      });
    },
    // @rk---
    // 展示编辑用户的对话框
    showEditDialog() {
      this.editDialogVisible = true;
    },

    //出库操作 @rk---
    deleteData(scope) {
      //console.log("index的值是：",scope.$index)

      this.tableData.splice(scope.$index, 1);
      this.inintData();
      //console.log("出库的货物编码:",scope.row.id)
      //返回用户姓名，后端根据userId进行相关处理    将该商品从商品展示的数据库中删除并保存到出库记录数据库中
      this.$http
        .post("/removeCommodity/outbound", scope.row.id)
        .then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.fetch();
        })
        .catch(error => {
       //   console.log(error);
        });
    }
  }
};
</script>

<style lang='less' scoped>
</style>
