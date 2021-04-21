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
import pathReport from '../views/report.vue'
import pathViewreport from '../views/viewreport.vue'
import pathMview from '../views/mview.vue'
import pathAddsocial from '../views/addsocial.vue'
import pathMsocialedit from '../views/msocialedit.vue'
import pathMsocial from '../views/msocial.vue'
import pathSocial from '../views/social.vue'

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
  {
    path: '/report',
    name: 'report',
    component: pathReport // set Report as path '/'
  },
  {
    path: '/viewreport/:id',
    name: 'viewreport',
    component: pathViewreport // set Viewreport as path '/'
  },
  {
    path: '/mview/:id',
    name: 'mview',
    component: pathMview // set Mview as path '/'
  },
  {
    path: '/addsocial/:id',
    name: 'addsocial',
    component: pathAddsocial // set Addsocial as path '/'
  },
  {
    path: '/msocialedit/:id',
    name: 'msocialedit',
    component: pathMsocialedit // set Msocialedit as path '/'
  },
  {
    path: '/msocial',
    name: 'msocial',
    component: pathMsocial // set Msocial as path '/'
  },
  {
    path: '/social/:id',
    name: 'social',
    component: pathSocial // set Social as path '/'
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router