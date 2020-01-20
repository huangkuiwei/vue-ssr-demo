import createApp from './main'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 设置服务器端 router 的位置
    // 给路由推一条记录，上面的{ app,router }只是一个对象，没有走真正渲染那步，所以只有主动调用router.push()它才会执行这部分的代码，给我们匹配到我们要调用的这些组件
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    // router.onReady 基本上只有在服务端才会被用到，在路由记录被推进去的时候，路由所有的异步操作都做完的时候才会调用这个回调，比如在服务端被渲染的时候，获取一些数据的操作
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        // 匹配不到的路由，执行 reject 函数，并返回 404
        return reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}

// 返回的 app 是交给Bundle Renderer处理的，把html字符串渲染成html
