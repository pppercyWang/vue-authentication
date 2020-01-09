module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:8848',
        changeOrigin: true,
        pathRewrite: {
          '^proxy': ''  //将url中的proxy子串去掉
        }
      }
    }
  },
  productionSourceMap: true,
}
