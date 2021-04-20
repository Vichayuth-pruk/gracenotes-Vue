import Vue from 'vue'
import VueRouter from 'vue-router'
import pathIndex from '../views/index.vue'
import pathRegister from '../views/register.vue'
import pathAdmin from '../views/admin.vue'
import pathMain from '../views/main.vue'
import pathLogout from '../views/logout.vue'
import pathProfile from '../views/profile.vue'
import pathGrace from '../views/grace.vue'
import pathAddgrace from '../views/addgrace.vue'
import pathMygrace from '../views/mygrace.vue'
import pathView from '../views/view.vue'

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
  {
    path: '/profile',
    name: 'profile',
    component: pathProfile // set Profile as path '/'
  },
  {
    path: '/grace',
    name: 'grace',
    component: pathGrace // set Grace as path '/'
  },
  {
    path: '/addgrace',
    name: 'addgrace',
    component: pathAddgrace // set Addgrace as path '/'
  },
  {
    path: '/mygrace',
    name: 'mygrace',
    component: pathMygrace // set Mygrace as path '/'
  },
  {
    path: '/view/:id',
    name: 'view',
    component: pathView // set View as path '/'
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router