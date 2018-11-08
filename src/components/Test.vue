<template>
  <div>
    <Login />
    <div class="test">{{msg}}</div>
    <One :url="url" v-if="pageIndex === 1" />
    <Two v-else-if="pageIndex === 2" />
    <button @click="ck1">点击1</button>
    <button @click="ck2">点击2</button>
    <button @click="ck3">点击3</button>
    <button @click="ck4">点击4</button>
    <Share :show.sync="isShared" />
  </div>
</template>

<script>
import cache from '../libs/cache'
import One from './One'
import Two from './Two'
import Login from './Login'
import Share from './Share'
export default {
  name: 'Test',
  components: {
    Login,
    Share,
    One,
    Two
  },
  data () {
    return {
      msg: 'tets',
      pageIndex: 0,
      isShared: false,
      url: window.location.href
    }
  },
  methods: {
    ck1 () {
      this.url = Math.random() + '///'
    },
    ck2 () {
      this.pageIndex = 1
    },
    ck3 () {
      this.pageIndex = 2
    },
    ck4 () {
      this.isShared = true
    }
  },
  mounted () {
    this.userInfo = cache.get(this.GLOBAL.loginKey)
    if (this.userInfo) {
      // 已登陆
      this.pageIndex = 1
    } else {
      // 登陆失败
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .test {
    font-size: 30px;
  }
</style>
