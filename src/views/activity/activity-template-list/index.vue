<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="activity_id"
             :search-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="文章">
            <el-select v-model="formInfo.article_id">
              <el-option v-for="(item,index) in articleList" :key="index" :label="item.title" :value="item.article_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轨迹">
            <el-select v-model="formInfo.track_id">
              <el-option v-for="(item,index) in trackList" :key="index" :label="item.track_name" :value="item.track_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="formInfo.title" />
          </el-form-item>
          <el-form-item label="活动地点（城市）">
            <el-input v-model="formInfo.city" />
          </el-form-item>
          <el-form-item label="封面图">
            <my-upload v-model="formInfo.image_uri_list"  @uploadSuccess="uploadSuccess" />
          </el-form-item>
          <el-form-item label="活动天数">
            <el-input v-model="formInfo.days" />
          </el-form-item>
          <el-form-item label="起点">
            <el-input v-model="formInfo.start" />
          </el-form-item>
          <el-form-item label="终点">
            <el-input v-model="formInfo.end" />
          </el-form-item>
          <el-form-item label="集合地点">
            <el-input v-model="formInfo.gather" />
          </el-form-item>
          <el-form-item label="最多参与人数">
            <el-input v-model="formInfo.attend_max" />
          </el-form-item>
          <el-form-item label="最少参与人数">
            <el-input v-model="formInfo.attend_min" />
          </el-form-item>
          <el-form-item label="折扣">
            <el-input v-model="formInfo.discount" />
          </el-form-item>
          <el-form-item label="费用">
            <el-input v-model="formInfo.fee" />
          </el-form-item>
          <el-form-item label="内容">
            <wang-editor v-model="formInfo.content" :default-content="formInfo.defaultContent"/>
          </el-form-item>
          <el-form-item label="审核/支付方式">
            <el-select v-model="formInfo.checked">
              <el-option label="不审核+线下付款" value="1"></el-option>
              <el-option label="审核" value="2"></el-option>
              <el-option label="线上收费" value="5"></el-option>
              <el-option label="审核+线上收费" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInfo.status">
              <el-option label="废弃" value="0"></el-option>
              <el-option label="在用" value="1"></el-option>
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
import WangEditor from '@/components/wang-editor'
import MyUpload from '@/components/my-upload'
export default {
  name: "index",
  components:{MyList,WangEditor,MyUpload},
  data(){
    return{
      tableColumns: [
        {
          label: "活动ID",
          prop: "activity_id"
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
          label: "活动内容",
          prop: "content"
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
          label: "集合时间",
          prop: "gather_time"
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
        article_id: '',
        track_id: '',
        content: '',
        title: '',
        city: '',
        days: '',
        start: '',
        end: '',
        gather: '',
        attend_max: '',
        attend_min: '',
        discount: '',
        image_uri: '',
        fee: '',
        checked: '',
        image_uri_list: [],
        status: ''
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
        this.$api.api.articleInfo({article_id: this.tableRows[index].article_id})
            .then(res => {
              if(res.code == 0)
              {
                this.formInfo = res.data
                this.formInfo.defaultContent = res.data.content
                this.formInfo.image_uri_list = res.data.image_uri.split(",")
              }
            })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.formInfo.image_uri = this.formInfo.image_uri_list[0]
      this.$api.api.cAuTemplate(this.formInfo)
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
    getArticleList(){
      this.$api.api.articleList({
        status: '3'
      })
      .then(res => {
        if(res.data != null) {
          this.articleList = res.data
        }
      })
    },
    getTrackList(){
      this.$api.api.trackList({
        status: '3'
      })
      .then(res => {
        if(res.data != null) {
          this.trackList = res.data
        }
      })
    },
  },
  mounted() {
    this.getList()
    this.getArticleList()
    this.getTrackList()
  }
}
</script>

<style scoped>

</style>
