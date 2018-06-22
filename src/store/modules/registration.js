import http from '@/utils/http'

const payTypes = {
  '1': '自费支付',
  '2': '医保报销'
}
const regTypes = {
  '-1': '预约失败',
  '0': '已提交',
  '1': '挂号成功',
  '2': '预约成功',
  '3': '已取消',
  '4': '已就诊'
}

// initial state
const state = {
  pbInfo: {}, // 点击的排班pbId
  registration: {}, // 挂号/预约确认单显示数据
  seqNumList: [], // 就诊序号列表
  userList: [], // 就诊人列表
  seqInfo: {}, // 点击的序号
  patientInfo: {}, // 点击的就诊人

  regList: [], // 挂号单列表
  regListNext: '',
  registrationDetail: {}, // 挂号单详情
  rule: ''
}

// getters
const getters = {
  // 获取点击排班ID
  pbInfo: state => state.pbInfo,
  pbId: state => state.pbInfo.pbId,
  seqNum: state => state.seqInfo.seqNum,
  patientInfo: state => state.patientInfo,
  patientId: state => state.patientInfo.patientId,
  patientIdCard: state => state.patientInfo.IDCard,

  // 挂号单确认显示
  registration: (state, getters, rootState) => {
    const registration = {
      hospName: getters.hospName,
      schTypeText: getters.docInfo.docName,
      deptName: getters.deptName,
      pbDate: getters.pbInfo.pbDate + ' ' + getters.pbInfo.timeTypeText,
      fee: getters.pbInfo.fee,
      docTitle: getters.docInfo.docTitle
    }
    return registration
  },

  // 挂号单确认 就诊序号列表 入参
  regParams: (state, getters, rootState) => {
    const regParams = {
      hospId: getters.hospId,
      pbId: getters.pbInfo.pbId,
      noonType: getters.pbInfo.timeType
    }
    return regParams
  },
  // 挂号单确认 就诊序号列表
  seqNumList: state => state.seqNumList,
  userList: state => state.userList,
  // 挂号单确认提交 入参
  bookRegistParams: (state, getters, rootState) => {
    const bookRegistParams = {
      funCode: 'funCode', // 服务编码，未定义
      patientId: getters.patientId,
      deptId: getters.deptId,
      docId: getters.docId,
      docTitle: getters.docInfo.docTitle,
      regTime: getters.pbInfo.pbDate,
      pbId: getters.pbInfo.pbId,
      noonType: getters.pbInfo.timeType,
      regSeq: getters.seqNum,
      hospName: getters.hospName,
      docName: getters.docInfo.docName,
      deptName: getters.deptInfo.deptSubName,
      fee: getters.pbInfo.fee,
      userName: getters.patientInfo.userName,
      cardType: getters.patientInfo.cardType,
      cardNum: getters.patientInfo.cardNum,
      regSource: 'dabay'
    }
    return bookRegistParams
  },
  // 挂号单详情
  registrationDetail: state => {
    let registrationDetail = state.registrationDetail
    registrationDetail.prompt = registrationDetail.prompt ? registrationDetail.prompt.replace(/\n/g, '<br/>') : ' '
    registrationDetail.payType = payTypes[registrationDetail.payType]
    return registrationDetail
  },
  // 挂号单列表, 判断是否有下一页
  regList: state => {
    for (let i in state.regList) {
      state.regList[i].regStatus = regTypes[state.regList[i].regStatus]
    }
    return state.regList
  },
  regListNext: state => state.regListNext,
  rule: state => state.rule.replace(/\n/g, '<br/>')
}

// actions
const actions = {
  // 获取就诊序号列表
  getSeqNumList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/reg/seqNum', {...params}).then(res => {
        commit('GET_SEQ_NUM_LIST', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_SEQ_NUM_LIST_FAILURE') })
    })
  },
  getUserList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/hosp/userList', {...params}).then(res => {
        commit('GET_USER_LIST', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_USER_LIST_FAILURE') })
    })
  },

  // 预约挂号确认单提交
  postAppointRegistration ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/reg/bookRegist', {...params}).then(res => {
        resolve(res.data)
      }).catch(() => { })
    })
  },

  // 获取挂号单列表
  getRegisterList ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/reg/list', {...params}).then(res => {
        res.data.pageNo = params.pageNo
        commit('GET_REGISTER_LIST', res.data)
        resolve(res)
      }).catch(err => { if (err) commit('GET_REGISTER_LIST_FAILURE') })
    })
  },
  // 获取挂号单详情
  getRegistrationDetail ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/reg/view', {...params}).then(res => {
        commit('GET_REGISTRATION_DETAIL', res)
        resolve(res)
      }).catch(err => { if (err) commit('GET_REGISTRATION_DETAIL_FAILURE') })
    })
  },
  // 取消预约
  cancelPrescription ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/reg/orderCancel', {...params}).then(res => {
        resolve(res)
      }).catch(() => { })
    })
  },

  // 获取挂号/缴费规则
  getRule ({ dispatch, commit, getters, rootGetters }, params) {
    return new Promise((resolve, reject) => {
      http.getData('/rule', {...params}).then(res => {
        commit('GET_RULE', res)
        resolve(res)
      }).catch(() => { })
    })
  }
}

// mutations
const mutations = {
  // 获取当前排班信息
  setPbInfo (state, data) {
    state.pbInfo = data
  },
  // 选择就诊人信息
  setSeqNum (state, data) {
    state.seqInfo.seqNum = data
  },
  setPatientInfo (state, data) {
    state.patientInfo = data
  },

  GET_SEQ_NUM_LIST (state, res) {
    state.seqNumList = res.data
  },
  GET_SEQ_NUM_LIST_FAILURE (state, err) {
    state.seqNumList = []
  },
  GET_USER_LIST (state, res) {
    state.userList = res.data
    state.patientInfo = res.data[0]
  },
  GET_USER_LIST_FAILURE (state, err) {
    state.userList = []
  },

  GET_REGISTER_LIST (state, res) {
    res.pageNo === 1 ? state.regList = res.regList : state.regList = state.regList.concat(res.regList)
    state.regListNext = res.next
  },
  GET_REGISTER_LIST_FAILURE (state, res) {
    state.regList = []
  },
  GET_REGISTRATION_DETAIL (state, res) {
    state.registrationDetail = res.data
  },
  GET_REGISTRATION_DETAIL_FAILURE (state, res) {
    state.registrationDetail = {}
  },
  GET_RULE (state, res) {
    state.rule = res.data.rule
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
