const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WebpackNodeExternals = require('webpack-node-externals')
// 合并对象，类似 webpack-merge
const LodashMerge = require('lodash.merge')

module.exports = {
  configureWebpack: () => {
    if (process.env.TARGET === 'node') {
      return {
        // 将 entry 指向应用程序的 server entry 文件
        entry: {
          app: path.resolve(__dirname, 'src/entry-server.js')
        },
        // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
        output: {
          libraryTarget: 'commonjs2'
        },
        // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
        // 并且还会在编译 Vue 组件时，
        // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
        target: 'node',
        // 对 bundle renderer 提供 source map 支持
        devtool: 'source-map',
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，
        // 并生成较小的 bundle 文件。
        externals: WebpackNodeExternals({
          // 不要外置化 webpack 需要处理的依赖模块。
          // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
          // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
          whitelist: /\.css&/
        }),
        plugins: [
          // 这是将服务器的整个输出
          // 构建为单个 JSON 文件的插件。
          // 默认文件名为 `vue-ssr-server-bundle.json`
          new VueSSRServerPlugin()
        ]
      }
    } else {
      return {
        // 将 entry 指向应用程序的 client entry 文件
        entry: {
          app: path.resolve(__dirname, 'src/entry-client.js')
        },
        plugins: [
          // 此插件在输出目录中
          // 生成 `vue-ssr-client-manifest.json`。
          // 然后，你就可以使用生成的客户端清单 (client manifest) 以及页面模板。
          new VueSSRClientPlugin()
        ]
      }
    }
  },
  chainWebpack: config => {
    if (process.env.TARGET === 'node') {
      // 如果你使用 CommonsChunkPlugin 或者 optimization 选项，请确保仅在客户端配置 (client config) 中使用，因为服务器包需要单独的入口 chunk。
      config.optimization.splitChunks(undefined)
    }
    // 这一步必须要加，如果没有加的话，服务端一直会报 e._sseNode is not a function
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(option => {
        return LodashMerge(option, {
          optimizeSSR: false
        })
      })
  }
}
