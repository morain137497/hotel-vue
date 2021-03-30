<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             :status-switch="false"
             :search-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange"
             row-key="track_id"
             @search="search">


      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="轨迹名称">
            <el-input v-model="formInfo.track_name" />
          </el-form-item>
          <el-form-item label="起点">
            <el-input v-model="formInfo.start" />
          </el-form-item>
          <el-form-item label="终点">
            <el-input  v-model="formInfo.end" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="formInfo.begin_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="formInfo.end_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标签">
            <el-input  v-model="formInfo.tag" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input  v-model="formInfo.remark" />
          </el-form-item>
          <el-form-item label="起点类型">
            <el-select v-model="formInfo.track_type">
              <el-option label="步行" value="1"></el-option>
              <el-option label="开车" value="2"></el-option>
              <el-option label="跑步" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInfo.status">
              <el-option label="弃用" value="0"></el-option>
              <el-option label="使用" value="1"></el-option>
              <el-option label="公开" value="2"></el-option>
              <el-option label="审核（超级管理员）" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
    </my-list>
  </div>
</template>

<script>
import MyList from '@/components/my-list'
import ComConst from "@/utils/ComConst";
export default {
  name: "index",
  components:{MyList},
  data(){
    return{
      formInfo: {
        track_id: '',
        track_name: '',
        user_id: '',
        track_type: '1',
        start: '',
        end: '',
        begin_time: '',
        end_time: '',
        tag: '',
        status: '0',
        remark: ''
      },
      tableColumns: [
        {
          label: "轨迹ID",
          prop: "track_id"
        },
        {
          label: "轨迹名称",
          prop: "track_name"
        },
        {
          label: "类型",
          prop: "track_type",
          render: (h, params) => {
            return h('span',{}, params.row.track_type === 1 ? "步行" : params.row.track_type === 1 ? "开车" : "跑步")
          }
        },
        {
          label: "用户id",
          prop: "user_id"
        },
        {
          label: "轨迹起点",
          prop: "start",
        },
        {
          label: "轨迹终点",
          prop: "end"
        },
        {
          label: "开始时间",
          prop: "begin_time"
        },
        {
          label: "结束时间",
          prop: "end_time"
        },
        {
          label: "标签",
          prop: "tag"
        },
        {
          label: "备注",
          prop: "remark"
        }
      ],
      tableRows: [],
      currentPage:'0',
      trackTypeList: [
        {
          value:0,
          label: '全部'
        },
        {
          value:1,
          label: '步行'
        },
        {
          value:2,
          label: '开车'
        },
        {
          value:3,
          label: '跑步'
        },
      ],
      searchInfo:{
        track_name:'',
        track_type: 0
      }
    }
  },
  methods:{
    search(){
      this.getList()
    },
    currentChange(currentPage){
      this.currentPage = currentPage;
    },
    openDialog(index){
      if(index != -1)
      {
        this.$api.api.trackInfo({track_id: this.tableRows[index].track_id})
        .then(res => {
          if(res.code == 0)
          {
            this.formInfo = res.data
          }
        })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.$api.api.cAuTrack(this.formInfo)
      .then(res => {
        if(res.code == 0)
        {
          this.closeDialog()
          callback()
        }
      })
    },
    delRow(id, index, callback){
      this.$api.api.delTrack({track_id: id})
      .then(res => {
        if(res.code == 0)
          callback()
      })
    },
    getList(){
      let params = {
        offset: this.currentPage,
        count: ComConst.PAGE_SIZE
      }
      this.searchInfo.track_name?params.track_name = this.searchInfo.track_name:params
      this.searchInfo.track_type?params.track_type = this.searchInfo.track_type:params
      this.$api.api.trackList(params)
      .then(res => {
        if(res.code == 0){
          this.tableRows = res.data
        }
      })
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>
