<template>
  <div style="padding: 10px">

    <div style="margin: 10px 0">

    </div>

    <div style="margin: 10px 0">
      <el-button color="#909399" @click="add">添加新设备</el-button>
      <el-input v-model="search" placeholder="请输入关键字（设备型号名）" clearable style="width: 20%"/>
      <el-button type="success" style="margin-left: 5px" @click="load">查询</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="设备id" sortable />
      <el-table-column prop="deviceName" label="设备型号名"  />
      <el-table-column prop="manufacturer" label="设备厂商" />
      <el-table-column prop="deviceLife" label="设备使用年限" />
      <el-table-column prop="deviceLeft" label="商品剩余个数" />
      <el-table-column prop="temperature" label="温度"/>
      <el-table-column prop="humidity" label="湿度"/>
      <el-table-column prop="pm25" label="pm25"/>
      <el-table-column prop="co" label="co"/>
      <el-table-column prop="no2" label="no2"/>
      <el-table-column prop="so2" label="so2"/>
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
<!--        弹窗  Dialog-->
        <el-dialog v-model="dialogVisible" title="提示" width="30%">
          <!--  添加数据的弹窗      -->
          <el-form model="form" label-width="120px">
            <el-form-item label="设备id">
              <el-input v-model="form.id" readonly="readonly" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-input v-model="form.deviceName"  style="width: 80%"/>
            </el-form-item>
            <el-form-item label="设备厂商">
              <el-input v-model="form.manufacturer" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="使用年限">
              <el-input v-model="form.deviceLife" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="form.deviceLeft" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="温度">
              <el-input v-model="form.temperature" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="湿度">
              <el-input v-model="form.humidity" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="pm2.5">
              <el-input v-model="form.pm25" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="co">
              <el-input v-model="form.co" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="no2">
              <el-input v-model="form.no2" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="so2">
              <el-input v-model="form.so2" style="width: 80%"/>
            </el-form-item>
          </el-form>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>


import request from "@/utils/requests";

export default {
  name: 'device',
  components: {
  },
  data(){
    return{
      form:{},
      dialogVisible:false,
      search:'',
      currentPage:1,//当前页
      total:0,
      pageSize:10,//每页显示数据条数
      tableData:[
      ]
    }

  },
  created() {//加载页面时调用load
    this.load()
  },
  methods:{
    add(){
      this.dialogVisible=true;
      this.form={};
    },
    handleEdit(row){//编辑
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
    },
    load(){//将后端查询到的数据渲染到web表格
      request.post("/device/page",{
        "pageSize":this.pageSize,
        "pageNum":this.currentPage,
        "param":{
          "marketId": this.marketId,
          "search":this.search
        }
      }).then(res => {
        console.log(res)
        this.tableData=res.data.data
        this.total=res.data.total
      })
    },
    handleSizeChange(pageSize){//每页显示多少条数据
      this.pageSize=pageSize
      this.load()
    },
    save(){
      if(this.form.id){//如果存在此ID，更新，，，否则插入
        request.post("/device/upd",this.form).then(res=>{
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
        request.post("/device/add",this.form).then(res=>{
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
    handleCurrentChange(pageNum){//跳转到第几页
      this.currentPage=pageNum
      this.load()
    }


  }}
</script>