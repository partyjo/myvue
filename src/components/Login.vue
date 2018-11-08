<template>
  <div class="login">{{msg}}</div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Login',
  props: ['url'],
  data () {
    return {
      msg: '登陆中...',
      targetUrl: this.url ? this.url : window.location.href
    }
  },
  methods: {
    isLogin () {
      return cache.get(this.loginKey)
    },
    login () {
      this.axios.post('/weixin/isLogin', {
      // this.axios.post('/weixin/isLoginTest', {
        url: this.targetUrl
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
      this.msg = '登陆成功，跳转中...'
      window.location.reload()
    }
  },
  mounted () {
    this.loginKey = this.GLOBAL.loginKey
    if (this.isLogin()) {
      this.reload()
    } else {
      this.login()
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
