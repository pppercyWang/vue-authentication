const CompressionWebpackPlugin = require('compression-webpack-plugin') //gzip压缩
const productionGzipExtensions = ['js', 'css']
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
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ]
  },
  productionSourceMap: false,
}
