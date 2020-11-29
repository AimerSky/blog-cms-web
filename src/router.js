/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('./views/Page2.vue')
        },
        {
          path: '/ManagerList',
          name: 'manager_list',
          meta: {
            breadcrumb: [
              {title: '首页', url: '/'},
              {title: '权限', url: '/ManagerList'},
              {title: '管理员列表', active: true},
            ],
            pageTitle: '管理员列表'
          },
          component: () => import('./views/pages/limit/ManagerList.vue')
        },
        {
          path: '/ManagerDetail',
          name: 'manager_detail',
          component: () => import('./views/pages/limit/ManagerDetail.vue')
        },
        {
          path: '/MenuList',
          name: 'menu_list',
          meta: {
            breadcrumb: [
              {title: '首页', url: '/'},
              {title: '权限', url: '/MenuList'},
              {title: '菜单列表', active: true},
            ],
            pageTitle: '菜单列表'
          },
          component: () => import('./views/pages/limit/MenuList.vue')
        },
        {
          path: '/MenuDetail',
          name: 'menu_detail',
          component: () => import('./views/pages/limit/MenuDetail.vue')
        },
        {
          path: '/ResourceList',
          name: 'resource_list',
          meta: {
            breadcrumb: [
              {title: '首页', url: '/'},
              {title: '权限', url: '/ResourceList'},
              {title: '资源列表', active: true},
            ],
            pageTitle: '资源列表'
          },
          component: () => import('./views/pages/limit/ResourceList.vue')
        },
        {
          path: '/RoleList',
          name: 'role_list',
          meta: {
            breadcrumb: [
              {title: '首页', url: '/'},
              {title: '权限', url: '/RoleList'},
              {title: '角色列表', active: true},
            ],
            pageTitle: '角色列表'
          },
          component: () => import('./views/pages/limit/RoleList.vue')
        },
        {
          path: '/RoleDetail',
          name: 'role_detail',
          component: () => import('./views/pages/limit/RoleDetail.vue')
        },
        {
          path: '/RoleMenu',
          name: 'role_menu',
          component: () => import('./views/pages/limit/RoleMenu.vue')
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================

        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/login',
          name: 'pageLogin',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/register',
          name: 'pageRegister',
          component: () => import('@/views/pages/Register.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/forgot-password',
          name: 'pageForgotPassword',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/reset-password',
          name: 'pageResetPassword',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/lock-screen',
          name: 'pageLockScreen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/comingsoon',
          name: 'pageComingSoon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-404',
          name: 'pageError404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/error-500',
          name: 'pageError500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/not-authorized',
          name: 'pageNotAuthorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/maintenance',
          name: 'pageMaintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  if (
    to.path === "/pages/login" ||
    to.path === "/pages/forgot-password" ||
    to.path === "/pages/error-404" ||
    to.path === "/pages/error-500" ||
    to.path === "/pages/register" ||
    to.path === "/callback" ||
    to.path === "/pages/comingsoon"
  ) {
    return next();
  }



  //判断有没有登入
  //router.push({path: '/pages/login', query: {to: to.path}})

  return next();
});

export default router
