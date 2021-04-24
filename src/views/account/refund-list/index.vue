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
        <el-button type="success" @click="partOk(row)" v-if="row.row.status === '1'">部分退款</el-button>
        <el-button type="success" @click="ok(row)" v-if="row.row.status === '1'">直接退款</el-button>
        <el-button type="danger" @click="refuse(row)" v-if="row.row.status === '1'">拒绝</el-button>
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
        // {
        //   label: "来源ID",
        //   prop: "source_id"
        // },
        // {
        //   label: "来源类别",
        //   prop: "type"
        // },
        {
          label: "退款原因",
          prop: "reason"
        },
        {
          label: "付款金额",
          prop: "amount",
          render: (h, params) => {
            return h('span',{
            }, (Number(params.row.amount ) / 100) + '元' )
          }
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
            }, params.row.status === '0' ? "拒绝退款" : params.row.status === '1' ? "等待处理" : params.row.status === '3' ? "已经退款" : "退款中")
          }
        },
      ],
      tableRows: [],
      formInfo: {
      },
      currentPage: 1,
    }
  },
  methods:{
    partOk(row){
      this.$prompt('请输入退款金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$api.api.refuseOkSetFee({refund_id: row.row.refund_id, refund: value})
            .then((res) => {
              if(res.code === 0){
                this.tableRows[row.index].status = '2'
                this.$message.success("操作成功")
              }
            })
      })
    },
    ok(row){
      this.$api.api.refuseOk({refund_id: row.row.refund_id})
          .then((res) => {
            if(res.code === 0){
              this.tableRows[row.index].status = '2'
              this.$message.success("操作成功")
            }
          })
    },
    refuse(row){
      this.$api.api.refuseRefund({refund_id: row.row.refund_id})
      .then((res) => {
        if(res.code === 0){
          this.tableRows[row.index].status = '0'
          this.$message.success("操作成功")
        }
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
