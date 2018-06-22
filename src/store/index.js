import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import registration from './modules/registration'
import hospital from './modules/hospital'
import inspection from './modules/inspection'
import createLogger from '../plugins/logger'
import family from './modules/family'
// import { promiseParamPlugin } from './plugins/promise'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default function createStore () {
  return new Vuex.Store({
    modules: {
      app,
      registration,
      hospital,
      inspection,
      family
    },
    plugins: debug ? [createLogger()] : []
  })
}
