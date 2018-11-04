<template>
  <div class="container">
    <Login v-if="pageIndex === 0" />
    <guess v-else-if="pageIndex === 1" />
    <Reuslt v-else-if="pageIndex === 2" />
    <WechatShare v-if="isWechatShare === 1" />
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
      isWechatShare: 0
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    this.userinfo = cache.get(this.loginKey)
    if (this.userinfo) {
      this.isWechatShare = 1
      const result = cache.get(this.resultKey)
      if (result) {
        this.pageIndex = 2
      } else {
        this.pageIndex = 1
      }
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
