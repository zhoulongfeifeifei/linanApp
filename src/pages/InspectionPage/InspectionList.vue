<template>
  <div class="inspection-list">
    <div class="select-box fx">
      <p class="fx1" :class="{unfold: personVisible, fold: !personVisible}" @click="linkTo('person')">
        <span class="person-box">
          <span>{{person ? person : patientInfo.userName}}</span><br/>
          <span>{{personCard ? personCard : '(' + patientInfo.cardType + patientInfo.cardNum + ')'}}</span>
        </span>
        <i></i>
      </p>
      <p class="fx1" :class="{unfold: reportTypeVisible, fold: !reportTypeVisible}" @click="linkTo('reportType')">{{reportType}}<i></i></p>
      <p class="fx1" :class="{unfold: timeVisible, fold: !timeVisible}" @click="linkTo('time')">{{time}}</p>
    </div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="inspectionListNext==='0'" :auto-fill="false" :max-distance="150" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div v-if="inspectionList.length!=0" class="content" ref="content">
        <ReportItem v-for="item in inspectionList" :key="item.repCode" :item="item"></ReportItem>
        <span class="more">{{inspectionListNext==='0' ? "已经到底了":"上拉查看更多"}} ></span>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
        <span v-show="topStatus === 'drop'">释放更新</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus === 'pull'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
        <span v-show="bottomStatus === 'loading'">Loading~~~</span>
        <span v-show="bottomStatus === 'drop'">释放更新</span>
      </div>
    </mt-loadmore>
    <NoData content="暂未查询到您在该医院有相关的检查检验报告单信息，请确认后再次查询。" v-if="!inspectionList || !inspectionList.length"></NoData>

    <MyModal :width="'100%'" title="选择时间" :visible="timeVisible" @oncancel="onCancel('time')" @onok="onOk('time')" v-if="timeVisible" :className="'pick-person-modal'" :selectHeader="true">
      <a class="number-cell" v-for="(item, index) in selectFields" :key="index" @click="pickTime(item.value, item.text)">{{item.text}}</a>
    </MyModal>
    <MyModal :width="'100%'" title="选择就诊人" :visible="personVisible" @oncancel="onCancel('person')" @onok="onOk('person')" v-if="personVisible" :className="'pick-person-modal'" :selectHeader="true">
      <a class="number-cell" v-for="(item, index) in userList" :key="index" @click="pickPerson(item)">{{item.userName}}<span>({{item.cardType}}{{item.cardNum}})</span></a>
      <router-link class="number-cell manage-person" to="/familyMembers">管理家庭成员</router-link>
    </MyModal>
    <MyModal :width="'100%'" title="选择报告单类型" :visible="reportTypeVisible" @oncancel="onCancel('reportType')" @onok="onOk('person')" v-if="reportTypeVisible" :className="'pick-person-modal'" :selectHeader="true">
      <a class="number-cell" v-for="(item, index) in reportTypeFields" :key="index" @click="pickReportType(item.value, item.text)">{{item.text}}</a>
    </MyModal>
  </div>
</template>

<script>
import ReportItem from '../../components/CommonComponents/ReportItem.vue'
import NoData from '../../components/CommonComponents/NoData.vue'
import MyModal from '../../components/CommonComponents/Modal.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'InspectionList',
  components: {
    ReportItem, NoData, MyModal
  },
  data () {
    return {
      selectFields: [
        { value: 0, text: '全部' },
        { value: 1, text: '一周内' },
        { value: 2, text: '一个月内' },
        { value: 3, text: '半年内' }
      ],
      reportTypeFields: [
        { value: 1, text: '检验' },
        { value: 2, text: '检查' }
      ],
      tag: 4,
      pageNo: 1,
      pageSize: 12,
      topStatus: '',
      bottomStatus: '',
      // 模态框&下拉箭头的显示
      timeVisible: false,
      personVisible: false,
      reportTypeVisible: false,
      time: '时间',
      person: '',
      reportType: '检验',
      type: '1',
      personCard: ''
    }
  },
  computed: {
    ...mapGetters([
      'userList', 'userInfo', 'patientInfo', 'inspectionList', 'inspectionListNext', 'inspectionParams'
    ])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '我的报告单')
  },
  mounted () {
    this.getUserList({sessionId: this.userInfo.sessionId})
    const vm = this
    setTimeout(function () {
      vm.updateInspectionList()
    }, 100)
  },
  methods: {
    ...mapActions(['getUserList', 'getInspectionList']),
    ...mapMutations(['setInspectionTime', 'setPatientInfo']),

    updateInspectionList: function () {
      this.$store.commit('GET_INSPECTION_LIST_FAILURE')
      this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
      this.getInspectionList({...this.inspectionParams, type: this.type, pageNo: this.pageNo, pageSize: this.pageSize})
    },
    loadTop: function () {
      this.pageNo = 1
      this.updateInspectionList()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom: function () {
      this.pageNo = this.pageNo + 1
      this.updateInspectionList()
      this.$refs.loadmore.onBottomLoaded()
    },
    handleTopChange: function (status) {
      this.topStatus = status
    },
    handleBottomChange: function (status) {
      this.bottomStatus = status
    },

    // 筛选条件
    linkTo (type) {
      switch (type) {
        case 'person': this.personVisible = true; break
        case 'time': this.timeVisible = true; break
        case 'reportType': this.reportTypeVisible = true; break
      }
      // type === 'person' ? this.personVisible = true : this.timeVisible = true
    },
    onCancel (type) {
      switch (type) {
        case 'person': this.personVisible = false; break
        case 'time': this.timeVisible = false; break
        case 'reportType': this.reportTypeVisible = false; break
      }
    },
    onOk (type) {
      switch (type) {
        case 'person': this.personVisible = false; break
        case 'time': this.timeVisible = false; break
        case 'reportType': this.reportTypeVisible = false; break
      }
    },
    pickTime (timeState, text) {
      this.setInspectionTime(timeState)
      this.time = text
      this.timeVisible = false
      this.updateInspectionList()
    },
    pickPerson (item) {
      this.setPatientInfo(item)
      this.person = item.userName
      this.personCard = '(' + item.cardType + item.cardNum + ')'
      this.personVisible = false
      this.updateInspectionList()
    },
    pickReportType (value, text) {
      this.reportTypeVisible = false
      this.reportType = text
      this.type = value
      this.updateInspectionList()
    }
  }
}
</script>

<style lang="scss" scoped>
.more { text-align: center; display: block; font-size: .6rem; color: $color-font3 !important; }
.select-box{
  z-index: 1001;
  background: #fff;
  padding: .6rem .8rem;
  position: relative;
  border-bottom: 1px solid $color-border2;
  top:-1px;
  p{
    display:inline-block;
    text-align:center;
    font-size:.7rem;
    position:relative;
    span{
      font-size:.6rem
    }
    i{
      display:inline-block;
      width:1px; height:20px;
      background:$color-border2;
      float:right
    }
  }
  p .person-box{
    position:absolute;
    left: 0.1rem;
    top: -0.4rem
  }
  p:after{
    content: '';
    position: absolute;
    top:.35rem;
    right:.5rem;
    border-left:0.25rem solid transparent;
    border-right:0.25rem solid transparent;
  }
  p.fold:after{
    border-bottom:0.3rem solid $color-border2;
  }
  p.unfold:after{
    border-top:0.3rem solid $color-font3;
  }
  p.unfold{
    color:$color-font3
  }
}
</style>
<style lang="scss">
.pick-person-modal{
  .modal-content{
    position: absolute!important;
    top: 5.3rem;
    width: 100%;
    border-radius: 0!important;
    max-height: 13rem;
    text-align: center
  }
  .modal-body{
    padding: 0!important;
    max-height: 10.6rem;
    overflow: auto;
    .number-cell{
      border-bottom: 1px solid $color-border;
      padding: 0.6rem 0.6rem;
      display: block;
      span{
        font-size: .7rem
      }
    }
    .manage-person{
      color: $color-font3
    }
  }
}
</style>
