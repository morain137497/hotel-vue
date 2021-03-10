<template>
  <div id="index">
    <div class="side" :style="{width: mainLeftWidth}">
      <side :collapse="collapse" />
    </div>
    <div class="main" :style="{marginLeft: mainLeftWidth, width: 'calc(100% - '+mainLeftWidth+')'}">
      <div class="header" :style="{ width: 'calc(100% - '+mainLeftWidth+')'}">
        <div class="side-collapse" @click="menuCollapse()">
          <i :class="collapseIcon"></i>
        </div>
        <el-breadcrumb class="header-breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown class="header-dropdown" trigger="click" size="medium" placement="bottom-start">
          <span>
            金钊<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
import './index.less'
import side from '@/layout/side'
export default {
  name: "index",
  components: {side},
  data(){
    return{
      collapse: false,
      mainLeftWidth: "240px",
      collapseIcon: "el-icon-s-fold",
      clientWidth: document.body.clientWidth,
    }
  },
  methods: {
    openMenu()
    {
      this.collapse = false
      this.mainLeftWidth = "240px"
      this.collapseIcon = "el-icon-s-fold"
    },
    closeMenu()
    {
      let width = "64px"
      this.collapse = true
      if(this.clientWidth < 600)
      {
        width = "0px"
      }
      this.mainLeftWidth = width
      this.collapseIcon = "el-icon-s-unfold"
    },
    menuCollapse(){
      if(this.collapse)
        this.openMenu()
      else
        this.closeMenu()
    }
  },
  mounted() {
    if(this.clientWidth < 600)
    {
      this.closeMenu()
    }
    window.onresize = () => {
      return (() => {
        this.clientWidth = document.body.clientWidth
        if(document.body.clientWidth < 600)
          this.closeMenu()
        else
          this.openMenu()
      })();
    }
  }
}
</script>

<style scoped>

</style>