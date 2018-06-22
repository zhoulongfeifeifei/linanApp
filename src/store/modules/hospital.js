import http from '@/utils/http'
import { Indicator } from 'mint-ui'

// initial state
const state = {
  hospList: [],
  hospInfo: {}, // 当前已选医院
  deptList: [], // 一级科室数据
  deptSubList: [], // 二级科室数据
  deptSelIndex: 0, // 一级科室已选索引
  deptSubSelIndex: -1, // 二级科室已选索引
  deptInfo: {}, // 当前已选科室

  docList: [], // 医生列表
  docInfo: {}, // 医生信息
  docDetail: {}, // 医生主页 个人信息及排班

  hospHomepage: {}
}

// getters
const getters = {
  hospList: state => state.hospList,
  // 获取当前医院
  hospId: state => state.hospInfo.hospId,
  hospName: state => state.hospInfo.hospName,
  hospSPic: state => state.hospInfo.hospSPic,
  // 获取当前科室
  deptId: state => state.deptInfo.deptSubId,
  deptInfo: state => state.deptInfo,
  deptName: state => state.deptInfo.deptSubName,
  // 获取科室列表
  deptList: state => state.deptList.map(item => ({
    deptId: item.deptId,
    deptName: item.deptName
  })),
  deptSubList: state => state.deptSubList,
  deptSelIndex: state => state.deptSelIndex,
  deptSubSelIndex: state => state.deptSubSelIndex,
  // 获取医生列表
  docList: state => state.docList,
  docId: state => state.docInfo.docId,
  docInfo: state => {
    let docInfo = state.docInfo
    // docInfo.docSpecial = state.docInfo.docSpecial
    return docInfo
  },
  sortList: state => state.docDetail.data,
  // 附近医院相关
  getHospHomepage: state => state.hospHomepage
}

// actions
const actions = {
  // 获取医院列表
  getHospList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/hosp/list', { ...params }).then(res => {
        commit('GET_HOSP_LIST', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_HOSP_LIST_FAILURE') })
    })
  },

  // 获取科室列表
  getDeptData ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/hosp/deptMain', { ...params }).then(res => {
        commit('GET_DEPT_DATA', res.data)
        Indicator.open({text: '加载中...', spinnerType: 'snake'})
        http.getData('/hosp/deptSub', { hospId: params.hospId, deptId: res.data[0].deptId }).then(res => {
          commit('GET_DEPT_SUB_DATA', res.data)
          resolve()
        }).catch(err => reject(err))
      }).catch(err => reject(err))
    })
  },
  getDeptSubData ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/hosp/deptSub', { ...params }).then(res => {
        commit('GET_DEPT_SUB_DATA', res.data)
        resolve()
      }).catch(err => reject(err))
    })
  },

  // 获取医生列表
  getDocList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('hosp/deptSchedule', { ...params }).then(res => {
        commit('GET_DOC_LIST', res.data)
        resolve()
      }).catch(err => { if (err) commit('GET_DOC_LIST_FAILURE') })
    })
  },

  // 医生主页信息 及排班情况
  getSortList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/doc/getDocPbInfo', { ...params }).then(res => {
        commit('GET_SORT_LIST', res.data)
        resolve()
      }).catch(err => { if (err) commit('GET_SORT_LIST_FAILURE') })
    })
  },
  // 医院主页信息
  getHospHome ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/hosp/getInfoById', { ...params }).then(res => {
        commit('GET_HOSP_HOME', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_HOSP_HOME_FAILURE') })
    })
  }
}

// mutations
const mutations = {
  GET_HOSP_LIST (state, res) {
    state.hospList = res.data.hosList
  },
  GET_HOSP_LIST_FAILURE (state, res) {
    state.hospList = []
  },

  setHospInfo (state, hosp) {
    state.hospInfo = hosp
  },
  setHospId (state, hospId) {
    state.hospInfo.hospId = hospId
  },

  // 获取科室列表，点击切换科室，初始化状态
  GET_DEPT_DATA (state, data) {
    state.deptList = data
  },
  GET_DEPT_SUB_DATA (state, data) {
    state.deptSubList = data
  },
  setDeptSelIndex (state, index) {
    state.deptSelIndex = index
  },
  setDeptSubSelIndex (state, index) {
    state.deptSubSelIndex = index
  },
  resetState (state, res) {
    state.deptSelIndex = 0
    state.deptSubSelIndex = -1
    state.deptList = []
    state.deptSubList = []
  },
  setDeptInfo (state, item) {
    state.deptInfo = item
  },

  // 医生列表，切换日期
  GET_DOC_LIST (state, data) {
    state.docList = data
    state.docList[0].docSpecial = '浙江省抗癌协会胃癌专业委员会外科学组委员。主要从事腹部肿瘤的临床诊治及基础研究,主要从事腹部肿瘤的临床诊治及基础研究,主要从事腹部肿瘤的临床诊治及基础研究'
    for (let i = 0; i < state.docList.length; i++) {
      state.docList[i].docDetailAll = state.docList[i].docSpecial
      if (state.docList[i].docSpecial.length > 16) {
        state.docList[i].docDetailAbbr = state.docList[i].docDetailAll
        state.docList[i].docSpecial = state.docList[i].docDetailAll.slice(0, 16) + '...'

        if (state.docList[i].docDetailAll.length > 24) {
          state.docList[i].docDetailAbbr = state.docList[i].docDetailAll.slice(0, 40) + '...'
        }
      } else {
        state.docList[i].docDetailAbbr = state.docList[i].docSpecial
      }
    }
  },
  GET_DOC_LIST_FAILURE (state, data) {
    state.docList = []
  },
  setDocInfo (state, data) {
    state.docInfo = data
  },

  // 医生主页基本信息&排班列表
  GET_SORT_LIST (state, data) {
    state.docDetail = data
  },
  GET_SORT_LIST_FAILURE (state, data) {
    state.docDetail = {}
  },

  // 附近医院相关
  GET_HOSP_HOME (state, res) {
    state.hospHomepage = res.data
  },
  GET_HOSP_HOME_FAILURE (state, data) {
    state.hospHomepage = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
