<template>
  <div id="index">
    <el-row class="box" type="flex" align="middle" justify="center">
      <el-col :lg="6" :md="14" :sm="16" :xs="20" class="login-box">
        <h2>群居登录系统</h2>
        <el-form ref="from" :model="fromInfo" :rules="fromRules">
          <el-form-item prop="phone">
            <el-input placeholder="请输入手机号" v-model="fromInfo.phone"  />
          </el-form-item>
          <el-row>
            <el-col :span="16" >
              <el-form-item prop="code">
                <el-input placeholder="请输入验证码" v-model="fromInfo.code"  />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="sendCode">发送验证码</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="login()" class="login-but">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import user from "@/utils/user";
export default {
  name: "index",
  data(){
    return{
      fromInfo: {
        phone: '15893316477',
        code: '242490'
      },
      fromRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    sendCode() {
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.login.sendCode({"phone":this.fromInfo.phone})
              .then(() => {})
        }
      })
    },
    login(){
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.login.checkCode({"phone":this.fromInfo.phone,"code":this.fromInfo.code})
          .then(res => {
            if(res.code === 0)
            {
              user.setToken(res.token)
              window.location.href = "/system/index"
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.box{
  position: fixed;
  width: 100%;
  height: 100%;
}
.login-box{
  text-align: center;
  background: #FFF;
  border-radius: 10px;
  border: 1px solid #EEE;
  padding: 50px;
  h2{
    color: #666;
  }
  .login-but{
    width: 100%;
  }
}
</style>
