import axios from 'axios'
import { Indicator, MessageBox } from 'mint-ui'
import object from './object'

console.log('process.env', process.env)
const baseConf = {
  baseURL: process.env.API_URL
}
const baseOpt = {
  source: '14',
  signNo: '0',
  v: '1.0'
  // userId: store ? store.app.state.user.userId : ''
}
var qs = require('qs')

// axios.defaults.withCredentials = true
// 请求拦截器
axios.interceptors.response.use(data => {
  Indicator.close()
  let code = object.deepGet(data, 'data.res.code')
  let msg = object.deepGet(data, 'data.res.msg')
  if (code && code !== '0') {
    MessageBox('',
      msg || '系统繁忙，请稍后再试！'
    )
  }
  return data
}, error => {
  Indicator.close()
  let message = object.deepGet(error, 'response.data.message')
  MessageBox('提示', message || '系统繁忙，请稍后再试！')
})

const http = {
  getData (url, data) {
    // http.encrypt(url, data, resolve, reject)
    return new Promise((resolve, reject) => {
      http.post(url, data, resolve, reject)
    })
  },
  // 参数加密
  // encrypt (url, data, resolve, reject) {
  //   let param = JSON.stringify(Object.assign(data, baseOpt))
  //   if (window.isAndroid) {
  //     data = JSON.parse(window.qzAndroid.sh512Sign(param)) // 直接赋值签名以后的param字符串
  //     http.post(url, data, resolve, reject)
  //   }
  //   if (window.isiOS) {
  //     window.WebViewJavascriptBridge.callHandler('sh512Sign', param, function (param) {
  //       data = JSON.parse(param)
  //       http.post(url, data, resolve, reject)
  //     })
  //   }
  // },
  // post请求
  post (url, data, resolve, reject) {
    axios({...baseConf, url: url, data: qs.stringify(Object.assign(data, baseOpt)), method: 'post'}).then(res => {
      if (typeof res === 'string') res = JSON.parse(res)
      let data = object.deepGet(res, 'data')
      let code = object.deepGet(res, 'data.code')
      // let code = res.data.code
      // let data = res.data
      code === '0' ? resolve(data) : reject(data)
    }).catch(err => {
      if (typeof err === 'string') err = JSON.parse(err)
      reject(err)
    })
  },
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({...baseConf, url: url, param: param, method: 'get'}).then(res => {
        if (typeof res === 'string') res = JSON.parse(res)
        let code = object.deepGet(res, 'res.code')
        let data = object.deepGet(res, 'data')
        code === '0' ? resolve(data) : reject(data)
        resolve(res)
      }).catch(err => {
        if (typeof err === 'string') err = JSON.parse(err)
        reject(err)
      })
    })
  }
}

export default http
// Vue.prototype.$http = http
