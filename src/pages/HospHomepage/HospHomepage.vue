<template>
  <div class="hospHomepage">
    <div class="hospBg">
      <img :src="'data:image/png;base64,'+getHospHomepage.hospSPic" alt="">
    </div>
    <cellItem class-name="payment-cell" :title="getHospHomepage.hospName" isLink value=" " @click.native="linkToDetail" class="hospTit"></cellItem>
    <CellItem class-name="payment-cell" :title="getHospHomepage.grade" value=" " class="cellBorder"></CellItem>
    <div class="address">
      <p>
        <img src="../../assets/img/dingwei@2x.png" alt="" style="width:0.5rem;height:0.8rem;" class="leftIcon">
        <span>{{getHospHomepage.address}}</span>
      </p>
    </div>
    <div class="address register" style="margin-top: 0.5rem;border-bottom: 1px solid #eee;" @click="goRegister">
      <p>
        <img src="../../assets/img/guahao@2x.png" alt="" style="width:1rem;height:1rem;" class="leftIcon">
        <span>我要挂号</span>
      </p>
      <img src="../../assets/img/right@2x.png" alt="" class="right">
    </div>
    <div class="address register"  @click="goReport">
      <p>
        <img src="../../assets/img/baogao@2x.png" alt="" style="width:1rem;height:1.2rem;" class="leftIcon">
        <span>取报告单</span>
      </p>
      <img src="../../assets/img/right@2x.png" alt="" class="right">
    </div>
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CellItem from '@/components/CommonComponents/CellItem.vue'
export default {
  name: 'HospHomepage',
  components: { CellItem },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getHospHomepage', 'userInfo'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '医院主页')
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getHospHome({hospId: this.$route.query.hospId})
  },
  methods: {
    ...mapActions(['getHospHome']),
    ...mapMutations(['setHospId', 'setSessionId']),

    linkToDetail () {
      this.$router.push({path: '/hospSituation/' + this.$route.query.hospId})
    },
    goRegister () {
      this.$router.push({path: '/hospList', query: {tag: '1'}})
    },
    goReport () {
      let sessionId = this.getUserIdFromSDK()
      if (sessionId !== '') {
        this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
        this.setSessionId(sessionId)
        this.setHospId(this.$route.query.hospId)
        this.$router.push({path: '/inspectionList'})
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
  .hospHomepage{
    .hospBg{
      height: 8rem;
      margin-top: -1px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .address{
      display: flex;
      flex-direction: row;
      padding: 0.4rem 0.8rem;
      background: $bg-color;
      justify-content:space-between;
      font-size: $font-size4;
      color: $color-font1;
      .leftIcon{
        padding-right:0.2rem
      }
      .right{
        width: 0.5rem;
        height: 0.8rem;
      }
    }
    .register{
      font-size: $font-size3;
    }
    .hospTit{
      padding-top:0.4rem;
      .cell-text{
        font-size: $font-size1;
        color: $color-font2;
      }
    }
  }
</style>
<style lang="scss">
.cell.payment-cell{
      border-bottom: 0!important;
      min-height: 1.25rem!important;
      .cell-wrapper{
        padding: 0 0.8rem;
        .cell-value{
          font-size: 0.7rem;
          color: #333333;
          position: absolute;
          right: 0;
          margin-right: 0.1rem;
        }
      }
    }
    .cell.cellBorder{
      .cell-wrapper{
        border-bottom: 1px solid #eee;
        padding-bottom: 0.2rem;
        .cell-text{
          color:#6ea6d2;
          font-size: $base-indent;
          border:1px solid #6ea6d2;
          padding: 0.05rem .1rem;
        }
      }
    }
    .cell-allow-right[data-v-9aa3d020]::after {
        border: solid 1px #ddd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        right: 1rem;
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
</style>
