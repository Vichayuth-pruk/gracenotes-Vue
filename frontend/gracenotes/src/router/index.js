import Vue from 'vue'
import VueRouter from 'vue-router'
import pathIndex from '../views/index.vue'
import pathRegister from '../views/register.vue'

Vue.use(VueRouter)
const routes = [
    {
      path: '/',
      name: 'index',
      component: pathIndex // set index as path '/'
    },
    {
        path: '/register',
        name: 'register',
        component: pathRegister // set index as path '/'
      }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  })
  
  export default router