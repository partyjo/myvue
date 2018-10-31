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
      result: null
    }
  },
  methods: {
    getGuessResult () {
      this.axios.get('/guess/get?openid=' + this.userInfo.openid).then(res => {
        if (res.success) {
          cache.set(this.resultKey, res.data)
          this.result = res.data
        } else {
          this.reload()
        }
      })
    },
    reload () {
      window.location.reload()
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
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
