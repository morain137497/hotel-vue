<template>
  <div id="index">
    <el-dialog :visible.sync="status" :title="title" :append-to-body="true" :close-on-click-modal="false" :show-close="false">
      <el-row>
        <el-col :span="20" :offset="2">
          <slot name="dialog"></slot>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="small" @click="closeDialog()">取 消</el-button>
        <el-button size="small" type="primary" @click="submitDialog()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  props:{
    title:{
      type:String,
      default(){
        return '提示'
      }
    }
  },
  data(){
    return{
      status: false
    }
  },
  methods: {
    closeDialog(){
      this.status = false
      this.$emit("closeDialog")
    },
    submitDialog(){
      this.$emit("submitDialog", (message) => {
        this.status = false
        this.$message.success(message)
      })
    },
  }
}
</script>

<style scoped>

</style>