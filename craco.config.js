module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        //  抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all', // 对于所有的包都采用此方式优化
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/, // 匹配到项目中引入的antd
              priority: 100, // 优先级
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/, // 匹配项目中引入的react-dom
              priority: 99, // 优先级
            },
            vendors: {
              // 第三方插件,antd和reactDom也是放到node_modules，为什么要单独写，是为了可以独立出来
              name: 'vendors-chunk',
              test: /node_modules/, // 匹配到项目中的node_modules目录，存储所有第三方库的
              priority: 98, // 优先级
            },
          },
        }
      }
      return webpackConfig
    },
  },
  devServer: {
    // 代理
    port: 8000, // B端 前端
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
