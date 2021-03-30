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
          <el-form-item label="标题">
            <el-input v-model="formInfo.title" />
          </el-form-item>
          <el-form-item label="平台">
            <el-input v-model="formInfo.platforms" />
          </el-form-item>
          <el-form-item label="封面图">
            <my-upload v-model="formInfo.image_uri_list"  @uploadSuccess="uploadSuccess" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="formInfo.content_short" />
          </el-form-item>
          <el-form-item label="内容">
            <wang-editor v-model="formInfo.content" :default-content="formInfo.defaultContent"/>
          </el-form-item>
          <el-form-item label="评论状态">
            <el-select v-model="formInfo.comment_disabled">
              <el-option label="不能评论" value="0"></el-option>
              <el-option label="登录后评论" value="1"></el-option>
              <el-option label="匿名评论" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否重点文章">
            <el-select v-model="formInfo.importance">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInfo.status">
              <el-option label="废弃" value="0"></el-option>
              <el-option label="草稿" value="1"></el-option>
              <el-option label="发布" value="2"></el-option>
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
        article_id: '',
        title: '',
        content: '',
        defaultContent: '',
        content_short: '',
        image_uri_list: [],
        image_uri: '',
        platforms: '',
        comment_disabled: '0',
        importance: '0',
        status: '1',
      },
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
      this.$api.api.cAuArticle(this.formInfo)
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
      this.$api.api.articleList({
        offset: String(this.currentPage - 1),
        count: ComConst.PAGE_SIZE
      })
          .then(res => {
            this.tableRows = res.data
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
