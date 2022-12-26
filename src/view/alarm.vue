<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(list,index) in noticeData" :key="index" >
      <template v-slot:title>
        <span v-if="list.isRead == 0">[未读]</span>
        <span v-if="list.isRead == 1" class="actived">[已读]</span>

        <b @click="noticeActive(list.id,list.isRead)">预警信息</b></template>

      <div>{{list.dataIndex}}</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import requests from "@/utils/requests";

export default {
  name: "alarm",
  data(){
    return{
      noticeData:[],//系统通知数据
    }
  },
  created() {
    this.load();
  },
  methods:{
    load(){
      requests.get("/data/alarmData").then(res => {this.noticeData = res.data})
    },
    noticeActive(id , status){
      if(status == 0){
        requests.post("/data/modifyAlarm",{"id":id}).then(res => {this.$message({type:"success",message:"消息已读"});this.load()})
      }

    },
  },
}
</script>

<style scoped>
.el-collapse{border:none;}
.el-collapse div:last-child > div div{border:none;}
.el-collapse-item__header{position:relative;font-size:16px;justify-content:space-between;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.el-collapse-item__header b{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:normal;}
.is-active b{padding-left:20px;transition:all .5s;}
.el-collapse-item__header .time{position:absolute;right:30px;font-size:14px;}
.el-icon-alarm-clock:before{margin-right:10px;}
.el-collapse-item__header span{font-size:12px;color:brown;margin-right:10px;}
.el-collapse-item__header span.actived{color:#666;}
.el-collapse-item__content{font-size:14px;line-height:26px;padding:30px 20px;color:#666;background:#f8f8f8;}
</style>