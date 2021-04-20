import Vue from 'vue'
import VueRouter from 'vue-router'
import pathIndex from '../views/index.vue'
import pathRegister from '../views/register.vue'
import pathAdmin from '../views/admin.vue'
import pathMain from '../views/main.vue'
import pathLogout from '../views/logout.vue'

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
    component: pathRegister // set register as path '/'
  },
  {
    path: '/admin',
    name: 'admin',
    component: pathAdmin // set admin as path '/'
  },
  {
    path: '/main',
    name: 'main',
    component: pathMain // set main as path '/'
  },
  {
    path: '/logout',
    name: 'logout',
    component: pathLogout // set logout as path '/'
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router