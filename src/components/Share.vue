<template>
  <div class="share" v-if="show" @click="hide"></div>
</template>

<script>
export default {
  name: 'Share',
  props: ['show'],
  methods: {
    hide () {
      this.$emit('update:show', false)
    }
  },
  created () {
    console.log('share created')
  },
  mounted () {
    console.log('share mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .share {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.68);
    background-image: url('../assets/share-tip.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 0 -100px;
  }
</style>
