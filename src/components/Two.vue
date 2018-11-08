<template>
  <div class="two">{{msg}}</div>
</template>

<script>
export default {
  name: 'Two',
  props: {
    url: {
      type: String,
      default: 'http:m.baidu.com'
    }
  },
  data () {
    return {}
  },
  computed: {
    msg () {
      this.config()
      return this.url
    }
  },
  methods: {
    config () {
      console.log('two config')
    }
  },
  created () {
    console.log('two created')
  },
  mounted () {
    console.log('two mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .two {
    font-size: 30px;
  }
</style>
