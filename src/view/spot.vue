<template>
  <div  id = "bdMap"></div>
</template>
<script>
import BMap from 'BMap'
import requests from "@/utils/requests";


export default {
  name: "spot",
  data() {
    return {
      map: '',
      spot:[],
    }
  },
  created() {
    this.load();
  },
  mounted() {
    //最后需要在mounted钩子里面调一次你自己定义的方法
    this.myMap();

  },
  methods: {
    load(){
      requests.get("/item/mapInfo").then(res => {this.spot = res.data;this.showMarker();console.log(res.data)})

      this.showMarker();
    },
    mark(points,infoWindows){
      console.log(points);
      var myIcon = new BMap.Icon('location.ico',new BMap.Size(32,32));
      const markers = new BMap.Marker(points, myIcon);
      this.map.addOverlay(markers);

      markers.addEventListener("click",function (event) {
        this.map.openInfoWindow(infoWindows,points);//参数：窗口、点  根据点击的点出现对应的窗口
      });
    },
    getstr(data){
      console.log(data)
      var str = '';
      for (var j = 0 ; j < data.length ; j++){
          str = str + '设备id\xa0\xa0\xa0\xa0' + data[j].deviceId + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
          str = str + '设备型号\xa0\xa0\xa0\xa0' + data[j].deviceName;
          str = str + '\r\n'
      }
      return str
    },
    showMarker(){
      console.log(this.spot.length)
      for (let i = 0; i<this.spot.length; i++){
        const point = new BMap.Point(this.spot[i].longitude, this.spot[i].latitude);
        const opts = {
          width: 250,
          height: 100,
          title: this.spot[i].placeName
        };
        var res = this.getstr(this.spot[i].deviceInfo);
        var infoWindows = new BMap.InfoWindow(res, opts);
        this.mark(point , infoWindows);
      }
    },
    myMap() {
      this.map = new BMap.Map("bdMap"); // 创建Map实例 注意要和你上面写的div的id名一样
      this.map.centerAndZoom(new BMap.Point(112.45, 34.62), 12); // 初始化地图,设置中心点坐标和地图级别
      this.map.setCurrentCity("洛阳");
      this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    },
  }
}
</script>

<style>
</style>