import publicPagination from './index.vue'
import vue from 'vue'
const index = {
  install: () => {
    vue.component('publicPagination', publicPagination)
  }
}

export default index