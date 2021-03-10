import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/layout/main'

Vue.use(VueRouter)
const routes = [
  {
    path: '/system',
    name: 'System',
    component: Main,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
      menu: true
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '首页'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/index')
      },
      {
        path: 'config',
        name: 'Config',
        meta: {
          title: '系统配置'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/config')
      },
      {
        path: 'admin-list',
        name: 'AdminList',
        meta: {
          title: '管理员列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/admin-list')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      menu: false
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: '/vote',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem("token");
//   if(token == null && to.path != '/login')
//   {
//     next('/login')
//   }
//   else
//   {
//     next()
//   }
// })


export default router
