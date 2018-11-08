<template>
  <div class="container">
    <div v-if="pageIndex === 0" class="tx-c">登陆中...</div>
    <guess v-else />
    <WechatShare :url="shareUrl" />
  </div>
</template>

<script>
import cache from '../libs/cache'

import WechatShare from './WechatShare'
import Guess from './Guess'

export default {
  name: 'Home',
  components: {
    Guess,
    WechatShare
  },
  data () {
    return {
      pageIndex: 0,
      shareUrl: 'http://partyjo.nextdog.cc/nq/'
    }
  },
  methods: {
    isLogin () {
      return cache.get(this.loginKey)
    },
    login (cb) {
      this.axios.post('/weixin/isLogin', {
      // this.axios.post('/weixin/isLoginTest', {
        url: window.location.href
      }).then(res => {
        if (res.code === 0) {
          cache.set(this.loginKey, res.data)
          this.userInfo = res.data
          cb()
        } else if (res.code === 9999) {
          window.location.href = res.data
        } else {
          this.$layer.msg(res.msg)
        }
      })
    },
    getGuessResult (cb) {
      this.axios.get('/guess/get?openid=' + this.userInfo.openid).then(res => {
        if (res.code === 0) {
          cache.set(this.resultKey, res.data)
          this.result = res.data
          cb()
        } else {
          this.pageIndex = 1
        }
      })
    },
    show () {
      this.result = cache.get(this.resultKey)
      if (this.result) {
        this.showResult()
      } else {
        this.getGuessResult(() => {
          this.showResult()
        })
      }
    },
    showResult () {
      if (this.result.openid === this.userInfo.openid) {
        // window.location.href = '/#/result'
        window.location.href = 'http://partyjo.nextdog.cc/nq/#/result'
      }
    }
  },
  mounted () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    this.userInfo = this.isLogin()
    if (this.userInfo) {
      this.show()
    } else {
      this.login(() => {
        this.show()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .container {
    height: 1000px;
  }

  .tx-c {
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
</style>
