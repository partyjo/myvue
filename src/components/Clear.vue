<template>
  <div class="tip">{{msg}}</div>
</template>

<script>
import cache from '../libs/cache'

export default {
  name: 'Clear',
  data () {
    return {
      msg: '清除缓存...'
    }
  },
  methods: {
    clearOauth () {
      this.axios.get('/weixin/clear').then(res => {
        this.msg = res.msg
      })
    }
  },
  created () {
    cache.set(this.GLOBAL.loginKey, '')
    cache.set(this.GLOBAL.resultKey, '')
    this.clearOauth()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .tip {
    padding: 40px;
    text-align: center;
    color: #fff;
    font-size: 30px;
  }
</style>
