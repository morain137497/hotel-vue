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
    path: '/scenic',
    name: 'Scenic',
    component: Main,
    meta: {
      title: '景点管理',
      icon: 'el-icon-s-tools',
      menu: true
    },
    children: [
      {
        path: 'category-list',
        name: 'CategoryList',
        meta: {
          title: '景点分类列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/scenic/category-list')
      },
      {
        path: 'scenic-list',
        name: 'ScenicList',
        meta: {
          title: '景点列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/scenic/scenic-list')
      }
    ]
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Main,
    meta: {
      title: '活动管理',
      icon: 'el-icon-s-tools',
      menu: true
    },
    children: [
      {
        path: 'activity-list',
        name: 'ActivityList',
        meta: {
          title: '活动列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/activity/activity-list')
      },
      {
        path: 'sign-up-list',
        name: 'SignUpList',
        meta: {
          title: '报名列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/activity/sign-up-list')
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
