<template>
  <div>
  <el-table-column prop="updateTime" label="更新时间" width="160" align="center" :formatter="dateFormat"></el-table-column>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  
  methods: {
    //时间格式化
    dateFormat:function(row,column){
        var t=new Date(row.updateTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
        return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"."+t.getMilliseconds();
    },
　　//时间格式化2
　　dataFormat2:function(row,column){
    　　var t=new Date(row.updateTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
    　　var year=t.getFullYear(),
       　　 month=t.getMonth()+1,
       　　 day=t.getDate(),
      　　  hour=t.getHours(),
      　　  min=t.getMinutes(),
      　　  sec=t.getSeconds();
  　　  var newTime=year+'-'+
      　　  (month<10?'0'+month:month)+'-'+
     　　   (day<10?'0'+day:day)+' '+
      　　  (hour<10?'0'+hour:hour)+':'+
      　　  (min<10?'0'+min:min)+':'+
      　　  (sec<10?'0'+sec:sec);
  　　  return newTime;
　　},
}
};
</script>

<style lang='less' scoped>
</style>
