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
      <template v-slot:row-action="params">
        <el-button  type="danger" @click="activityCancel(params.row)">取消</el-button>
        <el-button  type="danger" @click="activityOk(params.row)">结算</el-button>
        <el-button  type="danger" @click="activityOkDetails(params.row)">结算详情</el-button>
      </template>
    </my-list>

    <my-dialog ref="my-dialog" title="结算详情" :submit-but-switch="false">
      <template v-slot:dialog>
        <el-form >
          <el-form-item label="活动ID">{{curActivityOkDetails.activity_id}}</el-form-item>
          <el-form-item label="活动标题">{{curActivityOkDetails.title}}</el-form-item>
          <el-form-item label="活动所有者ID">{{curActivityOkDetails.user_id}}</el-form-item>
          <el-form-item label="活动支付明细">{{curActivityOkDetails.fee_detail}}</el-form-item>
          <el-form-item label="活动成功参与人数">{{curActivityOkDetails.attend_suc}}</el-form-item>
          <el-form-item label="活动总支付">{{curActivityOkDetails.fee}}</el-form-item>
          <el-form-item label="活动总收入">{{curActivityOkDetails.amount}}</el-form-item>
          <el-form-item label="领队补贴">{{curActivityOkDetails.subsidies}}</el-form-item>
          <el-form-item label="领队奖金">{{curActivityOkDetails.bonus}}</el-form-item>
          <el-form-item label="领队提成">{{curActivityOkDetails.commission}}</el-form-item>
          <el-form-item label="活动总盈利">{{curActivityOkDetails.income}}</el-form-item>
        </el-form>
      </template>
    </my-dialog>

  </div>
</template>

<script>
import MyDialog from '@/components/my-dialog'
import MyList from '@/components/my-list'
import ComConst from "@/utils/ComConst";
import {getDateTime} from '../../../utils/date'
import ele from '../../../utils/ele'
export default {
  name: "index",
  components:{MyList, MyDialog},
  data(){
    return{
      curActivityOkDetails: {
        activity_id: '',
        user_id: '',
        fee_detail: '',
        fee: '',
        amount: '',
        subsidies: '',
        bonus: '',
        commission: '',
        income: '',
        title: '',
        attend_suc: '',
      },
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
          label: "活动状态",
          prop: "checked",
          render: (h, params) => {
            return h('span',{
            }, params.row.state === '1' ? "未开始" : params.row.state === '2' ? "报名中" : params.row.state === '3' ? "结束报名" : params.row.state === '4' ? '进行中' : '已经结束')
          }
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
          label: "最多参与人数",
          prop: "attend_max"
        },
        {
          label: "收费规则",
          prop: "checked",
          render: (h, params) => {
            return h('span',{
            }, params.row.checked === '1' ? "不审核+线下付款" : params.row.checked === '3' ? "审核" : params.row.checked === '5' ? "线上收费" : "审核+线上收费")
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
    activityOkDetails(row){
      this.$api.api.activityOkDetails({activity_id: row.activity_id})
      .then(res => {
        if(res.code === 0){
          this.curActivityOkDetails = res.data
          this.$refs['my-dialog'].status = true
        }
      })
    },
     activityCancel(row){
      ele.confirm({callback: (done) => {
          done()
          this.$api.api.activityCancel({activity_id: row.activity_id})
          .then(res => {
            if(res.code === 0){
              this.$message.success("取消成功")
            }
          })
      }})
    },
    activityOk(row){
      ele.confirm({callback: (done) => {
          done()
          this.$api.api.activityOk({activity_id: row.activity_id})
              .then(res => {
                if(res.code === 0){
                  this.$message.success("结算成功")
                }
              })
        }})
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
