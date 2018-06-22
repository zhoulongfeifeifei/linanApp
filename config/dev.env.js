'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_URL: '"https://qzht.dabay.cn:6800/yw"' // 衢州测试环境
  API_URL: '"http://linan.dabay.com.cn:8980/linan"' // 临安测试环境
})
