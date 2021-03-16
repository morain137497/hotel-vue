<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             :status-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange"
             @search="search">


      <template v-slot:search>
        <el-form>
          <el-form-item label="轨迹名称">
            <el-input v-model="searchInfo.track_name" />
          </el-form-item>
          <el-form-item label="轨迹类型">
            <el-select v-model="searchInfo.track_type">
              <el-option v-for="(item,index) in trackTypeList" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="标题">
            <el-input v-model="formInfo.title" />
          </el-form-item>
          <el-form-item label="平台">
            <el-input v-model="formInfo.platforms" />
          </el-form-item>
          <el-form-item label="封面图">
            <my-upload v-model="formInfo.image_uri" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="formInfo.content_short" />
          </el-form-item>
          <el-form-item label="内容">
            <wang-editor v-model="formInfo.content" />
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
        content_short: '',
        image_uri: [],
        platforms: '',
        comment_disabled: '0',
        importance: '0',
        status: '1'
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
      tableRows: [{}],
      currentPage:1,
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
        this.$api.api.articleInfo({article_id: this.tableRows[index].article_id})
        .then(res => {
          if(res.code == 0)
          {
            this.formInfo = res.data
            this.formInfo.image_uri = res.data.image_uri.join(",")
          }
        })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.formInfo.image_uri = this.formInfo.image_uri[0]
      this.$api.api.cAuArticle(this.formInfo)
      .then(res => {
        if(res == 0)
        {
          this.closeDialog()
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
      let params = {
        offset: this.currentPage,
        count: ComConst.PAGE_SIZE
      }

      this.searchInfo.track_name?params.track_name = this.searchInfo.track_name:params
      this.searchInfo.track_type?params.track_type = this.searchInfo.track_type:params


      this.$api.api.articleList(params)
    },
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>
