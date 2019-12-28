module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:8848',
        changeOrigin: true,
        pathRewrite: {
          '^proxy': ''
        }
      }
    }
  },
  productionSourceMap: true,
}
