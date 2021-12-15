import Axios from 'axios'
import store from '@/store'
import { api } from '@/store/api'

const instance = Axios.create({
  baseURL: api.baseUrl,
})

instance.interceptors.request.use(config => {
  if (!config.withoutLoader) {
    store.dispatch('showLoader')
  }
  return config
})

instance.interceptors.response.use(
  response => {
    if (!response.config.withoutLoader) {
      store.dispatch('hideLoader')
    }
    return response
  },
  error => {
    if (!error.config.withoutLoader) {
      store.dispatch('hideLoader')
    }
    throw error
  }
)

// Add axios instance to the store
store.axios = store.$axios = instance

export default instance