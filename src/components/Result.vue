<template>
  <div class="page">
    <div>结果</div>
  </div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Result',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getGuessResult () {
      this.axios.get('/guess/result?openid=' + this.userInfo.openid).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.userInfo = cache.get(this.loginKey)
    this.getGuessResult()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .page {
    background-color: #f2f2f2;
  }
</style>
