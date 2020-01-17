const express = require('express')
const server = express()
const path = require('path')
const fs = require('fs')

// 获取template模板文件，fs.readFileSync读取文件时一定要加字符编码'utf-8',否则无法正常渲染
const template = fs.readFileSync(path.resolve(__dirname, 'src/index.template.html'), 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const VueRenderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template,
  clientManifest
})

// 静态文件
server.use('/js', express.static(path.resolve(__dirname, './dist/js')))
server.use('/css', express.static(path.resolve(__dirname, './dist/css')))
server.use('/img', express.static(path.resolve(__dirname, './dist/img')))

server.get('*', (req, res) => {
  const context = {
    url: req.url
  }
  VueRenderer.renderToString(context, (err, html) => {
    res.setHeader('Content-Type', 'text/html;charset-utf-8')
    if (err) {
      res.status(500).end('NetWork Error')
    } else {
      res.status(200).end(html)
    }
  })
})

server.listen(4000, () => {
  console.log('服务已启动')
})
