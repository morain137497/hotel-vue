module.exports = {
    productionSourceMap: false,
    publicPath: '/admin',
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
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://service.qunju.cn', // 'http://47.99.91.10:8008/psp', 'https://100healthcare.cn/psp'
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },


}
