import Vue from 'vue'
import Router from 'vue-router'
import all from '../components/all/all'
import good from '../components/good/good'
import weex from '../components/weex/weex'
import share from '../components/share/share'
import ask from '../components/ask/ask'
import job from '../components/job/job'

Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path:'/',
  		redirect:'all'
  	},
    {
      path: '/all',
      component: all
    },
    {
      path: '/good',
      component: good
    },
    {
      path: '/weex',
      component: weex
    },
    {
      path: '/share',
      component: share
    },
    {
      path: '/ask',
      component: ask
    },
    {
      path: '/job',
      component: job
    }
  ]
})
