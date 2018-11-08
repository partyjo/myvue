module.exports = {
  proxy: {
        '/server/niuqi': {    //将www.exaple.com印射为/apis
            target: 'http://partyjo.nextdog.cc/server/niuqi/',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/server/niuqi': ''   //需要rewrite的,
            }              
        }
  }
}