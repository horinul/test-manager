<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>客户相关</el-breadcrumb-item>
      <el-breadcrumb-item>申请情况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%; border-radius: 10px;box-shadow: 0 3px 6px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        :row-class-name="tableRowClassName"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="goodsName" label="商品名字" width="180"></el-table-column>
        <el-table-column prop="goodsCount" label="商品数量" sortable width="180"></el-table-column>
        <el-table-column prop="goodsId" label="商品编码" sortable width="230"></el-table-column>
        <el-table-column prop="userPs" label="备注" sortable width="230"></el-table-column>
        <el-table-column prop="check" label="申请状态" :formatter="formatter"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style>
.el-table {
  font-size: 18px !important;
  font-weight: 800;
}
.el-table .warning-row {
  background: rgb(214, 68, 68);
  color: #505050;
}

.el-table .success-row {
  background: rgb(113, 184, 77);
  color: #505050;
}
.el-table .audit-row {
  background: rgb(230, 172, 86);
  color: #505050;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          inboundTime: "",
          goodsName: "",
          goodsCount: "",
          goodsId: "",
          userId:"",
          check: "",
          checkSituation: ""
        }
      ]
    };
  },
  created() {
      this.openLoading()
      let usersid = {
        userId:""
      }
      usersid.userId = this.personInfo.userId
       let postId = this.$qs.stringify(usersid)
       console.log(postId)
    this.$http.post(this.api + "apply/getAll",postId).then(res => {
      // this.tableData= res.data.data;
        this.openLoading().close()
      var jsonObj = JSON.parse(JSON.stringify(res.data.data));
      for (var i = 0; i < jsonObj.length; i++) {
        if(jsonObj[i].checkSituation == 0) {
          jsonObj[i].check = "审核中"
        }
        else if(jsonObj[i].checkSituation == 1){
jsonObj[i].check = "通过"
        }
        else{
          jsonObj[i].check = "未通过"
        }
      }
      console.log(jsonObj);
      this.tableData = jsonObj;
    });
  },
  methods: {
    formatter(row, column) {
      return row.check;
    },
    tableRowClassName({ row, goodsCount }) {
      if (row.checkSituation == 2) {
        return "warning-row";
      } else if (row.checkSituation == 1) {
        return "success-row";
      } else {
        return "audit-row";
      }
      return "";
    }
  }
};
</script>