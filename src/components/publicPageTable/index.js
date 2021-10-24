import publicPageTable from './index.vue'
import vue from 'vue'
const index = {
  install: () => {
    vue.component('public-Page-Table', publicPageTable)
  }
}

export default index
