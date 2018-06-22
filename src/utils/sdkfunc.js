exports.install = function (Vue, options) {
  Vue.prototype.getUserIdFromSDK = function () {
    if (window.isAndroid) {
      // let userId = window.laAndroid.getUserIdFromSDK()
      return window.laAndroid.getUserIdFromSDK()
    } else if (window.isiOS) {
      // window.WebViewJavascriptBridge.callHandler('getUserIdFromSDK', '', function (userId) {
      //   alert('进入ios11')
      //   return userId
      // })
      return '1111'
    }
  }
  Vue.prototype.goLogin = function () {
    alert('goLogin')
    if (window.isAndroid) {
      window.laAndroid.goLogin()
    } else if (window.isiOS) {
      window.webkit.messageHandlers.goLogin.postMessage('')
    }
  }
}
