const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"http://127.0.0.1:7001"'
// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST,
  },
  weapp: {},
  h5: {
    devService: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
      }
    }
  }
}
