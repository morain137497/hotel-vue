<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             :search-switch="false"
             :update-switch="false"
             :create-switch="false"
             row-key="comment_id"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @load="load">
<!--      <template v-slot:createOrUpdateDialog >-->
<!--        <el-form ref="from" label-position="top" :model="formInfo">-->
<!--          <el-form-item label="标题">-->
<!--            <el-input v-model="formInfo.title" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="平台">-->
<!--            <el-input v-model="formInfo.platforms" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="封面图">-->
<!--            <my-upload v-model="formInfo.image_uri" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="简介">-->
<!--            <el-input type="textarea" v-model="formInfo.content_short" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="内容">-->
<!--            <wang-editor v-model="formInfo.content" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="评论状态">-->
<!--            <el-select v-model="formInfo.comment_disabled">-->
<!--              <el-option label="不能评论" value="0"></el-option>-->
<!--              <el-option label="登录后评论" value="1"></el-option>-->
<!--              <el-option label="匿名评论" value="2"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="是否重点文章">-->
<!--            <el-select v-model="formInfo.importance">-->
<!--              <el-option label="否" value="0"></el-option>-->
<!--              <el-option label="是" value="1"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="状态">-->
<!--            <el-select v-model="formInfo.status">-->
<!--              <el-option label="废弃" value="0"></el-option>-->
<!--              <el-option label="草稿" value="1"></el-option>-->
<!--              <el-option label="发布" value="2"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </template>-->
    </my-list>
  </div>
</template>

<script>
import MyList from '@/components/my-list'
export default {
  name: "index",
  components:{MyList},
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
          label: "评论ID",
          prop: "comment_id"
        },
        {
          label: "文章ID",
          prop: "article_id"
        },
        {
          label: "用户ID",
          prop: "user_id"
        },
        {
          label: "标题",
          prop: "title"
        },
        {
          label: "内容",
          prop: "content"
        },
        {
          label: "子评论数",
          prop: "child_cnt"
        },
        {
          label: "踩",
          prop: "down"
        },
        {
          label: "赞",
          prop: "up"
        },
        {
          label: "父评论ID",
          prop: "pid"
        },
        {
          label: "引用的评论ID",
          prop: "quote"
        },
        {
          label: "IP地址",
          prop: "ip"
        }
      ],
      tableRows: [
        {
          comment_id: 2,
          child_cnt: 1,
          children:[]
        }
      ]
    }
  },
  methods:{
    load(tree, treeNode, resolve){
      setTimeout(() => {
        resolve([
          {
            comment_id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            comment_id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
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
      this.$api.api.delComment({comment_id: id})
      .then(res => {
        if(res.code == 0)
          callback()
      })
    }
  }
}
</script>

<style scoped>

</style>
