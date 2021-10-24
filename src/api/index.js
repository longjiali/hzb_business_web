import {loginApi} from './login.js'
import {organizationalApi} from './organizational.js'
import {commercialApi} from './commercial.js'
import {serviceApi} from './service.js'
import {orderApi} from './order.js'

export default {
  loginApi:{
    ...loginApi,
  },
  organizationalApi:{
    ...organizationalApi
  },
  commercialApi:{
    ...commercialApi
  },
  serviceApi:{
    ...serviceApi
  },
  orderApi:{
    ...orderApi
  }

}


