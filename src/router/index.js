import Vue from 'vue'
import Router from 'vue-router'
import Page from '../components/page/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/all',
      component: Page
    },
    {
      path: '/good',
      component: Page
    },
    {
      path: '/weex',
      component: Page
    },
    {
      path: '/share',
      component: Page
    },
    {
      path: '/ask',
      component: Page
    },
    {
      path: '/job',
      component: Page
    }
  ]
})
