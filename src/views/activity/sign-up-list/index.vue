<template>
  <div id="index">
    <my-list :table-columns="tableColumns" :table-rows="tableRows" :row-action-switch="false">
      <template v-slot:search>
         <el-form-item label="手机号">
           <el-input />
         </el-form-item>
      </template>
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
      tableColumns: [
        // {
        //   label: "用户名",
        //   prop: "username"
        // },
        {
          label: "手机号",
          prop: "mobileNumber"
        },
        // {
        //   label: "是否是超级管理员",
        //   prop: "sign",
        //   render: (h, params) => {
        //     return h('span',{
        //       style: {
        //         color: params.row.sign === 1? "": "#67C23A"
        //       }
        //     }, params.row.sign === 0 ? "超级管理员" : params.row.sign === 1 ? "普通管理员" : "--")
        //   }
        // },
        {
          label: "创建时间",
          prop: "ctime"
        }
      ],
      tableRows: [
        {
          id: 1,
          // username: '1',
          mobileNumber: '1',
          // sign: 1,
          ctime: '12',
          // status: 0
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>