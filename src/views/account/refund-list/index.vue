<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="track_id"
             :search-switch="false"
             :status-switch="false"
             :update-switch="false"
             :delete-switch="false"
             :create-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

      <template v-slot:row-action="row" >
        <el-button type="success" @click="partOk(row.row)">部分退款</el-button>
        <el-button type="success" @click="ok(row.row)">直接退款</el-button>
        <el-button type="danger" @click="refuse(row.row)">拒绝</el-button>
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
          label: "退款ID",
          prop: "refund_id"
        },
        {
          label: "支付ID",
          prop: "pay_id"
        },
        {
          label: "来源ID",
          prop: "source_id"
        },
        {
          label: "来源类别",
          prop: "type"
        },
        {
          label: "退款原因",
          prop: "reason"
        },
        {
          label: "付款金额",
          prop: "amount"
        },
        {
          label: "退款金额",
          prop: "refund"
        },
        {
          label: "状态",
          prop: "status",
          render: (h, params) => {
            return h('span',{
            }, params.row.status === '0' ? "拒绝退款" : params.row.status === '1' ? "等待处理" : params.row.status === '3' ? "已经退款" : "---")
          }
        },
      ],
      tableRows: [{refund_id: '231'}],
      formInfo: {
      },
      currentPage: 1,
    }
  },
  methods:{
    partOk(row){
      console.log(row)
      this.$prompt('请输入退款金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        alert(value)
      })
    },
    ok(row){
      console.log(row)

    },
    refuse(row){
      this.$api.api.refuseRefund({refund_id: row.refund_id})
      .then(() => {
        this.$message.success("操作成功")
      })
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
                this.formInfo = res.data
            })
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(index, callback){
      this.formInfo.begin_time = getDateTime(this.formInfo.begin_time)
      this.formInfo.end_time = getDateTime(this.formInfo.end_time)
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
      this.$api.api.refundList({
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
