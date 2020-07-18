<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="inbound_time"
      label="申请时间"
      sortable
      width="260">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名字"
      width="180">
    </el-table-column>
      <el-table-column
      prop="goods_count"
      label="商品数量"
      sortable
      width="180">
    </el-table-column>
     <el-table-column
      prop="check"
      label="申请状态"
      :formatter="formatter">
    </el-table-column>
   
  </el-table>
</template>
<style>
  .el-table .warning-row {
    background: rgb(219, 93, 71);
    color:rgb(54, 52, 52)
  }

  .el-table .success-row {
    background: #77da41;
    color:rgb(54, 52, 52)
  }
  .el-table .audit-row{
       background: #eaec53;
    color:rgb(54, 52, 52)
  }
 
</style>
<script>
  export default {
    data() {
      return {
        tableData: [{
          inbound_time: '2016-05-02',
          goods_name: '老干妈',
          goods_count: 612,
          check_situation:'0',
          check:'审核中'
        }, {
         inbound_time: '2017-05-02',
          goods_name: '干脆面',
          goods_count: 100,
          check_situation:'1',
          check: '通过'
        }, {
         inbound_time: '2018-05-02',
          goods_name: '巧克力',
          goods_count: 30,
          check_situation:'1',
          check: '通过'
        }, 
        {
         inbound_time: '2017-05-02',
          goods_name: '干脆面',
          goods_count: 100,
          check_situation:'1',
          check: '通过'
        }, {
         inbound_time: '2018-05-02',
          goods_name: '巧克力',
          goods_count: 30,
          check_situation:'1',
           check: '通过'
        },
        {
         inbound_time: '2017-05-02',
          goods_name: '干脆面',
          goods_count: 100,
          check_situation:'1',
          check: '通过'
        }, {
         inbound_time: '2018-05-02',
          goods_name: '巧克力',
          goods_count: 30,
          check_situation:'1',
          check: '通过'
        },
        {
         inbound_time: '2017-05-02',
          goods_name: '干脆面',
          goods_count: 100,
          check_situation:'1',
           check: '通过'
        }, {
         inbound_time: '2018-05-02',
          goods_name: '巧克力',
          goods_count: 30,
          check_situation:'1',
          check: '通过'
        },{
          inbound_time: '2019-05-02',
          goods_name: '伏特加',
          goods_count: 20,
          check_situation:'2',
           check: '未通过'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.check;
      },
      tableRowClassName({row, check_situation}) {
        if (row.check_situation == 2) {
          return 'warning-row';
        } else if (row.check_situation == 1) {
          return 'success-row';
        }else {
            return 'audit-row';
        }
        return '';
   }
   
   }
  }
</script>