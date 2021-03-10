<template>
  <transition>
    <el-menu class="side-menu" :unique-opened="true" :default-active="$route.fullPath" :router="true" :collapse="collapse" background-color="#304056" text-color="#EEE" active-text-color="#409EFF">
      <template v-for="(menu, index) in menuList">
        <el-submenu v-if="menu.meta.menu" :key="index" :index="menu.path">
          <template slot="title">
            <i :class="menu.meta.icon"></i>
            <span slot="title">{{menu.meta.title}}</span>
          </template>
          <el-menu-item v-for="(item, i) in menu.children" :key="i" :index="menu.path + '/' + item.path">{{item.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </transition>
</template>

<script>
import './index.less'
export default {
  name: "side",
  props: {
    collapse:{
      type: Boolean,
      default(){
        return false
      }
    }
  },
  data(){
    return{
      menuList: this.$router.options.routes
    }
  }
}
</script>

<style scoped>

</style>