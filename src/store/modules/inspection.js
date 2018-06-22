import http from '@/utils/http'
// import router from '../../router/index'

// initial state
const state = {
  // 检查检验报告单列表,下一页标识
  inspectionList: [],
  inspectionListNext: '',
  inspectionTime: '1',
  inspectionDetail: {},
  repDate: ''
}

// getters
const getters = {
  // 检查检验报告单,判断是否有下一页
  inspectionTime: state => state.inspectionTime,
  inspectionList: state => state.inspectionList,
  inspectionListNext: state => state.inspectionListNext,
  inspectionDetail: state => {
    let inspectionDetail = state.inspectionDetail
    return inspectionDetail
  },
  repDate: state => state.repDate,
  // 检查检验报告单列表 入参
  inspectionParams: (state, getters, rootState) => {
    const inspectionParams = {
      hospId: getters.hospId,
      cardNo: getters.patientIdCard,
      timeState: getters.inspectionTime
    }
    return inspectionParams
  }
}

// actions
const actions = {
  // 获取报告单列表
  getInspectionList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/v2/rep/list', {...params}).then(res => {
        res.data.pageNo = params.pageNo
        commit('GET_INSPECTION_LIST', res.data)
        resolve(res)
      }).catch(err => { if (err) commit('GET_INSPECTION_LIST_FAILURE') })
    })
  },

  // 获取检验报告单详情
  getJyReportDetail ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/v2/rep/jyRepView', {...params}).then(res => {
        commit('GET_INSPECTION_DETAIL', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_INSPECTION_DETAIL_FAILURE') })
    })
  },
  // 获取检查报告单详情
  getJcReportDetail ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('web/v2/rep/jcRepView', {...params}).then(res => {
        commit('GET_INSPECTION_DETAIL', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_INSPECTION_DETAIL_FAILURE') })
    })
  }
}

// mutations
const mutations = {
  GET_INSPECTION_LIST (state, res) {
    for (let i = 0; i < res.repList.length; i++) {
      res.repList[i].repDate = res.repList[i].repTime.slice(0, 10)
      res.repList[i].repTime = res.repList[i].repTime.slice(5)
    }
    res.pageNo === 1 ? state.inspectionList = res.repList : state.inspectionList = state.inspectionList.concat(res.repList)
    for (let i = 0; i < state.inspectionList.length; i++) {
      if (state.inspectionList[i].repName.length > 15) {
        state.inspectionList[i].repName = state.inspectionList[i].repName.slice(0, 15) + '...'
      }
    }
    state.inspectionListNext = res.next
  },
  GET_INSPECTION_LIST_FAILURE (state, res) {
    state.inspectionList = []
  },

  setInspectionTime (state, data) {
    state.inspectionTime = data
  },
  setInspectionDate (state, data) {
    state.repDate = data
  },

  GET_INSPECTION_DETAIL (state, res) {
    state.inspectionDetail = res.data
  },
  GET_INSPECTION_DETAIL_FAILURE (state, res) {
    state.inspectionDetail = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
