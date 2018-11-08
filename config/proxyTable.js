module.exports = {
  proxy: {
        '/server/nq': {    //将www.exaple.com印射为/apis
            target: 'http://partyjo.nextdog.cc/server/nq/',  // 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/server/nq': ''   //需要rewrite的,
            }              
        }
  }
}