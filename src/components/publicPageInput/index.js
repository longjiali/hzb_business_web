import publicPageInput from './index.vue'
import vue from 'vue'
const index = {
  install: () => {
    vue.component('public-Page-Input', publicPageInput)
  }
}

export default index
