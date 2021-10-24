import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss' // common css 基础样式通用
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts ,listData } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime,changeYuan, resetForm, addDateRange, selectDictLabel, download, handleTree, deepClone,getType} from "@/utils/common";
import Pagination from "@/components/Pagination";

import publicPageTable from '@/components/publicPageTable'
import publicPageInput from '@/components/publicPageInput'
import publicPageFrom from '@/components/publicPageFrom'
import publicPagination from '@/components/publicPagination'

// 验证
import {validatePhone,validatorAccount} from '@/utils/validate'
Vue.prototype.validatePhone=validatePhone
Vue.prototype.validatorAccount=validatorAccount
// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.listData = listData
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.changeYuan = changeYuan
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.getType = getType
Vue.prototype.deepClone = deepClone
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree

Vue.use(publicPageTable)
Vue.use(publicPageInput)
Vue.use(publicPageFrom)
Vue.use(publicPagination)

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
