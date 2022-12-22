<template>
  <div class="first">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="longitude" label="经度"  />
      <el-table-column prop="latitude" label="维度" />
      <el-table-column prop="placeName" label="监测点名称" />
      <el-table-column prop="temperature" label="温度"/>
      <el-table-column prop="humidity" label="湿度"/>
      <el-table-column prop="pm25" label="pm25"/>
      <el-table-column prop="co" label="co"/>
      <el-table-column prop="no2" label="no2"/>
      <el-table-column prop="so2" label="so2"/>
      </el-table>
  </div>
  <div class="second">
    <div style="height: 1000px;" id = "bdMap"></div>
  </div>
</template>

<script>
import requests from "@/utils/requests";
import BMap from 'BMap'
export default {
  name: "dataview",
  data(){
    return{
      tableData:[],
      map: '',
    }
  },
  created() {
    this.load();
  },
  mounted() {
    //最后需要在mounted钩子里面调一次你自己定义的方法
    this.myMap();
  },
  methods:{
    load(){
      requests.get("/data/latestData").then(res => {
        this.tableData = res.data;
        this.showMarker();
      })
    },
    mark(points,infoWindows){
      var myIcon = new BMap.Icon('location.ico',new BMap.Size(32,32));
      const markers = new BMap.Marker(points, myIcon);
      this.map.addOverlay(markers);

      markers.addEventListener("click",function (event) {
        this.map.openInfoWindow(infoWindows,points);//参数：窗口、点  根据点击的点出现对应的窗口
      });
    },
    showMarker(){
      for (let i = 0; i<this.tableData.length; i++){
        const point = new BMap.Point(this.tableData[i].longitude, this.tableData[i].latitude);
        const opts = {
          width: 250,
          height: 150,
          title: this.tableData[i].placeName
        };

        var res = '';
        res = res + '温度\xa0\xa0\xa0\xa0' + this.tableData[i].temperature+'  ℃' + '<br>';
        res = res + '湿度\xa0\xa0\xa0\xa0' + this.tableData[i].humidity+'  %BH' + '<br>';
        res = res + 'pm2.5\xa0\xa0\xa0\xa0' + this.tableData[i].pm25+'  Μg/m3' + '<br>';
        res = res + '一氧化碳\xa0\xa0\xa0\xa0' + this.tableData[i].co+'  Ppm' + '<br>';
        res = res + '二氧化氮\xa0\xa0\xa0\xa0' + this.tableData[i].no2+'  Μg/m³' + '<br>';
        res = res + '二氧化硫\xa0\xa0\xa0\xa0' + this.tableData[i].so2+'  Μg/m³' + '<br>';

        var infoWindows = new BMap.InfoWindow(res, opts);
        this.mark(point , infoWindows);
      }
    },
    myMap() {
      this.map = new BMap.Map("bdMap"); // 创建Map实例 注意要和你上面写的div的id名一样
      this.map.centerAndZoom(new BMap.Point(112.45, 34.62), 15); // 初始化地图,设置中心点坐标和地图级别
      this.map.setCurrentCity("洛阳");
      this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    },
  }
}
</script>

<style scoped>
.first {
  width: 50%;
  float:left;
  height: 1000px;
  border: 1px solid #3B6273;
}
.second {
  width: 50%;
  float:left;
  height: 1000px;
  border: 1px solid #3B6273;
}
</style>