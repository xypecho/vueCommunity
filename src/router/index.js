import Vue from 'vue'
import Router from 'vue-router'
import all from '../components/all/all'
import good from '../components/good/good'
import weex from '../components/weex/weex'
import share from '../components/share/share'
import ask from '../components/ask/ask'
import job from '../components/job/job'
import release from '../components/release/release'
import message from '../components/message/message'
import personal from '../components/personal/personal'
import personalcenter from '../components/personalcenter/personalcenter'


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
      component: all
    },
    {
      path: '/weex',
      component: all
    },
    {
      path: '/share',
      component: all
    },
    {
      path: '/ask',
      component: all
    },
    {
      path: '/job',
      component: all
    },
    {
      path: '/release',
      component: release
    },
    {
      path: '/message',
      component: message
    },
    {
      path: '/personal',
      component: personal
    },
    {
      path: '/personalcenter',
      component: personalcenter
    }
  ]
})
