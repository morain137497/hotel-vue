<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="track_id"
             :search-switch="false"
             :status-switch="false"
             :row-action-switch="false"
             :create-switch="false"
             @delRow="delRow"
             @submitDialog="submitDialog"
             @openDialog="openDialog"
             @closeDialog="closeDialog"
             @currentChange="currentChange">

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
          label: "支付ID",
          prop: "pay_id"
        },
        {
          label: "支付者ID",
          prop: "user_id"
        },
        {
          label: "付款金额",
          prop: "amount"
        },
        {
          label: "付款的附带信",
          prop: "attach"
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
          label: "付款标题",
          prop: "title"
        },
      ],
      tableRows: [],
      formInfo: {
      },
      currentPage: 1,
    }
  },
  methods:{
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
      this.$api.api.trackList({
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
