import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _062571e3 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1848edbc = () => interopDefault(import('../pages/my.vue' /* webpackChunkName: "pages/my" */))
const _0dbd5ba3 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _52c5ece4 = () => interopDefault(import('../pages/reply.vue' /* webpackChunkName: "pages/reply" */))
const _1dde87ce = () => interopDefault(import('../pages/stats.vue' /* webpackChunkName: "pages/stats" */))
const _13cdf870 = () => interopDefault(import('../pages/table.vue' /* webpackChunkName: "pages/table" */))
const _3c7dcecc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _062571e3,
    name: "login"
  }, {
    path: "/my",
    component: _1848edbc,
    name: "my"
  }, {
    path: "/profile",
    component: _0dbd5ba3,
    name: "profile"
  }, {
    path: "/reply",
    component: _52c5ece4,
    name: "reply"
  }, {
    path: "/stats",
    component: _1dde87ce,
    name: "stats"
  }, {
    path: "/table",
    component: _13cdf870,
    name: "table"
  }, {
    path: "/",
    component: _3c7dcecc,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
