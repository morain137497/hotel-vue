<template>
  <div id="index">
    <my-card title="系统配置">
      <template v-slot:content>
        <el-form label-position="top">
          <el-form-item label="系统名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="系统LOGO">
            <my-upload />
          </el-form-item>
          <el-form-item label="系统邮箱">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="备案信息">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信appId">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信appSecret">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信macId">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="微信macKey">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </template>
    </my-card>
  </div>
</template>

<script>
import MyCard from '@/components/my-card'
import MyUpload from '@/components/my-upload'
export default {
  name: "index",
  components: {MyCard,MyUpload},
  data(){
    return{
    }
  }
}
</script>

<style scoped>

</style>