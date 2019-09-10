const isH5 = process.env.TARO_ENV === 'h5'
const HOST = 'http://127.0.0.1:7001'
// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : JSON.stringify(HOST),
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: HOST,
          changeOrigin: true,  //是否跨域
          pathRewrite: {
            '^/api': ''
          },
        },
      }
    }
  }
}
