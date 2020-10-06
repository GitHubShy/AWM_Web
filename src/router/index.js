import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/staff',
    component: () => import('../views/staff/Staff.vue'),
    children: [
      {
        path: '',
        redirect: 'staffprofile'
      },
      {
        path: 'staffprofile',
        component: () => import('../views/staff/StaffProfile.vue'),
      },
      {
        path: 'staffmanage',
        component: () => import('../views/staff/StaffManage.vue'),
      },
      {
        path: 'workshop',
        component: () => import('../views/staff/Workshop.vue'),
        children: [
          {
            path: '',
            redirect: 'aircraftlist'
          },
          {
            path: 'aircraftlist',
            component: () => import('../views/aircraft/AircraftList.vue'),
          },
          {
            path: 'customerlist',
            component: () => import('../views/customer/CustomerList.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
