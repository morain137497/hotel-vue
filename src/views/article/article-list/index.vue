<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             :status-switch="false"
             :search-switch="false"
             row-key="article_id"
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
          <el-form-item label="状态" v-if="formInfo.article_id">
            <el-select v-model="formInfo.status">
              <el-option label="废弃" value="0"></el-option>
              <el-option label="草稿" value="1"></el-option>
              <el-option label="发布" value="2"></el-option>
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
import WangEditor from '@/components/wang-editor'
import MyUpload from '@/components/my-upload'
import ComConst from "@/utils/ComConst";
export default {
  name: "index",
  components:{MyList, WangEditor,MyUpload},
  data(){
    return{
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
      tableColumns: [
        {
          label: "文章ID",
          prop: "article_id"
        },
        {
          label: "文章标题",
          prop: "title"
        },
        {
          label: "评论状态",
          prop: "comment_disabled",
          render: (h, params) => {
            return h('span',{}, params.row.comment_disabled === '0' ? "不能评论" : params.row.comment_disabled === '1' ? "允许评论" : "允许匿名评论")
          }
        },
        {
          label: "内容简介",
          prop: "content_short"
        },
        {
          label: "是否重点文章",
          prop: "importance",
          render: (h, params) => {
            return h('span',{}, params.row.importance === '0' ? "否" : params.row.importance === '1' ? "是" : "--")
          }
        },
        {
          label: "平台",
          prop: "platforms"
        },
        {
          label: "文章外链",
          prop: "source_uri"
        },
        {
          label: "文章状态",
          prop: "status",
          render: (h, params) => {
            return h('span',{}, params.row.status === '0' ? "废弃" : params.row.status === '1' ? "草稿" : params.row.status === '2' ? '发布' : '审核成功')
          }
        },
        {
          label: "创建时间",
          prop: "create_time"
        }
      ],
      tableRows: [],
      currentPage:1
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
        if(res.data != null){
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
