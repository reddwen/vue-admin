import axios from 'axios'
import qs from 'qs'
import promise from 'es6-promise';
promise.polyfill();

const Axios = axios.create({
  timeout: 10000,
})

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }

  

  return config
}, error => {
  return Promise.reject(error)
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  //需要登陆
  
  return qs.parse(res.data)

}, error => {
  return Promise.reject(error)
})

Axios.install = (Vue) => {
  Vue.prototype.$http = Axios
}

export default Axios
