<template>
  <div id="index">
    <el-card shadow="never">
      <el-divider v-if="title" content-position="left">{{title}}</el-divider>
      <slot name="content"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  props:{
    title: {
      type: String,
      default(){}
    }
  }
}
</script>

<style scoped>
#index{
  margin-bottom: 20px;
}
</style>