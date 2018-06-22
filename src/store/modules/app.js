// import http from '@/utils/http'

// initial state
const state = {
  login: true, // 是否登录
  userInfo: {
    sessionId: ''
    // userId: '300',
    // authFlag: '',
    // phoneNum: '151****8005',
    // idCard: '330823197701120010',
    // cardNum: 'B22641434',
    // address: '临时的地址'
  },
  header: '健康德清'
}

// getters
const getters = {
  header: state => state.header,
  userInfo: state => state.userInfo
}

// actions
const actions = {
}

// mutations
const mutations = {
  changeHeaderTitle (state, header) {
    state.header = header
  },
  setSessionId (state, data) {
    // alert(data)
    state.userInfo.sessionId = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
