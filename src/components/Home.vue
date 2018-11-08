<template>
  <div class="container">
    <Login />
    <div v-if="pageIndex === 0"></div>
    <guess v-else-if="pageIndex === 1" />
    <Reuslt v-else-if="pageIndex === 2" />
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
        this.pageIndex = 2
        this.shareUrl = 'http://partyjo.nextdog.cc/niuqi/#/' + 'help/' + result.id
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

  .login {
    text-align: center;
    font-size: 20px;
  }
</style>
