<template>
  <div class="demo">{{msg}}</div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      msg: 'demo'
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .demo {
    font-size: 30px;
  }
</style>
