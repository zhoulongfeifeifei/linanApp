<template>
  <div class="doctor-list">
    <section class="margin-top-m time-select">
      <div class="time-container time-scroll">
        <div :class="[{'is-click': isClick === index}, 'time-block']" v-for="(item, index) in timeList" :key="item.date" @click="changeCurrentDate(item.date, index)">
          <p>{{item.week}}</p>
          <p>{{item.date}}</p>
        </div>
      </div>
    </section>
    <section class="margin-top-m" :style="{borderBottom: '1px solid $color-border'}">
      <div class="doctor-card" v-for='(item, index) in docList' :key='item.docId' v-if="docList && docList.length" @click="handleToDocDetail(item, index)">
        <div class="doctor-card-img">
          <img src="../../assets/img/doctor_icon.png" alt="" height="100%" width="100%">
          <!-- <img :src="item.docIco" alt="" height="100%" width="100%"> -->
        </div>
        <div>
          <h4>{{item.docName}} <span>{{item.docTitle}}</span></h4>
          <p>接诊量: <span>{{item.docReception}}</span></p>
          <p>擅长: <span>{{item.docSpecial}}</span></p>
        </div>
      </div>
      <NoData content="无排班医生，请选择其他日期" v-if="!docList || !docList.length"></NoData>
    </section>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import NoData from '../../components/CommonComponents/NoData.vue'

moment.locale('en', {
  weekdays: [
    '周日', '周一', '周二', '周三', '周四', '周五', '周六'
  ]
})
const timeList = []
for (let i = 0; i < 7; i++) {
  if (i === 0) {
    timeList.push({week: moment().format('dddd'), date: moment().format('MM-DD')})
  } else {
    timeList.push({week: moment().add(i, 'days').format('dddd'), date: moment().add(i, 'days').format('MM-DD')})
  }
}

export default {
  name: 'DoctorList',
  components: { NoData },
  data () {
    return {
      timeList: timeList,
      isClick: 0
    }
  },
  created () {
    this.$store.commit('changeHeaderTitle', '医生列表')
    this.$store.commit('GET_DOC_LIST_FAILURE')
  },
  mounted () {
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getDocList({ hospId: this.hospId, deptId: this.deptId, pbDate: this.timeList[0].date })
  },
  computed: {
    ...mapGetters(['docList', 'deptId', 'hospId'])
  },
  methods: {
    ...mapMutations(['setDocInfo']),
    ...mapActions(['getDocList']),

    changeCurrentDate: function (date, index) {
      this.isClick = index
      this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
      this.getDocList({ hospId: this.hospId, deptId: this.deptId, pbDate: date })
    },
    handleToDocDetail: function (item) {
      this.setDocInfo(item)
      this.$router.push({name: 'DoctorHomepage'})
    }
  }
}
</script>
<style lang="scss" scoped>
.doctor-list {
  /deep/ .mint-cell-value {
    font-size: $font-size4;
    color: $color-font7;
    line-height: 0.6rem;
  }
  /deep/ .mint-cell-wrapper {
    background-origin: unset;
  }
}
.time-select {
  padding: 0.4rem 0;
  background-color: $bg-color;
  overflow: hidden;
  width: 18.75rem;
  display: flex;
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;
  .time-container{
    text-align: center;
    color: $color-font2;
    font-size: $font-size3;
  }
  .time-block {
    border-left: 1px solid $color-border;
    display: inline-block;
    width: 3.5rem;
    &.is-click {
      color: $color-font3
    }
  }
  .time-sticky {
    width: 3.5rem;
    p {
      line-height: 1.8rem;
    }
  }
  .time-scroll{
    overflow-x: scroll;
    white-space: nowrap;
    width: 100%;
  }
}
.doctor-card {
  padding: 0.65rem 0.75rem;
  background-color: $bg-color;
  border-top: 1px solid $color-border;
  a {
    display: block;
  }
  h4 {
    font-size: $font-size1;
    color: $color-font2;
    margin-top: .2rem;
    margin-bottom: .2rem;
  }
  p {
    font-size: $font-size4;
    color: $color-font7;
  }
  span {
    font-size: $font-size4;
    margin-left: $base-indent;
  }
  .doctor-card-img{
    height:3rem; width:3rem;margin-right:0.5rem;
    border-radius: 1.5rem; overflow:hidden;
    float:left
  }
}
a {
  display: block;
}

</style>
