<template>
  <div class="wechat-share"></div>
</template>

<script>
// import wx from 'weixin-js-sdk'

export default {
  name: 'WehatShare',
  props: {
    url: {
      type: String,
      default: 'http://partyjo.nextdog.cc/niuqi/'
    }
  },
  computed: {
    link () {
      // const shareData = {
      //   title: '凭实力预测双11成交额，赢iPhone Xs Max万元大奖',
      //   desc: '快来和我一起竞猜赢奖品吧！',
      //   link: this.url,
      //   imgUrl: 'http://partyjo.nextdog.cc/niuqi/static/img/max.jpeg'
      // }
      // this.share(shareData)
      // return this.url
    }
  },
  data () {
    return {
      shareData: {
        title: '凭实力预测双11成交额，赢iPhone Xs Max万元大奖',
        desc: '快来和我一起竞猜赢奖品吧！',
        link: this.url,
        imgUrl: 'http://partyjo.nextdog.cc/niuqi/static/img/max.jpeg'
      }
    }
  },
  methods: {
    wxConfig () {
      this.axios.post('/weixin/getWxsdk', {
        url: window.location.href
      }).then(res => {
        if (res.code === 0) {
          const data = res.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: [
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'onMenuShareWeibo',
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表
          })
          wx.ready(() => {
            this.share(this.shareData)
          })
        } else {
          this.$layer.msg('微信设置分享失败')
        }
      })
    },
    share (data) {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
      wx.updateAppMessageShareData({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl // 分享图标
      })
      // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
      wx.updateTimelineShareData({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl // 分享图标
      })
      wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl // 分享图标
      })
      wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl // 分享图标
      })
      // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: data.imgUrl // 分享图标
      })
    }
  },
  mounted () {
    this.wxConfig()
  }
}
</script>
