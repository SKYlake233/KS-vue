<template>
  <select v-model="place_id" @change="place_change(valye,this.place_id)" style="width:200px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
    <option v-for="item in placeData" :value="item.id" :label="item.placeName"></option>
  </select>

  <select v-model="index" @change="selectChanged(value,this.index)" style="width:200px;height: 30px;margin-top: 5px;margin-bottom: 5px;margin-left: 10px">
    <option v-for="item in kindList" :value="item.name" :label="item.name"></option>
  </select>
  <!-- echarts -->
  <div id="dataBox" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
import * as echarts from "echarts"
import requests from "@/utils/requests";
import request from "@/utils/requests";
export default {
  name: "chart",
  data () {
    return {
      place_id:1,
      index:'co',
      dataTable:[],
      myChart:null,
      placeData:[],
      kindList:[{name:"so2",id:1},{name:"co",id:2},{name:"no2",id:3},{name:"pm25",id:4},{name:"temperature",id:5},{name:"humidity",id:6}]
    }
  },
  created() {
    this.load();
    this.loadData();
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    loadData(){
      request.get("/place/getData").then(res =>{this.placeData = res.data;
        console.log(res.data)})
    },
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('dataBox'));
      // 绘制图表
      this.myChart.setOption({
        title: { text: '西工区最近一周SO2变化' },
        tooltip: {},
        xAxis: {
          data: ["1","2","3","4","5","6","7"]
        },
        yAxis: {},
        series: [{
          name: 'SO2',
          type: 'line',
          data: []
        }]
      });
      console.log(this.dataTable)
    },
    load(){
      requests.get("/data/history/" + this.place_id).then(res => {this.dataTable = res.data;
        this.myChart.setOption({series: [{
            name: 'CO',
            type: 'line',
            data: this.dataTable["co"]
          }]});
      });
    },
    place_change(value,key){
      requests.get("/data/history/" + this.place_id).then(res => {this.dataTable = res.data;this.selectChanged(value, this.index)})
    },
    selectChanged(value,key){
      console.log(key);
      if(key == 'co'){
        this.myChart.setOption({series: [{
            name: 'CO',
            type: 'line',
            data: this.dataTable["co"]
          }]});
      }
      else if(key == 'so2'){
        this.myChart.setOption({series: [{
            name: 'so2',
            type: 'line',
            data: this.dataTable["so2"]
          }]});
      }
      else if(key == 'pm25'){
        this.myChart.setOption({series: [{
            name: 'pm25',
            type: 'line',
            data: this.dataTable["pm25"]
          }]});
      }
      else if(key == 'no2'){
        this.myChart.setOption({series: [{
            name: 'no2',
            type: 'line',
            data: this.dataTable["no2"]
          }]});
      }
      else if(key == 'temperature'){
        this.myChart.setOption({series: [{
            name: 'temperature',
            type: 'line',
            data: this.dataTable["temperature"]
          }]});
      }
      else if(key == 'humidity'){
        this.myChart.setOption({series: [{
            name: 'humidity',
            type: 'line',
            data: this.dataTable["humidity"]
          }]});
      }
    }
  }
}
</script>

<style scoped>

</style>