<template>
  <div class="page">
    <Login />
    <WechatShare v-if="isWxShare" :url="shareUrl" />
    <div class="logo"></div>
    <div class="result">
      <div class="tm"></div>
      <div class="gx">
        <div class="gongxi"></div>
        <div class="tip">您已提交竞猜金额<span class="amount">{{this.result.amount}}</span>亿元</div>
        <div class="tip">让我们一同见证奇迹！</div>
      </div>
    </div>
    <div class="yaoq">
      <div class="msg">邀请好友竞猜，额外为你贡献竞猜额</div>
      <div class="yaoq-btn" v-on:click="showShare"></div>
    </div>
    <Helpers :users="users" />
    <div class="qr">
      <div class="title">开奖时间</div>
      <div class="msg">扫码关注，查收中奖结果</div>
      <img src="../assets/qr.png" alt="qr" class="code">
      <div class="time">2018.11.12</div>
      <div class="msg">中奖名单公布于 牛气电商公众号</div>
    </div>
    <div class="piaodai">
      <div class="zanzhu"><Zanzhu /></div>
    </div>
    <div class="yx"></div>
    <Share :show.sync="isShowShare" />
  </div>
</template>

<script>
import WechatShare from './WechatShare'
import Login from './Login'
import Share from './Share'
import Zanzhu from './Zanzhu'
import Helpers from './Helpers'
import cache from '../libs/cache'

export default {
  name: 'Result',
  components: {
    Zanzhu,
    Share,
    Helpers,
    WechatShare,
    Login
  },
  data () {
    return {
      result: {},
      isShowShare: false,
      shareUrl: '',
      isWxShare: false,
      users: []
    }
  },
  methods: {
    getHelpers (userid) {
      this.axios.get('/help/page?userid=' + userid).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.users = res.data
        }
      })
    },
    setWxShare () {
      this.shareUrl = 'http://partyjo.nextdog.cc/niuqi/#/' + 'help/' + this.result.id
      this.isWxShare = true
    },
    showShare () {
      this.isShowShare = true
    },
    getGuessResult () {
      this.axios.get('/guess/get?openid=' + this.userInfo.openid).then(res => {
        if (res.code === 0) {
          cache.set(this.resultKey, res.data)
          this.result = res.data
          this.getHelpers(this.result.openid)
          this.setWxShare()
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 300)
        } else {
          this.$layer.msg(res.msg)
        }
      })
    }
  },
  mounted () {
    this.loginKey = this.GLOBAL.loginKey
    this.resultKey = this.GLOBAL.resultKey
    this.userInfo = cache.get(this.loginKey)
    if (this.userInfo) {
      const result = cache.get(this.resultKey)
      if (result) {
        this.result = result
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 300)
        this.getHelpers(this.result.openid)
        this.setWxShare()
      } else {
        this.getGuessResult()
      }
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
    background-image: url('../assets/bg.png');
    background-size: 100% auto;
    background-repeat: repeat-y;
  }
  .logo {
    .ps(30, 30);
    .wd(158, 48);
    .bg('../assets/niuqi.png');
  }

  .result {
    width: 750px;
    height: 400px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    overflow: hidden;

    .tm {
      margin: 0 auto;
      .wd(554, 620);
      .bg('../assets/tm2.png');
    }

    .gx {
      .ps(0, 120);
      width: 750px;
    }

    .gongxi {
      margin: 0 auto;
      .wd(670 ,118);
      .bg('../assets/gongxini.png');
    }
    .tip {
      color: #fff;
      line-height: 1.45;
    }

    .amount {
      color: #ffff33;
    }
  }

  .yaoq {
    margin-top: 60px;
    color: #fff;
    text-align: center;

    .msg {
      font-size: 24px;
    }

    .yaoq-btn {
      margin: 20px auto 0;
      .wd(400, 72);
      .bg('../assets/yaoqing-haoyou.png');
    }
  }

  .qr {
    margin-top: 50px;
    .wd(750, 388);
    color: #fff;
    text-align: center;

    .title {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .msg {
      font-size: 24px;
    }

    .code {
      margin: 20px auto 0;
      .wd(206, 206);
      .bg('../assets/qr.png');
    }

    .time {
      color: #ffff33;
    }
  }

  .piaodai {
    position: relative;
    margin: 80px auto 0;
    .wd(674, 286);
    .bg('../assets/piaodai.png');
  }

  .zanzhu {
    width: 750px;
    .pbc(-20);
  }

  .yx {
    .wd(750, 252);
    .bg('../assets/yx.png');
  }
</style>
