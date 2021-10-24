import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */
import updatePass from '../../updatePass/index'
// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/uploadFile',
    component: (resolve) => require(['@/views/uploadFile'], resolve)
  },
  {
    path: '/updatePasswd',
    component: updatePass,
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/productCenter/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'home', noCache: true, affix: true }
      }
    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'profile',
  //       component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    hidden: true,
    // redirect: 'noredirect',
    children: [
      {
        path: '/organization/menu',
        component: (resolve) => require(['@/views/system/menu/index'], resolve),
        name: 'menu',
        meta: { title: '角色管理', icon: '' }
      },
      {
        path: 'role',
        component: (resolve) => require(['@/views/system/role/index'], resolve),
        name: 'role',
        meta: { title: '角色管理', icon: '' }
      },
    ]
  },
  // <!----------------------------------------新增页面路由---------------------------------------------------!>
  {
    path: '/insurancePolicy',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'carInsurance',
        component: (resolve) => require(['@/views/insurancePolicy/carInsurance'], resolve),
        name: 'carInsurance',
        meta: { title: '车险保单列表', icon: '' }
      },
      {
        path: 'employer',
        component: (resolve) => require(['@/views/insurancePolicy/employer'], resolve),
        name: 'employer',
        meta: { title: '非车险保单列表', icon: '' }
      },
      {
        path: 'carInsuranceDetails',
        component: (resolve) => require(['@/views/insurancePolicy/carInsuranceDetails'], resolve),
        name: 'carInsuranceDetails',
        meta: { title: '车险保单-详情', icon: '' }
      },
      {
        path: 'employerDetails',
        component: (resolve) => require(['@/views/insurancePolicy/employerDetails'], resolve),
        name: 'employerDetails',
        meta: { title: '非车险保单-详情', icon: '' }
      },
      {
        path: 'carInsuranceReport',
        component: (resolve) => require(['@/views/insurancePolicy/carInsuranceReport'], resolve),
        name: 'carInsuranceReport',
        meta: { title: '车险保单-出险', icon: '' }
      },
      {
        path: 'employerReport',
        component: (resolve) => require(['@/views/insurancePolicy/employerReport'], resolve),
        name: 'employerReport',
        meta: { title: '非车险保单-出险', icon: '' }
      }
    ]
  },
  {
    path: '/compensate',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'carInsurance',
        component: (resolve) => require(['@/views/compensate/carInsurance'], resolve),
        name: 'C_carInsurance',
        meta: { title: '车险理赔案件', icon: '' }
      },
      {
        path: 'employer',
        component: (resolve) => require(['@/views/compensate/employer'], resolve),
        name: 'C_employer',
        meta: { title: '非车险理赔案件', icon: '' }
      },
      {
        path: 'carInsuranceDetails',
        component: (resolve) => require(['@/views/compensate/carInsuranceDetails'], resolve),
        name: 'C_carInsuranceDetails',
        meta: { title: '车险理赔详情', icon: '' }
      },
      {
        path: 'employerDetails',
        component: (resolve) => require(['@/views/compensate/employerDetails'], resolve),
        name: 'C_employerDetails',
        meta: { title: '非车险理赔详情', icon: '' }
      }
    ]
  },
  {
    path: '/enclosureDeploy',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'carInsurance',
        component: (resolve) => require(['@/views/enclosureDeploy/carInsurance'], resolve),
        name: 'E_carInsurance',
        meta: { title: '车险理赔附件配置', icon: '' }
      },
      {
        path: 'employer',
        component: (resolve) => require(['@/views/enclosureDeploy/employer'], resolve),
        name: 'E_employer',
        meta: { title: '非车险理赔附件配置', icon: '' }
      }
    ]
  },
  {
    path: '/productCenter',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/productCenter/index'], resolve),
        name: 'productCenter',
        meta: { title: '产品中心', icon: '' }
      }
    ]
  },
  // 雇主责任险产品配置
  {
    path: '/solutionSet',
    component: Layout,
    // alwaysShow: true
    hidden: true,
    meta:{
      title:'产品配置',
      icon:'education'
    },
    children: [
      {
        path: 'productSet',
        component: (resolve) => require(['@/views/solutionSet/productSet/index'], resolve),
        name: 'productSet',
        meta: { title: '雇主责任险产品配置', icon: '' }
      },
      {
        path: 'productSetAdd',
        component: (resolve) => require(['@/views/solutionSet/productSet/productSetAdd'], resolve),
        name: 'productSetAdd',
        hidden: true,
        meta: { title: '雇主责任险产品配置新增', icon: '' }
      },
      {
        path: 'schemeSet',
        component: (resolve) => require(['@/views/solutionSet/schemeSet/index'], resolve),
        name: 'schemeSet',
        meta: { title: '雇主责任险方案配置', icon: '' }
      },
      {
        path: 'schemeSetAdd',
        component: (resolve) => require(['@/views/solutionSet/schemeSet/schemeSetAdd'], resolve),
        name: 'schemeSetAdd',
        hidden: true,
        meta: { title: '雇主责任险方案配置新增', icon: '' }
      },
    ]
  },
]

export default new Router({
  // 后端支持可开history模式，默认hash模式
  // mode: 'history', // 去掉url中的#
  base: process.env.VUE_APP_ROUTER,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})