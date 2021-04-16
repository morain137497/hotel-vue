import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/layout/main'
import user from "@/utils/user";

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
      // {
      //   path: 'index',
      //   name: 'Index',
      //   meta: {
      //     title: '首页'
      //   },
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/index')
      // },
      // {
      //   path: 'config',
      //   name: 'Config',
      //   meta: {
      //     title: '系统配置'
      //   },
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/system/config')
      // },
      {
        path: 'leader-list',
        name: 'LeaderList',
        meta: {
          title: '领队列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/leader-list')
      },
      {
        path: 'vip-user-list',
        name: 'vipUserList',
        meta: {
          title: 'VIP用户列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/system/vip-user-list')
      }
    ]
  },
  // {
  //   path: '/scenic',
  //   name: 'Scenic',
  //   component: Main,
  //   meta: {
  //     title: '景点管理',
  //     icon: 'el-icon-s-tools',
  //     menu: true
  //   },
  //   children: [
  //     {
  //       path: 'category-list',
  //       name: 'CategoryList',
  //       meta: {
  //         title: '景点分类列表'
  //       },
  //       component: () => import(/* webpackChunkName: "about" */ '@/views/scenic/category-list')
  //     },
  //     {
  //       path: 'scenic-list',
  //       name: 'ScenicList',
  //       meta: {
  //         title: '景点列表'
  //       },
  //       component: () => import(/* webpackChunkName: "about" */ '@/views/scenic/scenic-list')
  //     }
  //   ]
  // },
  {
    path: '/activity',
    name: 'Activity',
    component: Main,
    meta: {
      title: '活动管理',
      icon: 'el-icon-s-finance',
      menu: true
    },
    children: [
      {
        path: 'activity-template-list',
        name: 'ActivityTemplateList',
        meta: {
          title: '活动模板列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/activity/activity-template-list')
      },
      {
        path: 'activity-list',
        name: 'ActivityList',
        meta: {
          title: '活动列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/activity/activity-list')
      },
      {
        path: 'track-list-list',
        name: 'trackList',
        meta: {
          title: '轨迹列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/activity/track-list')
      },
      // {
      //   path: 'sign-up-list',
      //   name: 'SignUpList',
      //   meta: {
      //     title: '报名列表'
      //   },
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/activity/sign-up-list')
      // }
    ]
  },
  {
    path: '/article',
    name: 'Article',
    component: Main,
    meta: {
      title: '文章管理',
      icon: 'el-icon-reading',
      menu: true
    },
    children: [
      {
        path: 'article-list',
        name: 'ArticleList',
        meta: {
          title: '文章列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/article/article-list')
      },
      // {
      //   path: 'comment-list',
      //   name: 'CommentList',
      //   meta: {
      //     title: '评论列表'
      //   },
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/article/comment-list')
      // }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: Main,
    meta: {
      title: '账户管理',
      icon: 'el-icon-coin',
      menu: true
    },
    children: [
      {
        path: 'payment-list',
        name: 'PaymentList',
        meta: {
          title: '支付列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/account/payment-list')
      },
      {
        path: 'refund-list',
        name: 'RefundList',
        meta: {
          title: '退款列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/account/refund-list')
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

router.beforeEach((to, from, next) => {
  if(user.getToken() == null && to.path != '/login')
  {
    next('/login')
  }
  else
  {
    next()
  }
})


export default router
