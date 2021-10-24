import { constantRoutes } from '@/router'
import { getRouters, codeListData } from '@/api/menu'
import Layout from '@/layout/index'
const permission = {
  state: {
    routes: [],
    addRoutes: [],
    codeList: {}
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_CODENAME: (state, list) => {
      state.codeList = list
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          // const accessedRoutes = filterAsyncRouter(res.data)
          const accessedRoutes = filterAsyncRouter(res.data.data)
          // const accessedRoutes = filterAsyncRouter(json.data)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }),
        codeListData().then(res => {
          commit('SET_CODENAME', res.data.list)
        })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
