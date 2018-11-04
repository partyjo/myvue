<template>
  <a href="http://m.baidu.com" class="zanzhu">{{name}}</a>
</template>

<script>
export default {
  name: 'Zanzhu',
  data () {
    return {
      name: '点击了解小亚通 >>'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .zanzhu {
    display: block;
    text-align: center;
    color: #ffff33;
    font-size: 26px;
    padding: 20px 0;
  }
</style>
