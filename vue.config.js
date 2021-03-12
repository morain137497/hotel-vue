module.exports = {
    productionSourceMap: false,
    // publicPath: '/vote',
    chainWebpack: config =>{
        // 发布模式
        config.when( process.env.NODE_ENV === 'production', config => {
            config.set('externals', {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
            })
            config.plugin('html').tap( args => {
                args[0].isProd = true
                return args
            } )
        } )
        // 开发模式
        config.when( process.env.NODE_ENV === 'development', config => {
            config.plugin('html').tap( args => {
                args[0].isProd = false
                return args
            } )

        } )
    },
    devServer: {
        proxy: {  //配置跨域
            '/api': {
                target: 'http://service.qunju.cn',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                     */
                    '^/api': ''
                }
            },
        }
    },
}
