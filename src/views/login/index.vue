<template>
  <div id="index">
    <el-row class="box" type="flex" align="middle" justify="center">
      <el-col :lg="8" :md="14" :sm="16" :xs="20" class="login-box">
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
              <el-button class="send-code-but" :disabled="codeIsSend" @click="sendCode">
                {{codeIsSend?codeTime+'秒':'发送验证码'}}
              </el-button>
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
        code: '872145'
      },
      fromRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      codeIsSend: false,
      codeTime: 60
    }
  },
  methods:{
    sendCode() {
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.login.sendCode({"phone":this.fromInfo.phone})
            .then((res) => {
              if(res.code == 0)
              {
                this.$message.success("验证码发送成功")
                this.codeIsSend = true
                let timer = setInterval(() => {
                  if(this.codeTime > 0 && this.codeTime <= 60){
                    this.codeTime--
                  } else {
                    this.codeIsSend = false
                    this.codeTime = 60
                    clearInterval(timer)
                  }
                }, 1000)
              }

            })
        }
      })
    },
    login(){
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          this.$api.login.checkCode({"phone":this.fromInfo.phone,"code":this.fromInfo.code})
          .then(res => {
            if(res.code == 0) {
              user.setToken(res.token)
              this.$router.push("/activity/activity-template-list")
            }else{
              this.$message.error("验证码错误")
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
  padding: 20px;
  h2{
    color: #666;
  }
  .login-but{
    width: 100%;
  }
  .send-code-but{
    width: 100%;
  }
}
</style>
