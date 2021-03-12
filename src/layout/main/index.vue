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
        <el-dropdown class="header-dropdown" trigger="click" size="medium" placement="bottom-start" @command="handleCommand">
          <span>
            {{userId}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
<!--            <el-dropdown-item>个人中心</el-dropdown-item>-->
<!--            <el-dropdown-item>首页</el-dropdown-item>-->
            <el-dropdown-item command="updatePhone">修改手机号</el-dropdown-item>
<!--            <el-dropdown-item divided>安全退出</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <my-dialog ref="my-dialog" title="修改手机号" @submitDialog="submitDialog" @closeDialog="closeDialog">
        <template v-slot:dialog>
          <el-form ref="from" :model="formInfo" :rules="formRules">
            <el-form-item prop="phone">
              <el-input placeholder="请输入新手机号" v-model="formInfo.phone" />
            </el-form-item>
            <el-row>
              <el-col :span="16">
                <el-form-item prop="code">
                  <el-input placeholder="请输入验证码" v-model="formInfo.code"/>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-button @click="sendCode">发送验证码</el-button>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </my-dialog>
      <div class="content">
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
import './index.less'
import side from '@/layout/side'
import user from "@/utils/user";
import MyDialog from "@/components/my-dialog"
export default {
  name: "index",
  components: {side,MyDialog},
  data(){
    return{
      collapse: false,
      mainLeftWidth: "240px",
      collapseIcon: "el-icon-s-fold",
      clientWidth: document.body.clientWidth,
      userId: "",
      formInfo:{
        phone: '18238003856',
        code: '873207'
      },
      formRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
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
    },
    handleCommand(command){
      if(command == "updatePhone")
        this.$refs['my-dialog'].status = true
    },
    sendCode()
    {
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.login.sendCode({"phone":this.formInfo.phone})
              .then(() => {})
        }
      })
    },
    closeDialog(){
      this.formInfo = this.$options.data().formInfo
    },
    submitDialog(){
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.user.modifyPhone({"phone":this.formInfo.phone,"code":this.formInfo.code})
              .then(res => {
                if(res.code == 0)
                {
                  this.$message.success("修改成功")
                  this.closeDialog()
                }
              })
        }
      })
    }
  },
  mounted() {
    this.userId = user.getUserId()
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
