<template>
  <div class="page">
    <div class="tm"></div>
    <div class="logo"></div>
    <div class="piaodai">
      <div class="zanzhu"><Zanzhu /></div>
    </div>
    <div class="msg">
      <div class="tip">提醒您</div>
      <div class="tip">您已提交竞猜金额</div>
      <div class="amount">{{this.result.amount}}亿元</div>
    </div>
    <div class="qr">
      <div>开奖时间</div>
      <div class="time">2018.11.12</div>
      <div>中奖名单公布于 牛气电商公众号</div>
      <div class="code"></div>
      <div>扫码关注 查收中奖结果</div>
    </div>
    <div class="yx">
      <div class="yao">邀请好友竞猜，助你一起赢奖品</div>
    </div>
  </div>
</template>

<script>
import Zanzhu from './Zanzhu'
import cache from '../libs/cache'

export default {
  name: 'Result',
  components: {
    Zanzhu
  },
  data () {
    return {
      result: {
        amount: '2000.00'
      }
    }
  },
  methods: {
    getGuessResult () {
      this.axios.get('/guess/get?openid=' + this.userInfo.openid).then(res => {
        if (res.code === 0) {
          cache.set(this.resultKey, res.data)
          this.result = res.data
        } else {
          this.$layer.msg(res.msg)
        }
      })
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    this.userInfo = cache.get(this.loginKey)
    const result = cache.get(this.resultKey)
    if (result) {
      this.result = result
    } else {
      this.getGuessResult()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .wd(@w, @h) {
    width: @w * 1px;
    height: @h * 1px;
  }
  .bg(@url) {
    background-image: url('@{url}');
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
  .ps(@l, @t) {
    position: absolute;
    left: @l * 1px;
    top: @t * 1px;
  }
  .pb(@l, @b) {
    position: absolute;
    left: @l * 1px;
    bottom: @b * 1px;
  }
  .ptc(@t) {
    position: absolute;
    left: 50%;
    top: @t * 1px;
    transform: translate(-50%);
  }
  .pbc(@b) {
    position: absolute;
    left: 50%;
    bottom: @b * 1px;
    transform: translate(-50%);
  }
  .px(@l, @t) {
    position: fixed;
    left: @l * 1px;
    top: @t * 1px;
  }

  .page {
    position: relative;
    height: 1206px;
  }

  .tm {
    .ptc(0);
    .wd(554, 620);
    .bg('../assets/tm2.png');
  }

  .logo {
    .ps(30, 30);
    .wd(158, 48);
    .bg('../assets/niuqi.png');
  }

  .piaodai {
    .ptc(100);
    .wd(674, 286);
    .bg('../assets/piaodai.png');
  }

  .zanzhu {
    width: 750px;
    .pbc(-10);
  }

  .msg {
    .ps(0, 400);
    width: 750px;
    text-align: center;

    .tip {
      color: #fff;
      font-weight: bold;
      font-size: 60px;
    }

    .amount {
      color: #ffff33;
      font-size: 48px;
      font-weight: bold;
    }
  }

  .qr {
    .ps(0, 680);
    .wd(750, 388);
    color: #fff;
    font-size: 30px;
    text-align: center;

    .code {
      margin: 20px auto;
      .wd(206, 206);
      .bg('../assets/qr.png');
    }
  }

  .yx {
    position: fixed;
    left: 0;
    bottom: 0;
    .wd(750, 252);
    .bg('../assets/yx.png');

    .yao {
      .pbc(100);
      .wd(492, 72);
      line-height: 72px;
      text-align: center;
      border: 2px solid #663333;
      font-size: 24px;
      color: #663333;
      border-radius: 36px;
      background-color: #fff;
    }
  }
</style>
