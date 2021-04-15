<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="activity_id"
             :search-switch="false"
             :status-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="活动模板">
            <el-select v-model="formInfo.template_id">
              <el-option v-for="(item,index) in articleList" :key="index" :label="item.title" :value="item.template_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始报名时间">
            <el-date-picker
                v-model="formInfo.begin_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束报名时间">
            <el-date-picker
                v-model="formInfo.end_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动开始时间">
            <el-date-picker
                v-model="formInfo.depart_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动结束时间">
            <el-date-picker
                v-model="formInfo.finish_time"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
    </my-list>
  </div>
</template>

<script>
import MyList from '@/components/my-list'
import ComConst from "@/utils/ComConst";
import {getDateTime} from '../../../utils/date'
export default {
  name: "index",
  components:{MyList},
  data(){
    return{
      tableColumns: [
        {
          label: "活动ID",
          prop: "activity_id"
        },
        {
          label: "模板ID",
          prop: "template_id"
        },
        {
          label: "活动创建者ID",
          prop: "user_id"
        },
        {
          label: "文章ID",
          prop: "article_id"
        },
        {
          label: "轨迹ID",
          prop: "track_id"
        },
        {
          label: "活动标题",
          prop: "title"
        },
        {
          label: "报名开始时间",
          prop: "begin_time"
        },
        {
          label: "报名结束时间",
          prop: "end_time"
        },
        {
          label: "活动开始时间",
          prop: "depart_time"
        },
        {
          label: "活动结束时间",
          prop: "finish_time"
        },
        {
          label: "活动天数",
          prop: "days"
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
          label: "集合地点",
          prop: "gather"
        },
        {
          label: "最多参与人数",
          prop: "attend_max"
        },
        {
          label: "收费规则",
          prop: "checked",
          render: (h, params) => {
            return h('span',{
            }, params.row.checked === 1 ? "不审核+线下付款" : params.row.checked === 3 ? "审核" : params.row.checked === 5 ? "线上收费" : "审核+线上收费")
          }
        },
        {
          label: "创建时间",
          prop: "create_time"
        }
      ],
      tableRows: [],
      formInfo: {
        template_id: '',
        begin_time: '',
        end_time: '',
        depart_time: '',
        finish_time: '',
        activity_id: ''
      },
      currentPage: 1,
      articleList: [],
      trackList: []
    }
  },
  methods:{
    uploadSuccess(imagesList){
      this.formInfo.image_uri_list = imagesList
    },
    currentChange(currentPage){
      this.currentPage = currentPage;
    },
    openDialog(index){
      if(index != -1)
      {
        this.$api.api.activityInfo({activity_id: this.tableRows[index].activity_id})
            .then(res => {
              if(res.code == 0)
              {
                this.formInfo = res.data.activity
              }
            })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.formInfo.begin_time = getDateTime(this.formInfo.begin_time)
      this.formInfo.end_time = getDateTime(this.formInfo.end_time)
      this.formInfo.depart_time = getDateTime(this.formInfo.depart_time)
      this.formInfo.finish_time = getDateTime(this.formInfo.finish_time)
      this.$api.api.cAuActivity(this.formInfo)
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
      this.$api.api.delArticle({article_id: id})
          .then(res => {
            if(res.code == 0)
              callback()
          })
    },
    getList(){
      this.$api.api.activityList({
        offset: String(this.currentPage - 1),
        count: ComConst.PAGE_SIZE
      })
      .then(res => {
        if(res.data != null) {
          this.tableRows = res.data
        }
      })
    },
    getTemplateList(){
      this.$api.api.templateList({
        offset: String(0),
        count: '100000'
      })
      .then(res => {
        if(res.data != null) {
          this.articleList = res.data
        }
      })
    },
  },
  mounted() {
    this.getList()
    this.getTemplateList()
  }
}
</script>

<style scoped>

</style>
