<template>
  <div class="container">
    <Login />
    <div v-if="pageIndex === 0" class="tm">登陆失败<br>刷新一下哟</div>
    <guess v-else />
    <WechatShare :url="shareUrl" />
  </div>
</template>

<script>
import cache from '../libs/cache'

import WechatShare from './WechatShare'
import Guess from './Guess'
import Reuslt from './Result'
import Login from './Login'

export default {
  name: 'Home',
  components: {
    Guess,
    Reuslt,
    Login,
    WechatShare
  },
  data () {
    return {
      pageIndex: 0,
      shareUrl: 'http://partyjo.nextdog.cc/niuqi/'
    }
  },
  methods: {
    isLogin () {
      return cache.get(this.loginKey)
    },
    show () {
      const result = cache.get(this.resultKey)
      if (result) {
        // window.location.href = '/#/result'
        window.location.href = 'http://partyjo.nextdog.cc/niuqi/#/result'
      } else {
        this.pageIndex = 1
      }
    }
  },
  mounted () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    if (this.isLogin()) {
      this.show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .container {
    height: 1000px;
  }

  .tm {
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
</style>
