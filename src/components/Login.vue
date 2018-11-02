<template>
  <div class="page">
    <div class="login">登陆中</div>
  </div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
      })
    },
    reload () {
      window.location.reload()
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    if (!this.isLogin()) {
      this.login()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .page {
    background-color: #f2f2f2;

    .login {
      text-align: center;
      font-size: 20px;
    }
  }
</style>
