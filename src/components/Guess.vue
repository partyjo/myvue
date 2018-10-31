<template>
  <div class="page">
    <div>竞猜</div>
    <div class="form">
      <input type="number" name="amount" v-model="guessData.amount">
      <input type="number" name="mobile" v-model="guessData.mobile">
      <button v-on:click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guess',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      guessData: {
        mobile: '',
        amount: '0.00'
      }
    }
  },
  methods: {
    submit: function () {
      alert('1')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .page {
    background-color: #f2f2f2;
  }
</style>
