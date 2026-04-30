export default defineRouteMiddleware((to, from) => {
  if (process.client) {
    nextTick(() => {
      window.scrollTo(0, 0)
    })
  }
})
