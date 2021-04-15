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
          <el-form-item label="名称">
            <el-input v-model="formInfo.name" />
          </el-form-item>
          <el-form-item label="奖金">
            <el-input v-model="formInfo.bonus" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="formInfo.introduce" />
          </el-form-item>
          <el-form-item label="补贴">
            <el-input v-model="formInfo.subsidies" />
          </el-form-item>
          <el-form-item label="提成">
            <el-input v-model="formInfo.commission" />
          </el-form-item>
          <el-form-item label="状态" v-if="formInfo.track_id">
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
          label: "领队ID",
          prop: "user_id"
        },
        {
          label: "领队等级",
          prop: "level"
        },
        {
          label: "领队名称",
          prop: "name"
        },
        {
          label: "补贴",
          prop: "subsidies"
        },
        {
          label: "提成",
          prop: "commission"
        },
        {
          label: "奖金",
          prop: "bonus"
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
        phone: '',
        user_id: '',
        level: '',
        name: '',
        introduce: '',
        bonus: '',
        subsidies: '',
        commission: '',
        status: ''
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
      const result = await this.$api.api.cAuLeader(this.formInfo)
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
      this.$api.api.leaderList({
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
