<template>
  <div class="one" :msg="msg">one</div>
</template>

<script>
export default {
  name: 'One',
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
      console.log('one config')
    }
  },
  created () {
    console.log('one created')
  },
  mounted () {
    console.log('one mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .one {
    font-size: 30px;
  }
</style>
