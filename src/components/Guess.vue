<template>
  <div class="page">
    <div class="light-bg"></div>
    <div class="light"></div>
    <div class="tm"></div>
    <div class="lunbo" v-if="lists.length">
      <div class="scroll">
        <ul>
          <li>
            <span class="headimgurl" v-bind:style="{ 'background-image': 'url(' + list.headimgurl + ')' }"></span>
            <span class="txt">{{list.nickname}} 1秒前 参与了竞猜</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner">
      <div class="time">活动截止时间{{endTime}}</div>
    </div>
    <div class="timer">
      <div class="timer-text">
        <span class="h">{{timer.h}}</span>
        <span class="m">{{timer.m}}</span>
        <span class="s">{{timer.s}}</span>
      </div>
    </div>
    <div class="prizes"></div>
    <div class="btns">
      <div class="rule" v-on:click="showModal('0')"></div>
      <div class="jingcai" v-on:click="showModal('1')"></div>
    </div>
    <div class="cankao"></div>
    <div class="guess">
      <div class="title"></div>
      <div class="form">
        <div class="form-group form-field-amount">
          <input type="number" name="amount" v-model.number="guessData.amount" placeholder="输入竞猜金额，精确到2位小数">
          <span>亿元</span>
        </div>
        <div class="form-group form-field-mobile">
          <input type="number" name="mobile" v-model.number="guessData.mobile" placeholder="输入领奖手机号后参与活动">
        </div>
        <button class="submit" v-on:click="submit"></button>
      </div>
    </div>
    <div class="copyright">
      <div class="logo"></div>
      <div class="zanzhu"><Zanzhu /></div>
      <div class="jieshi">.此活动最终解释权归牛气学堂所有</div>
    </div>
    <div v-if="modalIndex === 0" class="modal modal-rule">
      <div class="title"></div>
      <ul>
        <li>中奖结果：11/12公布于公众号牛气电商</li>
        <li>领取方式：提交竞猜金额后，分享此活动到朋友圈；中奖后凭朋友圈截图，领取奖品</li>
        <li>评选规则：最接近双11实际成交金额的7位用户；竞猜金额相同者，先猜先得</li>
      </ul>
      <div class="btn" v-on:click="hideModal"></div>
    </div>
    <div v-else-if="modalIndex === 1" class="modal modal-jingcai">
      <div class="title"></div>
      <ul>
        <li>可邀请10位好友为你贡献10个竞猜金额，帮你赢取奖品</li>
        <li>关注公众号【牛气电商】，第一时间查看竞猜结果</li>
      </ul>
      <div class="btn" v-on:click="hideModal"></div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { formatPrice } from '../libs/math'
import { sTohms } from '../libs/date'
import { isApple } from '../libs/ua'
import cache from '../libs/cache'
import Zanzhu from './Zanzhu'

export default {
  name: 'Guess',
  components: {
    Zanzhu
  },
  data () {
    return {
      endTime: '11月11日20:00',
      timer: {
        h: 0,
        m: 0,
        s: 0
      },
      listIndex: 0,
      lists: [],
      guessData: {
        mobile: '',
        amount: ''
      },
      modalIndex: null
    }
  },
  computed: {
    list () {
      return this.lists[this.listIndex]
    }
  },
  methods: {
    showModal (index) {
      this.modalIndex = parseInt(index)
    },
    hideModal () {
      this.modalIndex = null
    },
    countDown () {
      const nowTime = new Date().getTime()
      let endTime = 0
      if (isApple) {
        endTime = new Date('2018-11-11 20:00:00'.replace(/-/g, '/')).getTime()
      } else {
        endTime = new Date('2018-11-11 20:00:00').getTime()
      }
      let seconds = parseInt((endTime - nowTime) / 1000)
      if (seconds <= 0) {
        return false
      }
      this.timer = sTohms(seconds)
      let clock = window.setInterval(() => {
        if (seconds <= 0) {
          window.clearInterval(clock)
        } else {
          seconds -= 1
          this.timer = sTohms(seconds)
        }
      }, 1000)
    },
    getResult () {
      this.axios.get('/guess/page?pageIndex=1&pageSize=10').then(res => {
        if (res.code === 0 && res.data && res.data.length) {
          this.lists = this.createUser(res.data)
        } else {
          this.lists = this.createUser()
        }
        console.log(this.lists)
        this.danmu()
      })
    },
    danmu () {
      const len = this.lists.length - 2
      window.setInterval(() => {
        if (this.listIndex > len) {
          this.listIndex = 0
        } else {
          this.listIndex += 1
        }
      }, 2000)
    },
    createUser (arr = []) {
      const names = ['莹莹', '幸福妈咪', '玉儿', '逝去的青春', '洪哲', '老温', 'Amiga', 'dove', '二三事', '不负超华', '一味', '仙子', '潘', 'Sunny', '恒', 'P', 'Azzzz', '布丁', 'LL', '暖暖', '朱明', '刘水琴', '一把肥仔', '非理性', '漫漫看', 'A 维扬', '肖百万', '蓉']
      const randomSort = () => {
        return Math.random() > 0.5 ? -1 : 1
      }
      const users = []
      for (let index = 0; index < names.length; index++) {
        users.push({
          nickname: names[index],
          headimgurl: '//partyjo.nextdog.cc/niuqi/static/users/t' + (index + 1) + '.jpg'
        })
      }
      for (let index = 0; index < arr.length; index++) {
        users.unshift(arr[index])
      }
      users.sort(randomSort)
      return users
    },
    submit () {
      const data = this.guessData
      if (!this.userInfo) {
        this.$layer.msg('您还没有登陆')
        return false
      }
      if (data.mobile.toString().length !== 11) {
        this.$layer.msg('手机号格式不正确')
        return false
      }
      if (!data.amount) {
        this.$layer.msg('竞猜金额没有填写哦')
        return false
      }
      data.amount = formatPrice(data.amount)
      data.openid = this.userInfo.openid
      data.headimgurl = this.userInfo.headimgurl
      data.nickname = this.userInfo.nickname
      this.axios.post('/guess/add', data).then(res => {
        if (res.code === 0) {
          cache.set(this.resultKey, res.data)
          this.reload()
        } else {
          this.$layer.msg(res.msg)
        }
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
        } else {
          this.getResult()
        }
      })
    }
  },
  created () {
    this.countDown()
    this.loginKey = this.GLOBAL.loginKey
    this.userInfo = cache.get(this.loginKey)
    this.resultKey = this.GLOBAL.resultKey
    if (cache.get(this.resultKey)) {
      this.reload()
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

  .modal {
    .px(0, 0);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.38);
    .bg('../assets/modal-bg.png');

    .btn {
      margin: 0 auto;
      .wd(370, 90);
      .bg('../assets/iknow.png');
    }

    .title {
      .wd(310, 80);
      margin: 300px auto 40px;
      .bg('../assets/rule.png');
    }

    ul {
      list-style: none;
      padding: 10px 100px;
      margin: 0;
    }

    li {
      position: relative;
      padding-left: 60px;
      margin-bottom: 20px;
      color: #fff;
      font-size: 30px;
      line-height: 1.65;
      background-image: url('../assets/num-bg.png');
      background-repeat: no-repeat;
      background-size: 59px 54px;
      min-height: 60px;

      &::before {
        .ps(5, 5);
        display: block;
        .wd(56, 56);
        text-align: center;
        color: #663333;
      }

      &:nth-child(1) {
        &::before {
          content: '1';
        }
      }

      &:nth-child(2) {
        &::before {
          content: '2';
        }
      }

      &:nth-child(3) {
        &::before {
          content: '3';
        }
      }

      &:nth-child(4) {
        &::before {
          content: '4';
        }
      }
    }
  }

  .modal-jingcai {
    .title {
      .bg('../assets/gonglve.png')
    }

    .btn {
      .ptc(800);
    }
  }

  .page {
    position: relative;
    background-color: #f2f2f2;
    background-image: url('../assets/bg.png');
    background-size: 100% auto;
    background-repeat: repeat-y;
    height: 4750px;
  }

  .light-bg {
    .wd(750, 600);
    .bg('../assets/bg2.png');
  }

  .tm {
    .ptc(0);
    .wd(180, 90);
    .bg('../assets/tm.png')
  }

  .light {
    .ps(0, 0);
    .wd(750, 325);
    .bg('../assets/light.png');
  }

  .lunbo {
    .ps(0, 120);
    .wd(750, 70);
  }

  .scroll {
    height: 100%;
    overflow: hidden;

    ul {
      margin: 0;
      list-style: none;
      padding: 0;
      overflow-y: auto;
      li {
        position: relative;
        margin: 0 auto;
        .wd(530, 70);
      }
    }

    .headimgurl {
      .ps(0, 5);
      display: inline-block;
      .wd(60, 60);
      background-size: cover;
      background-color: #cc9999;
      border-radius: 50%;
    }

    .txt {
      .ps(100, 10);
      box-sizing: border-box;
      padding: 0 20px;
      .wd(425, 56);
      line-height: 56px;
      background-color: #cc3333;
      color: #fff;
      font-size: 26px;
      text-align: center;
      white-space: nowrap;
      border-radius: 28px;
      overflow: hidden;
    }
  }

  .banner {
    .ptc(200);
    .wd(712, 348);
    .bg('../assets/banner.png');
  }

  .time {
    .pbc(30);
    white-space: nowrap;
    font-size: 28px;
    color: #fff;
  }

  .timer {
    .ps(0, 552);
    .wd(750, 676);
    .bg('../assets/timer.png');
  }

  .timer-text {
    .pbc(100);
    width: 420px;
    font-size: 30px;
    color: #663333;
    font-weight: bold;

    .h, .m, .s {
      float: left;
      display: block;
      .wd(78, 78);
      text-align: center;
      line-height: 78px;
    }

    .m {
      margin-left: 90px;
    }

    .s {
      margin-left: 50px;
    }
  }

  .prizes {
    .ptc(1300);
    .wd(704, 1078);
    .bg('../assets/prizes.png');
  }

  .btns {
    width: 750px;
    overflow: hidden;
    .ptc(2460);
    text-align: center;

    .rule, .jingcai {
      .wd(290, 84);
      display: inline-block;
    }

    .rule {
      margin-right: 40px;
      .bg('../assets/rule-btn.png');
    }

    .jingcai {
      .bg('../assets/guess-btn.png');
    }
  }

  .cankao {
    .ptc(2600);
    .wd(674, 1084);
    .bg('../assets/cankao.png');
  }

  .guess {
    .ps(0, 3750);
    width: 750px;

    .title {
      margin: 0 auto;
      .wd(656, 120);
      .bg('../assets/yuji.png');
    }
  }

  .form {
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

  .copyright {
    .pb(0, 40);
    width: 750px;

    .logo {
      margin: 0 auto;
      .wd(412, 70);
      .bg('../assets/logo.png');
    }

    .zanzhu {
      padding: 20px 0;
    }

    .jieshi {
      text-align: center;
      color: #fff;
      font-size: 30px;
      font-weight: bold;
    }
  }
</style>
