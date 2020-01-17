import createApp from './main'

export default context => {
  const { app, router } = createApp()
  return new Promise((resolve, reject) => {
    router.push(context.url)
    router.onReady(() => {
      const matchRoutes = router.getMatchedComponents()
      if (!matchRoutes.length) {
        return reject({ code: 404 })
      }
      return resolve(app)
    }, reject)
  })
}
