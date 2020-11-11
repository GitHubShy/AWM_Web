/**
 * This is vue Router used for going to different pages
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 11:47 pm
 */
const customer_index = () => import('@v/customer/CustomerIndex.vue')

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
        path: 'salary',
        component: () => import('../views/staff/Salary.vue'),
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
            path: 'joblist',
            component: () => import('../views/job/JobList.vue'),

          },
          {
            path: 'myTasksList',
            name: 'myTasksList',
            component: () => import('../views/job/MyTasksList.vue'),
          },
          {
            path: 'jobdetails',
            component: () => import('../views/job/JobDetails.vue'),

          },
          {
            path: 'customerlist',
            component: () => import('../views/customer/CustomerList.vue'),
          },
          {
            path: 'aircraftdetails',
            name: 'aircraftdetails',
            component: () => import('../views/aircraft/AircraftDetails.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/uploadimage',
    name: 'UploadImage',
    component: () => import('../views/UploadImage.vue')
  },
  {
    path: '/customer_index',
    name: 'customer_index',
    component: customer_index,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
