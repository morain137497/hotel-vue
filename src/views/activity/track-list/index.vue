<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="track_id"
             :search-switch="false"
             :status-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="轨迹名称">
            <el-input v-model="formInfo.track_name" />
          </el-form-item>
          <el-form-item label="轨迹类型">
            <el-select v-model="formInfo.track_type">
              <el-option label="步行" value="1"></el-option>
              <el-option label="开车" value="2"></el-option>
              <el-option label="跑步" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起点">
            <el-input v-model="formInfo.start" />
          </el-form-item>
          <el-form-item label="终点">
            <el-input v-model="formInfo.end" />
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
            <el-input v-model="formInfo.tag" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formInfo.remark" />
          </el-form-item>
          <el-form-item label="状态" v-if="formInfo.track_id">
            <el-select v-model="formInfo.status">
              <el-option label="弃用" value="0"></el-option>
              <el-option label="私有" value="1"></el-option>
              <el-option label="公开" value="2"></el-option>
              <el-option label="审核" value="3"></el-option>
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
      tableColumns: [
        {
          label: "轨迹ID",
          prop: "track_id"
        },
        {
          label: "活动创建者ID",
          prop: "user_id"
        },
        {
          label: "轨迹名称",
          prop: "track_name"
        },
        {
          label: "起点",
          prop: "start"
        },
        {
          label: "终点",
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
          label: "轨迹类别",
          prop: "track_type",
          render: (h, params) => {
            return h('span',{
            }, params.row.track_type === '1' ? "步行" : params.row.track_type === '2' ? "开车" : params.row.track_type === '3' ? "跑步" : "---")
          }
        },
        {
          label: "标签",
          prop: "tag"
        },
        {
          label: "备注",
          prop: "remark"
        },
        {
          label: "状态",
          prop: "status",
          render: (h, params) => {
            return h('span',{
            }, params.row.status === '0' ? "废弃" : params.row.status === '1' ? "私有" : params.row.status === '2' ? "公开" : "审核成功")
          }
        },
      ],
      tableRows: [],
      formInfo: {
        track_id: '',
        track_name: '',
        track_type: '',
        start: '',
        end: '',
        begin_time: '',
        end_time: '',
        tag: '',
        remark: '',
        status: ''
      },
      currentPage: 1,
      articleList: []
    }
  },
  methods:{
    currentChange(currentPage){
      this.currentPage = currentPage;
    },
    openDialog(index){
      if(index != -1)
      {
        this.$api.api.trackInfo({track_id: this.tableRows[index].track_id})
            .then(res => {
              if(res.code == 0)
                this.formInfo = res.data
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
              this.getList()
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
      this.$api.api.trackList({
        offset: String(this.currentPage - 1),
        count: ComConst.PAGE_SIZE
      })
      .then(res => {
        if(res.data != null){
          this.tableRows = res.data
        }
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>
