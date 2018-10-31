<template>
  <div class="container">
    <guess v-if="pageIndex === 0" />
    <Reuslt v-else-if="pageIndex === 1" />
    <Login v-else />
  </div>
</template>

<script>
import cache from '../libs/cache'

import Guess from './Guess'
import Reuslt from './Result'
import Login from './Login'

export default {
  name: 'Home',
  components: {
    Guess,
    Reuslt,
    Login
  },
  data () {
    return {
      pageIndex: null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    this.userinfo = cache.get(this.loginKey)
    if (this.userinfo) {
      const result = cache.get(this.resultKey)
      if (result) {
        this.pageIndex = 1
      } else {
        this.pageIndex = 0
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
