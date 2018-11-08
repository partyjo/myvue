<template>
  <div class="login"></div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    isLogin () {
      return cache.get(this.loginKey)
    },
    login () {
      this.axios.post('/weixin/isLogin', {
      // this.axios.post('/weixin/isLoginTest', {
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