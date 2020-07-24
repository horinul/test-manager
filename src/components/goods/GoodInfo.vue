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
          <!-- <el-input placeholder="请输入内容" v-model="search"
                       @input="submitFun"
                       ref='searchInput' class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->

              <el-input placeholder="请输入商品名或者库存编码"
                       v-model="search"
                       @input="submitFun"
                       ref='searchInput'></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" plain @click="addDialogVisible=true">入库操作</el-button>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table :data="searchData" border :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goodsName" label="商品名字"></el-table-column>
        <el-table-column prop="goodsCount" label="数量"></el-table-column>
        <el-table-column prop="goodsId" label="库存编码"></el-table-column>
        <el-table-column prop="company" label="公司"></el-table-column>
        


        <!-- <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope)"></el-button>
            <!-- 删除 -->
            <!-- <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteData(scope)"></el-button> -->
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
    <el-dialog title="添加库存" :visible.sync="addDialogVisible" width="30%">
        <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商品名字" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goodsCount">
          <el-input v-model="addForm.goodsCount"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="company">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>

   
 
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改信息对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editForm" :rules="rules" ref="addFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商品名字" prop="goodsName">
          <el-input v-model="editForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goodsCount">
          <el-input v-model="editForm.goodsCount"></el-input>
        </el-form-item>
        <el-form-item label="公司姓名" prop="company">
          <el-input v-model="editForm.company"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" >
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
       imageUrl: '',
       search:'',
      searchData:'',
      tableData: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 15
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
     editDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        goodsName: "",
        goodsCount: "",
        company: "",
      },
       postForm:{
        goodsName: "",
        goodsCount: "",
        company: "",
    },
        editForm: {
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
     postchangeForm:{
        goodsName: "",
        goodsCount: "",
        company: "",
        goodsId: "",
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
      
    }
  
  },
  created: function(){
    // 获取后端数据后
    ///this.tableData=数据
    
     this.fetch();
    //  console.log(this.tableData)
      this.total = this.tableData.length;
        
  },
  methods: {
     
    fetch() {
      this.openLoading()
          this.$http.get(this.api+"commodity/getAll").then(res => {
              this.openLoading().close()
         // this.openLoading().close()
       //console.log(res.data.data)
       this.tableData= res.data.data;
        // console.log(this.tableData)
this.searchData= this.tableData
      });
    },
    async getUserList() {
      this.userlist = this.tableData;
    },
    //查询功能
    inintData(){
      this.searchData=this.tableData
    },
      submitFun(){
       let search = this.search;
            this.searchData = this.tableData.filter(function (tabledatas) {
               // console.log('过滤', tabledatas);
                let searchField = { goodsName: tabledatas.goodsName };
                return Object.keys(searchField).some(function (key) {
                //    console.log('key值', key);
                    return String(tabledatas[key]).toLowerCase().indexOf(search) > -1;
                });
            })
        

      
    },
    //  监听pagesize改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize);
      this.queryInfo.pagesize = newSize;
      // 案例中是根据当前页面需要的数据数量来发起请求
      //this.getUserList();
      this.handleCurrentChange(this.queryInfo.pagenum)
    },
    // 监听页码值改变的事件
    handleCurrentChange(currentPage) {
      //console.log(newPage);
      this.queryInfo.pagenum = currentPage;
      this.currentChangePage(this.tableData,currentPage)
    },
     currentChangePage(list,currentPage) { 
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
    // addDialogClosed() {
    //   this.$refs.addFormRef.resetFields();
    // },
    editDialogClosed(){
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
        } 
      else {
          this.addDialogVisible = false;
       
          //this.inintData()
          //let company
          this.postForm.goodsName = this.addForm.goodsName;
            this.postForm.goodsCount = this.addForm.goodsCount;
            this.postForm.company = this.addForm.company;
               this.addForm = {
           goodsName: "",
           goodsCount: "",   
           company: "",
          };
            
          var addValue = this.$qs.stringify(this.postForm)
          console.log(addValue)
        //  this.addDialogClosed();
          //向前端发送数据 @rk---
          //console.log(this.postForm)
       this.$http
          .post(this.api + "commodity/add", addValue)
          .then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
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
    
    //修改信息  @rk---
    changeUser() {
       this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message("请填写完整信息");
          this.editDialogClosed();
        } else {
           this.editDialogVisible = false;
            //console.log(this.editForm)
          this.inintData()
          //this.tableData.push(Object.assign({}, this.editForm));
          
          
            this.postchangeForm.goodsName = this.editForm.goodsName;
             this.postchangeForm.goodsCount = this.editForm.goodsCount;
              this.postchangeForm.company = this.editForm.company;
               this.postchangeForm.goodsId = this.editForm.goodsId;
                this.editDialogClosed();
           let comValue = this.$qs.stringify(this.postchangeForm)
          //向前端发送数据 @rk---
         
          this.$http.post(this.api + "commodity/add", comValue).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          console.log(res)
          this.editForm = {
           goodsName: "",
           goodsCount: "",
           inboundTime: "",
           goodsId: "",
           company: "",
        checkSituation: ""
          };
          // this.fetch();
        }).catch(error=>{
                        console.log(error);
                    });
        }
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(scope) {
      this.editDialogVisible = true;
      this.editForm=scope.row;
    },
    //出库操作 @rk---
    deleteData(scope) {      
      //console.log("index的值是：",scope.$index)
      
      this.tableData.splice(scope.$index, 1)
      this.inintData()
      //console.log("出库的货物编码:",scope.row.goodsId)
                                                   //返回商品编码，后端根据goodsId进行相关处理    将该商品从商品展示的数据库中删除并保存到出库记录数据库中
       this.$http.post("deleteByid", scope.row.goodsId).then(res => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.fetch();
        }).catch(error=>{
                        console.log(error);
                    });
    }
  }
};
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>