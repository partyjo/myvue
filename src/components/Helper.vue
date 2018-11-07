<template>
  <div class="users">
    <div class="num">{{msg}}</div>
    <ul>
      <li v-for="item in users" :key="item.openid">
        <span class="headimg" :style="{ 'background-image': 'url('+item.headimgurl+')'}"></span>
        <span class="nickname">{{item.nickname}}</span>
        <span class="amount">竞猜{{item.amount}}亿元</span>
      </li>
    </ul>
  </div>
</template>

<script>
// import cache from '../libs/cache'

export default {
  name: 'Helper',
  props: ['isHelper', 'userid'],
  data () {
    return {
      users: []
    }
  },
  computed: {
    msg () {
      return this.isHelper === '1' ? `已有${this.users.length}人为TA竞猜！` : `已有${this.users.length}人为你竞猜！`
    }
  },
  methods: {
    getHelper () {
      this.axios.get('/help/page?userid=' + this.userid).then(res => {
        if (res.code === 0) {
          this.users = res.data
        }
      })
    }
  },
  mounted () {
    this.getHelper()
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

  .users {
    margin-top: 50px;
    padding: 20px 0;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.1);

    .num {
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 24px;
    }

    li {
      position: relative;
      margin: 20px auto 0;
      width: 500px;
      height: 68px;
      overflow: hidden;
    }

    .headimg {
      display: inline-block;
      .wd(64, 64);
      margin-right: 36px;
      background-color: #fff;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .nickname {
      .ps(140, 20);
      width: 140px;
      overflow: hidden;
    }

    .amount {
      .ps(300, 20);
    }
  }
</style>
