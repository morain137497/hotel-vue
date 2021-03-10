<template>
  <div id="index">
    <el-row class="box" type="flex" align="middle" justify="center">
      <el-col :lg="6" :md="14" :sm="16" :xs="20" class="login-box">
        <h2>投票系统登录系统</h2>
        <el-form ref="from" :model="fromInfo" :rules="fromRules">
          <el-form-item prop="mobileNumber">
            <el-input placeholder="请输入用户名" v-model="fromInfo.mobileNumber"  />
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="fromInfo.password"  />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()" class="login-but">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      fromInfo: {
        mobileNumber: '',
        password: ''
      },
      fromRules: {
        mobileNumber: [
          {required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['from'].validate((valid) => {
        if(valid)
        {
          let params = new FormData()
          params.append("mobileNumber", this.fromInfo.mobileNumber)
          params.append("password", this.fromInfo.password)
          this.$api.login.login(params)
          .then(res => {
            if(res.code === 200)
            {
              sessionStorage.setItem("token", res.data)
              this.$router.push('/activity/activity-list')
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