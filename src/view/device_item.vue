<template>
  <div style="padding: 10px">

    <div style="margin: 10px 0">

    </div>

    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字（设备型号名）" clearable style="width: 20%"/>
      <el-button type="success" style="margin-left: 5px" @click="load">查询</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="设备id" sortable />
      <el-table-column prop="deviceCate" label="设备型号id"  />
      <el-table-column prop="deviceName" label="设备型号名称"  />
      <el-table-column prop="installStatus" label="安装状态（0表示未分配 ， 1 表示分配）" />
      <el-table-column prop="installLocation" label="安装地点id" />
      <el-table-column prop="placeName" label="安装地点名称" />
      <el-table-column prop="installTime" label="安装日期" />
      <el-table-column prop="endTime" label="预计退休日期"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)"  size="small" type="primary" >安装/迁移</el-button>
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
          <el-form v-model="form" label-width="120px">
            <el-form-item label="设备id">
              <el-input v-model="form.id" readonly="readonly" style="width: 80%"/>
            </el-form-item>
            <el-form-item label="安装地点id" >
              <el-input v-model="form.installLocation" readonly = readonly  style="width: 80%"/>
            </el-form-item>
            <el-form-item label="原安装地点">
              <el-input v-model="form.placeName"  style="width: 80%"/>
            </el-form-item>
          </el-form>
          <el-select
              v-model="this.form.installLocation"
              placeholder="请在下拉框中选择名称"
              maxlength="255"
              :disabled="false"
              clearable>
            <el-option
                v-for="item in placeData"
                :key="item.id"
                :label="item.placeName"
                :value="item.id">
            </el-option>
          </el-select>
          <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="mdf">确定</el-button>
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
  name: 'device_item',
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
      ],
      placeData:[],
      modify:{},
    }
  },
  created() {//加载页面时调用load
    this.load();
    this.loadData();
  },

  methods:{
    handleEdit(row){//编辑
      this.form=JSON.parse(JSON.stringify(row))
      this.dialogVisible=true
    },
    load(){//将后端查询到的数据渲染到web表格
      request.post("/item/page",{
        "pageSize":this.pageSize,
        "pageNum":this.currentPage,
        "param":{
          "search":this.search
        }
      }).then(res => {
        this.tableData=res.data.data
        this.total=res.data.total
      })
    },
    handleSizeChange(pageSize){//每页显示多少条数据
      this.pageSize=pageSize
      this.load();
    },
    loadData(){
      request.get("/place/getData").then(res =>{this.placeData = res.data;
        console.log(res.data)})
    },
    mdf(){
      request.get("/item/modify/"+this.form.id+"/"+this.form.installLocation).then(res =>{

        if(res.code == "200"){
          this.$message({
            type:"success",
            message:"修改成功"});
        }
        else{
          this.$message({
            type:"error",
            message:"修失败"
          })};
      })
    },
    handleCurrentChange(pageNum){//跳转到第几页
      this.currentPage=pageNum
      this.load()
    }


  }}
</script>