<template>
  <div class="login-content card">
    <div class="login-title">系统登入</div>
    <div class="login-input mza">
      <Input v-model="username" placeholder="请输入用户名" clearable  class="input-item"></Input>
      <Input v-model="password" placeholder="请输入密码" type="password"  clearable  class="input-item"></Input>
      <div class="login-r-p mt15">
        <Checkbox v-model="remember"><span class="r-p-text">记住密码</span></Checkbox>
      </div>
    </div>
    <div class="login-submit mza">
      <Button @click.native="sumitUserInfo" type="primary" size="large" class="login-btn">提交</Button>
    </div>
  </div>
</template>

<script>
import Apis, { initApisToken } from '@/common/js/apis'
import {mapActions} from 'vuex'
import Util from '@/common/util'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      remember: false
    }
  },
  methods: {
    ...mapActions(['fetchAfterLoginData']),
    async sumitUserInfo () {
      if (this.$requiredInVerify(this.username, '用户名') || this.$requiredInVerify(this.password, '密码')) {
        return
      }
      let response = await Apis.loginAction({
        username: this.username,
        password: this.password
      }, true)
      if (this.$responseMessage(response.data, 200, '', true)) {
        return false
      }
      let token = response.data.msg.token
      if (token) {
        initApisToken(`JWT ${token}`)
        Util.setCookie('token', token, 1)
        if (this.remember) {
          Util.setCookie('username', Util.encodeBase64(this.username), 5)
          Util.setCookie('password', Util.encodeBase64(this.password), 5)
        } else {
          Util.setCookie('username', Util.encodeBase64(this.username), 5)
          Util.clearCookie('password')
        }
        this.fetchAfterLoginData()
        this.$router.push('/')
      }
    },
    getUserInfoFromCookie () {
      let username = Util.decodeBase64(Util.getCookie('username'))
      let password = Util.decodeBase64(Util.getCookie('password'))
      if (username && password) {
        this.username = username
        this.password = password
        this.remember = true
      }
    }
  },
  created () {
    this.getUserInfoFromCookie()
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
