<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="template_id"
             :search-switch="false"
             :status-switch="false"
             :delete-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

      <template v-slot:createOrUpdateDialog >
        <el-form ref="from" label-position="top" :model="formInfo">
          <el-form-item label="文章">
            <el-select v-model="formInfo.article_id" filterable>
              <el-option v-for="(item,index) in articleList" :key="index" :label="item.title" :value="item.article_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轨迹" >
            <el-select v-model="formInfo.track_id" filterable>
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
          <el-form-item label="集合参数">
            <el-row v-for="(item,index) in gatherList" :key="index">
              <el-col :span="10">
                  <el-input v-model="item.address" placeholder="集合地点" />
              </el-col>
              <el-col :span="10" :offset="1">
                  <el-date-picker type="datetime" v-model="item.time" placeholder="选择集合时间"></el-date-picker>
              </el-col>
              <el-col :span="2" :offset="1" v-if="index !== 0">
                <i class="el-icon-circle-close" @click="delGatherItem(index)"></i>
              </el-col>
            </el-row>
            <el-button @click="addGatherItem()">添加</el-button>
          </el-form-item>
          <el-form-item label="最多参与人数">
            <el-input v-model="formInfo.attend_max" />
          </el-form-item>
          <el-form-item label="最少参与人数">
            <el-input v-model="formInfo.attend_min" />
          </el-form-item>
          <el-form-item label="折扣类型">
            <el-select v-model="discount_type">
              <el-option label="固定折扣" value="value"></el-option>
              <el-option label="按天折扣" value="weekday"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣值" v-if="discount_type === 'value'">
            <el-input v-model="discount_value" />
          </el-form-item>
          <el-form-item label="折扣值" v-if="discount_type === 'weekday'">
            <el-input v-for="(item ,index) in weekdayList" :key="index" :placeholder="item.label" v-model="item.value" />
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
import {getDateTime} from '../../../utils/date'
export default {
  name: "index",
  components:{MyList,WangEditor,MyUpload},
  data(){
    return{
      tableColumns: [
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
          label: "价格(元)",
          prop: "fee",
          render: (h, params) => {
            return h('span',{
            }, Number(params.row.fee) / 100)
          }
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
      gatherList: [
        {address: '', time: ''}
      ],
      weekdayList: [
        {label: '周日', value: ''},
        {label: '周一', value: ''},
        {label: '周二', value: ''},
        {label: '周三', value: ''},
        {label: '周四', value: ''},
        {label: '周五', value: ''},
        {label: '周六', value: ''}
      ],
      discount_type: 'value',
      discount_value: '',
      currentPage: 1,
      articleList: [],
      trackList: []
    }
  },
  methods:{
    addGatherItem(){
      this.gatherList.push({address: '', time: ''})
    },
    delGatherItem(index){
      this.gatherList.splice(index,1)
    },
    uploadSuccess(imagesList){
      this.formInfo.image_uri_list = imagesList
    },
    currentChange(currentPage){
      this.currentPage = currentPage;
    },
    openDialog(index){
      if(index != -1)
      {
        this.$api.api.templateInfo({template_id: this.tableRows[index].template_id})
            .then(res => {
              if(res.code == 0)
              {
                this.formInfo = res.data.template
                this.formInfo.defaultContent = res.data.template.content
                this.formInfo.image_uri_list = res.data.template.image_uri.split(",")
                this.gatherList = JSON.parse(res.data.template.gather)

                const discount = JSON.parse(res.data.template.discount)
                this.discount_type = discount.type

                this.weekdayList.forEach((item,index) => {
                  item.value = discount.rule[index]
                })

              }
            })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.gatherList.forEach(item => {
        item.time = getDateTime(item.time)
      })
      this.formInfo.gather = JSON.stringify(this.gatherList)
      this.formInfo.image_uri = this.formInfo.image_uri_list[0]
      const discount = {
        type: this.discount_type
      }
      if(this.discount_type === 'value'){
        discount.rule = this.discount_value
      }
      if(this.discount_type === 'weekday'){
        const rule = {}
        this.weekdayList.forEach((item,index) => {
          rule[index] = item.value
        })
        discount.rule = rule
      }
      this.formInfo.fee = (Number(this.formInfo.fee) * 100).toString()
      this.formInfo.discount = JSON.stringify(discount)
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
      this.$api.api.templateList({
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
      this.$api.api.articleSearch({
        status: '3'
      })
      .then(res => {
        if(res.data != null) {
          this.articleList = res.data
        }
      })
    },
    getTrackList(){
      this.$api.api.trackSearch({
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
