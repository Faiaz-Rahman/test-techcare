import { store } from '@store/index'
import axios from 'axios'

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

ApiService.interceptors.request.use(
  config => {
    // console.log('config API Service =>', config)

    const token = store.getState().auth.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('error on Interceptor =>', error)
    return Promise.reject(error)
  },
)

export default ApiService
