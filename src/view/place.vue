<template>

  <div style="padding: 10px">

    <div style="margin: 10px 0">
      <el-button color="#909399" @click="add">添加地点</el-button>
      <el-input v-model="search" placeholder="请输入关键字（地点名）" clearable style="width: 20%"/>
      <el-button type="success" style="margin-left: 5px" @click="load">查询</el-button>
    </div>

<!--  <el-button size="small" @click=openDialog>开始</el-button>-->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="设备id" sortable />
    <el-table-column prop="placeName" label="地点名称"  />
    <el-table-column prop="longitude" label="经度" />
    <el-table-column prop="latitude" label="纬度" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button @click="handleEdit(scope.row)"  size="small" type="primary" >修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin:10px 0">
    <div class="demo-pagination-block">
      <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      <el-dialog
          @close="clearDialog"
          :close-on-click-modal="false"
          :title="text"
          style="text-align: left"
          v-model="popup"
          width="30%"
      >
        <div class="form-layer">
          <el-form label-width="100px" size="mini">
            <el-form-item label="获取定位">
              <!--            <el-button type="primary" @click="fixedPos">重新定位</el-button>-->
              <el-button type="primary" @click="initMap">获得地图</el-button>
            </el-form-item>
            <el-form-item label="地点id">
              <el-input v-model="this.form.id" readonly="readonly"></el-input>
            </el-form-item>
            <!--          </el-form-item>-->
            <el-form-item label="地点描述">
              <el-input v-model="this.form.placeName"></el-input>
            </el-form-item>
            <el-form-item label="当前纬度">
              <p>{{this.form.latitude}}</p>
            </el-form-item>
            <el-form-item label="当前经度">
              <p>{{this.form.longitude}}</p>
            </el-form-item>
            <el-form-item>
              <div class="f-a-c">
                <el-input v-model="keyWords" placeholder="请输入地区" style="width: 230px;margin-right: 6px;"></el-input>
                <el-button type="primary" @click="setPlace" :disabled="!keyWords">查询</el-button>
              </div>
            </el-form-item>
          </el-form>
          <div style="height: 500px" id="map"></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
              size="small"
              type="primary"
              v-if="type != '2'"
              @click="save()"
          >确 认</el-button
          >
          <el-button size="small" @click="popup = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  </div>


</template>

<script>
import BMap from 'BMap'
import request from "@/utils/requests";
export default {
  name: "place",
  data(){
    return{
      search:'',
      currentPage:1,//当前页
      total:0,
      pageSize:10,//每页显示数据条数
      map:null,
      mk:null,
      keyWords:'',
      local:'',
      popup:false,
      tableData:[],
      form:{
      },

    }
  },
  created() {//加载页面时调用load
    this.load()
  },
  methods:{
    add(){
      this.popup=true;
      this.form={};
    },
    load(){//将后端查询到的数据渲染到web表格
      request.post("/place/page",{
        "pageSize":this.pageSize,
        "pageNum":this.currentPage,
        "param":{
          "marketId": this.marketId,
          "search":this.search
        }
      }).then(res => {
        this.tableData=res.data.data
        this.total=res.data.total
      })
    },
    save(){
      if(this.form.id){//如果存在此ID，更新，，，否则插入
        request.post("/place/upd",this.form).then(res=>{
          console.log(res)
          if(res.data===1){
            this.$message({
              type:"success",
              message:"修改成功"
            })}else{
            this.$message({
              type:"success",
              message:"修改失败"
            })
          }
          this.load();  //添加完成后刷新表单
          this.dialogVisible=false//关闭弹窗
        })}else{
        request.post("/place/add",this.form).then(res=>{
          console.log(res)
          if(res.data===1){
            this.$message({
              type:"success",
              message:"添加成功"
            })}else{
            this.$message({
              type:"success",
              message:"添加失败"
            })
          }
          this.load();  //添加完成后刷新表单
          this.dialogVisible=false//关闭弹窗
        })}
    },
    handleSizeChange(pageSize){//每页显示多少条数据
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(pageNum){//跳转到第几页
      this.currentPage=pageNum
      this.load()
    },
    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row))
      this.popup = true;
      this.initMap();
    },
    initMap(){
      this.map = new BMap.Map("map");
      var point = new BMap.Point(this.form.longitude,this.form.latitude);
      this.map.centerAndZoom(point, 15);
      this.map.enableScrollWheelZoom(true);
      this.map.addControl(new BMap.ScaleControl());
      this.handleMarker(this,point);
    },
    // 点击定位-定位到当前位置
    fixedPos() {
      const _this = this;
      const geolocation = new BMap.Geolocation();
      this.confirmLoading = true;
      //获得当前位置
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          _this.handleMarker(_this, r.point);
          let myGeo = new BMap.Geocoder();
          myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              function (result) {
                _this.confirmLoading = false;
                if (result) {
                  _this.form.latitude = result.point.lat;
                  _this.form.longitude = result.point.lng;
                }
              }
          );
        } else {
          _this.$message.error("failed" + this.getStatus());
        }
      });
    },
    // 搜索地址
    setPlace() {
      this.local = new BMap.LocalSearch(this.map, {
        onSearchComplete: this.searchPlace,
      });
      this.local.search(this.keyWords);
    },
    //搜索地区
    searchPlace() {
      if (this.local.getResults() != undefined) {
        this.map.clearOverlays(); //清除地图上所有覆盖物
        if (this.local.getResults().getPoi(0)) {
          let point = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
          this.map.centerAndZoom(point, 18);
          this.handleMarker(this, point);
          console.log("经度：" + point.lng + "--" + "纬度" + point.lat);
          this.latitude = point.lat;
          this.longitude = point.lng;
        } else {
          this.$message.error("未匹配到地点!");
        }
      } else {
        this.$message.error("未找到搜索结果!");
      }
    },
    // 设置标注
    handleMarker(obj, point) {
      let that = this;
      obj.mk = new BMap.Marker(point);
      obj.map.addOverlay(obj.mk);
      obj.mk.enableDragging(); // 可拖拽
      obj.mk.addEventListener("dragend", function (e) {
        // 监听标注的拖拽，获取拖拽后的经纬度
        that.form.latitude = e.point.lat;
        that.form.longitude = e.point.lng;
      });
      obj.map.panTo(point);
    },

  },
}
</script>