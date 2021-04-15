<template>
  <div id="index">
    <my-list :table-columns="tableColumns"
             :table-rows="tableRows"
             row-key="user_id"
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
          <el-form-item label="手机号" v-if="!formInfo.user_id">
            <el-input v-model="formInfo.phone" />
          </el-form-item>
          <el-form-item label="级别">
            <el-input v-model="formInfo.level" />
          </el-form-item>
          <el-form-item label="折扣">
            <el-input v-model="formInfo.discount" />
          </el-form-item>
          <el-form-item label="参与活动次数">
            <el-input v-model="formInfo.attend_cnt" />
          </el-form-item>
          <el-form-item label="状态" >
            <el-select v-model="formInfo.status">
              <el-option label="弃用" value="0"></el-option>
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
export default {
  name: "index",
  components:{MyList},
  data(){
    return{
      tableColumns: [
        {
          label: "用户ID",
          prop: "user_id"
        },
        {
          label: "参与活动次数",
          prop: "attend_cnt"
        },
        {
          label: "折扣",
          prop: "discount"
        },
        {
          label: "VIP等级",
          prop: "level"
        },
        {
          label: "状态",
          prop: "status",
          render: (h, params) => {
            return h('span',{
            }, params.row.status === '0' ? "废弃" : params.row.status === '1' ? "在用" : '--')
          }
        },
      ],
      tableRows: [],
      formInfo: {
        user_id: '',
        level: '',
        discount: '',
        attend_cnt: '',
        status: '',
        phone: ''
      },
      currentPage: 1,
      articleList: []
    }
  },
  methods:{
    currentChange(currentPage){
      this.currentPage = currentPage;
    },
    openDialog(index){
      if(index != -1)
      {
        this.formInfo = this.tableRows[index]
      }
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    async submitDialog(index, callback){
      if(!this.formInfo.user_id){
        const result = await this.$api.api.getUserId({
          phone: this.formInfo.phone
        })
        this.formInfo.user_id = result.data.user_id
      }
      const result = await this.$api.api.cAuVipUser(this.formInfo)
      if(result.code == 0)
      {
        this.closeDialog()
        this.getList()
        callback()
      }
    },
    delRow(id, index, callback){
      this.$api.api.delTrack({track_id: id})
          .then(res => {
            if(res.code == 0)
              callback()
          })
    },
    getList(){
      this.$api.api.vipUserList({
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
