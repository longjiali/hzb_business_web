import publicPageFrom from './index.vue'
import vue from 'vue'
const index = {
  install: () => {
    vue.component('public-Page-From', publicPageFrom)
  }
}

export default index
