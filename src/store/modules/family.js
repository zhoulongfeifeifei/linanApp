import http from '@/utils/http'
const state = {
  familyMember: [], // 家庭成员列表
  bind: {},
  deleteMember: {},
  queryList: {} // 家庭签约列表
}

// getters
const getters = {
  getMember: state => state.familyMember,
  getBind: state => state.bind,
  deleteMember: state => state.deleteMember,
  getQueryList: state => state.queryList
}

// actions
const actions = {
  // 获取家庭成员信息
  getMembers ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/app/bindPep/list', { ...params }).then(res => {
        commit('GET_MEMBER', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_MEMBER_FAILURE') })
    })
  },
  // 添加家庭成员
  addMembers ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/app/bindPep/add', { ...params, sessionId: '111' }).then(res => {
        resolve(res)
      }).catch(err => { if (err) commit('ADD_MEMBER_FAILURE') })
    })
  },
  // 删除家庭成员
  deleteMembers ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/app/bindPep/delete', { ...params }).then(res => {
        resolve(res)
      }).catch(err => { if (err) commit('DELETE_MEMBER_FAILURE') })
    })
  },
  // 家庭医生签约查询
  signQuery ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/sign/doct/search', { ...params }).then(res => {
        commit('SIGN_QUERY', res)
        resolve(res)
      }).catch(err => { if (err) commit('SIGN_QUERY_FAILURE') })
    })
  }
}

// mutations
const mutations = {
  GET_MEMBER (state, res) {
    state.familyMember = res.data.patnList
    state.bind.bindSize = res.data.bindSize
    state.bind.restSize = res.data.restSize
  },
  GET_MEMBER_FAILURE (state, res) {
    state.hospList = []
  },
  deleteMember (state, res) {
    state.deleteMember = res
  },
  SIGN_QUERY (state, res) {
    state.queryList = res.data
  },
  SIGN_QUERY_FAILURE (state, res) {
    state.queryList = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
