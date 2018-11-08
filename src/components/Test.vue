<template>
  <div>
    <div class="test">{{msg}}</div>
    <One :url="url" v-if="pageIndex === 1" />
    <Two v-else-if="pageIndex === 2" />
    <button @click="ck1">点击1</button>
    <button @click="ck2">点击2</button>
    <button @click="ck3">点击3</button>
  </div>
</template>

<script>
import cache from '../libs/cache'
import One from './One'
import Two from './Two'
export default {
  name: 'Test',
  components: {
    One,
    Two
  },
  data () {
    return {
      msg: 'tets',
      pageIndex: 0,
      url: window.location.href
    }
  },
  methods: {
    login () {
      this.axios.post('/weixin/isLoginTest', {
        url: this.url
      }).then(res => {
        if (res.code === 0) {
          cache.set(this.GLOBAL.loginKey, res.data)
          this.reload()
        } else if (res.code === 9999) {
          window.location.href = res.data
        }
      })
    },
    reload () {
      window.location.reload()
    },
    ck1 () {
      this.url = Math.random() + '///'
    },
    ck2 () {
      this.pageIndex = 1
    },
    ck3 () {
      this.pageIndex = 2
    }
  },
  created () {
    console.log('created')
    console.log(this.url)
    if (!cache.get(this.GLOBAL.loginKey)) {
      this.login()
    }
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .test {
    font-size: 30px;
  }
</style>
