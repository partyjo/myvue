<template>
  <div>
    <Login v-if="!isLogin"/>
    <div v-else class="page">
      <div class="head">
        <div class="tm"></div>
        <div class="logo"></div>
        <div class="user">
          <div class="headimg" :style="{ 'background-image': 'url('+helperInfo.headimgurl+')'}"></div>
          <div class="nickname">{{helperInfo.nickname}}</div>
          <div class="msg">我正在凭实力赢iPhone Xs Max，一起来呀！</div>
        </div>
      </div>
      <div class="banner">
      </div>
      <div class="prizes"></div>
      <div class="guess">
        <div class="title"></div>
        <div class="form">
          <div class="form-group form-field-amount">
            <input type="number" name="amount" v-model.number="guessData.amount" placeholder="输入竞猜金额，精确到2位小数">
            <span>亿元</span>
          </div>
          <button class="submit" v-on:click="submit"></button>
        </div>
      </div>
      <a class="iwant" href="http://partyjo.nextdog.cc/niuqi/#/"></a>
      <Helper v-if="isShowHelper" isHelper=1 :userid="helperInfo.openid" />
      <div class="piaodai">
        <div class="zanzhu"><Zanzhu /></div>
      </div>
      <div class="yx"></div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '../libs/math'
import cache from '../libs/cache'
import Zanzhu from './Zanzhu'
import Helper from './Helper'
import Login from './Login'

export default {
  name: 'Help',
  components: {
    Zanzhu,
    Helper,
    Login
  },
  data () {
    return {
      helperInfo: {},
      guessData: {
        amount: ''
      },
      isShowHelper: false,
      isLogin: false
    }
  },
  methods: {
    gethelper () {
      const id = this.$route.params.id
      console.log(id)
      this.axios.get('/guess/get?id=' + id).then(res => {
        if (res.code === 0) {
          if (res.data.openid === this.userInfo.openid) {
            window.location.href = 'http://partyjo.nextdog.cc/#/'
          } else {
            this.helperInfo = res.data
            this.isShowHelper = true
          }
        } else {
          this.$layer.msg('当前页面出错了')
        }
      })
    },
    submit () {
      const data = this.guessData
      if (!this.userInfo) {
        this.$layer.msg('您还没有登陆')
        return false
      }
      if (!data.amount) {
        this.$layer.msg('竞猜金额没有填写哦')
        return false
      }
      if (this.helperInfo.openid === this.userInfo.openid) {
        this.$layer.msg('自己不能帮自己噢')
        return false
      }
      data.amount = formatPrice(data.amount)
      data.openid = this.userInfo.openid
      data.headimgurl = this.userInfo.headimgurl
      data.nickname = this.userInfo.nickname
      data.userid = this.helperInfo.openid
      this.axios.post('/help/add', data).then(res => {
        if (res.code === 0) {
          cache.set(this.helpKey, res.data)
          this.isShowHelper = false
          setTimeout(() => {
            this.isShowHelper = true
          }, 300)
        }
        this.$layer.msg(res.msg)
      })
    },
    reload () {
      window.location.reload()
    },
    getGuessResult () {
      this.axios.get('/guess/get?openid=' + this.userInfo.openid).then(res => {
        if (res.code === 0) {
          cache.set(this.resultKey, res.data)
          this.reload()
        }
      })
    }
  },
  created () {
    this.loginKey = this.GLOBAL.loginKey
    this.helpKey = this.GLOBAL.helpKey
    this.userInfo = cache.get(this.loginKey)
    if (this.userInfo) {
      this.isLogin = true
      this.gethelper()
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
    width: 750px;
    background-color: #f2f2f2;
    background-image: url('../assets/bg.png');
    background-size: 100% auto;
    background-repeat: repeat-y;
  }

  .head {
    position: relative;
    height: 240px;
    overflow: hidden;
  }

  .logo {
    .ps(30, 30);
    .wd(158, 48);
    .bg('../assets/niuqi.png');
  }

  .tm {
    margin: 0 auto;
    .wd(554, 620);
    .bg('../assets/tm2.png');
  }

  .user {
    .ps(0, 60);
    .wd(750, 300);
    color: #fff;
    font-size: 24px;

    .headimg {
      .ps(30, 60);
      .wd(70, 70);
      background-size: cover;
      background-color: #fff;
    }

    .nickname {
      .ps(120, 65);
    }

    .msg {
       .ps(120, 100);
    }
  }

  .banner {
     margin: 0 auto;
    .wd(712, 348);
    .bg('../assets/banner.png');
  }

  .prizes {
    margin: 0 auto;
    .wd(704, 1078);
    .bg('../assets/prizes.png');
  }

  .guess {
    margin-top: 50px;
    width: 750px;

    .title {
      margin: 0 auto;
      .wd(656, 120);
      .bg('../assets/helpFriend.png');
    }
  }

  .form {
    margin-top: 40px;
    text-align: center;

    .form-group {
      margin: 0 auto 40px;
      position: relative;
      .wd(566, 106);
      box-sizing: border-box;
      background-color: #fff;
      padding-top: 38px;
    }

    input {
      box-sizing: border-box;
      padding: 0 20px;
      width: 566px;
      height: 30px;
      border: none;
      outline: none;
      font-size: 30px;
      color: #663333;
      border-radius: 0;
      line-height: normal;

      &::-webkit-input-placeholder {
        font-size: 28px;
        color: #cc9999;
        line-height: 1;
      }
    }

    span {
      position: absolute;
      .wd(106, 106);
      top: 0;
      right: 0;
      text-align: center;
      line-height: 106px;
      background-color: #ccc;
      font-size: 30px;
      color: #663333;
      font-weight: bold;
    }

    .submit {
      .wd(560, 100);
      .bg('../assets/btn.png');
      background-color: transparent;
      border: none;
      outline: none;
    }
  }

  .iwant {
    display: block;
    margin: 40px auto;
    .wd(560, 100);
    .bg('../assets/woyeyao.png');
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
