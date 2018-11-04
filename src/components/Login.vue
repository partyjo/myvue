<template>
  <div class="login">{{msg}}</div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Login',
  data () {
    return {
      msg: '登陆中...'
    }
  },
  methods: {
    isLogin () {
      return cache.get(this.loginKey) !== null
    },
    login () {
      this.axios.post('/weixin/isLoginTest', {
        url: window.location.href
      }).then(res => {
        if (res.code === 0) {
          cache.set(this.loginKey, res.data)
          this.reload()
        } else if (res.code === 9999) {
          window.location.href = res.data
        } else {
          this.$layer.msg(res.msg)
        }
      }).catch(() => {
        cache.set(this.loginKey, {
          openid: '123456',
          nickname: '阿敏',
          headimgurl: ''
        })
        this.reload()
      })
    },
    reload () {
      this.msg = '登陆成功，跳转中...'
      window.location.reload()
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    if (!this.isLogin()) {
      this.login()
    } else {
      this.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .login {
    padding: 40px;
    text-align: center;
    color: #fff;
    font-size: 30px;
  }
</style>
