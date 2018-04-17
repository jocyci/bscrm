<template>
  <div class="login-content card">
    <div class="login-title">用户注册</div>
    <div class="login-input mza">
      <Input v-model="username" placeholder="请输入登入用户名" clearable  class="input-item"></Input>
      <Input v-model="name" placeholder="请输入姓名" clearable  class="input-item"></Input>
      <Input v-model="password" placeholder="请输入密码" clearable type="password" class="input-item"></Input>
      <Input v-model="tPassword" placeholder="请输再次输入密码" clearable type="password" class="input-item"></Input>
      <Input v-model="eMail" placeholder="请输入邮箱" clearable  class="input-item"></Input>
    </div>
    <div class="login-submit mza">
      <Button @click.native="sumitUserInfo" type="primary" size="large" class="login-btn">提交</Button>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import Util from '@/common/util'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      name: '',
      password: '',
      tPassword: '',
      eMail: ''
    }
  },
  methods: {
    async sumitUserInfo () {
      if (this.$requiredInVerify(this.username, '用户名') || this.$requiredInVerify(this.name, '姓名') || this.$requiredInVerify(this.password, '密码') || this.$requiredInVerify(this.eMail, '邮箱')) {
        return false
      }
      if (this.password !== this.tPassword) {
        this.$Message.warning('两次输入的密码不一致')
        return false
      }
      if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.eMail)) {
        this.$Message.warning('邮箱格式不正确')
        return false
      }
      let response = await Apis.registerNewManager(this.$route.params.register_token, {
        username: this.username,
        password: this.password,
        first_name: this.name,
        email: this.eMail
      }, true)
      if (!this.$responseMessage(response.data, 200, '注册成功，请前往登入')) {
        Util.clearCookie('token')
        window.setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
      }
    }
  }
}
</script>

<style>
.login-content {
  width: 400px;
  margin: 8% auto 0 auto;
  padding-bottom: 50px;
}
.login-title {
  margin-top: 25px;
  color: #0084ff;
  font-size: 22px;
  font-weight: bolder;
  text-align: center;
}
.login-input,
.login-submit {
  width: 280px;
}
.input-item {
  margin-top: 20px;
}
.r-p-text {
  color: #0084ff;
  font-size: 13px;
}
.login-btn {
  width: 100%;
  margin-top: 40px;
}
</style>
