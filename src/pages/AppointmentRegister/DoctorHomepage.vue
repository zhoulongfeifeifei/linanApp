<template>
    <div  class="homepage">
      <section class='doctor-detail'>
        <div class="img-box">
          <!-- <img :src="docDetail.docIco" alt="" height="100%" width="100%"> -->
          <img src="../../assets/img/doctor_icon.png" alt="" height="100%" width="100%">
        </div>
        <h4>{{docInfo.docName}}&nbsp;<span>{{docInfo.docTitle}}</span></h4>
        <p>{{isFold ? docInfo.docDetailAbbr : docInfo.docDetailAll}}<i v-if="docInfo.docDetailAll.length>24" :class="{'is-fold' : isFold}" @click="showDocDetail()"></i></p>
      </section>
      <section class="sche-list" v-for='(item) in sortList' :key='item.deptId'>
        <div class="sche-item">
          <p>{{item.pbDate}}</p>
          <p class="regi-money">{{item.fee}}元</p>
        </div>
        <div class="sche-item">{{item.timeTypeText}}</div>
        <div class="sche-item">{{item.schTypeText}}</div>
        <div class="sche-item">
          <mt-button type="primary" size="small" :class='{orderAble: isOrder(item)}' @click='handleToRegConfirm(item)'>{{item.pbhyStateText}}</mt-button>
        </div>
      </section>
      <section class="rule">
        <mt-cell title="查看挂号规则" to="/rule" is-link></mt-cell>
      </section>
      <NoData content="当前暂无排班" v-if="!sortList || !sortList.length"></NoData>
    </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
import NoData from '../../components/CommonComponents/NoData.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'DoctorHomeage',
  components: {
    NoData
  },
  data () {
    return {
      isFold: true
    }
  },
  computed: {
    ...mapGetters(['docId', 'hospId', 'deptId', 'docInfo', 'docDetail', 'sortList', 'userInfo'])
  },
  created () {
    this.$store.commit('changeHeaderTitle', '医生主页')
    this.$store.commit('GET_SORT_LIST_FAILURE')
  },
  mounted () {
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getSortList({ hospId: this.hospId, deptId: this.deptId, docId: this.docId })
  },

  methods: {
    ...mapMutations(['changeHeaderTitle', 'setPbInfo', 'setSessionId']),
    ...mapActions(['getDocDetail', 'getSortList']),

    isOrder: function (item) {
      const state = +item.pbhyType
      return state === 3 || state === 4
    },
    showDocDetail: function () {
      this.isFold = !this.isFold
    },

    // 点击“预约”时 进行登陆拦截
    handleToRegConfirm: function (item) {
      if (!this.isOrder(item)) return 'can not order!'
      let sessionId = this.getUserIdFromSDK()
      alert(sessionId)
      if (sessionId !== '') {
        this.setSessionId(sessionId)
        this.setPbInfo(item)
        this.$router.push({ name: 'RegistrationConfirm' })
      } else {
        MessageBox({title: '', message: '请先登录再进行操作'}).then(action => {
          if (action === 'confirm') {
            this.goLogin()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.homepage {
  .doctor-detail {
    min-height: 4rem;
    padding: 0.75rem 0.7rem 0.55rem;
    box-sizing: border-box;
    background:url('../../assets/img/yisheng_bg.png') no-repeat;
    background-size: 100% 100%;
    border-bottom: 1px solid #eee;
    color: #fff;
    .img-box{
      height:3.5rem; width:3.5rem;
      margin: 0 auto
    }
    h4{
      text-align: center;
      font-size:.8rem;
      letter-spacing:2px;
      padding: .5rem 0 .2rem;
      span{
        font-size: .55rem;
        letter-spacing:0;
      }
    }
    p{
      font-size:.65rem;
      text-indent: 1.3rem;
      padding: .2rem 0;
      position: relative;
      i:after{
        content: '';
        position: absolute;
        bottom:-0.5rem;
        right: .5rem;
        width:9px; height:9px;
        border-left:1px solid #fff;
        border-bottom:1px solid #fff;
        transform: rotate(135deg)
      }
      i.is-fold:after{
        bottom:0.5rem;
        transform: rotate(-45deg)
      }
    }
  }
  .sche-list {
    padding: 11px 15px;
    display: flex;
    justify-content: space-between;
    /*align-items: center;*/
    background-color: $color-font6;
    font-size: $font-size3;
    color: $color-font2;
    border-bottom: 1px solid $color-border;
    .sche-item {
      .regi-money {
        color: $color-font4;
        font-size: $font-size4;
        margin-top: .4rem;
      }
      /deep/ .mint-button--small {
        height: 1.5rem;
        line-height: 1.5rem;
        background-color: $color-btn1;
        &.orderAble {
          background-color: $color-btn2;
        }
      }
    }
  }
  .sche-list:last-child{
  }
  /deep/.mint-cell{
    margin-top: .65rem;
    .mint-cell-allow-right::after{
      width:9px;height:9px
    }
  }
}
</style>
