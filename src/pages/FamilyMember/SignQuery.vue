<template>
  <div class="signQuery">
    <mt-field label="身份证号" placeholder="请输入身份证号" class="filed" v-model="cardNo"></mt-field>
    <cellItem title="签约年度" isLink :value="contractYear" @click.native="linkTo" class="signYear"></cellItem>
    <div class="button">
      <mt-button @click.native ="goQuery()" size="large" type="primary">查 询</mt-button>
    </div>
    <MyModal :width="'100%'" title="签约年度" :visible="visible" @oncancel="onCancel" @onok="onOk" v-if="visible" :className="'pick-number-modal'" :header="true">
      <a class="number-cell" v-for="item in annual" :key="item" @click="pickSeqNumber(item)">
        {{item}}
      </a>
    </MyModal>
  </div>
</template>
<script>
import CellItem from '@/components/CommonComponents/CellItem.vue'
import MyModal from '@/components/CommonComponents/Modal.vue'
import { Button, Field, Toast } from 'mint-ui'
export default {
  name: 'SignQuery',
  components: { Button, Field, MyModal, CellItem },
  data () {
    return {
      visible: false,
      cardNo: '',
      contractYear: '请选择签约年度',
      RegisteredYear: 0,
      annual: [2016, 2017, 2018]
    }
  },
  computed: {
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '家庭医生签约查询')
  },
  methods: {
    // 点击cell跳转函数
    linkTo () {
      this.visible = true
    },
    onCancel () {
      this.visible = false
    },
    onOk () {
      this.visible = false
    },
    pickSeqNumber (year) {
      this.contractYear = year
      this.RegisteredYear = year
      this.visible = false
    },
    goQuery () {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      const vm = this
      if (reg.test(this.cardNo) === false) {
        Toast({ message: '身份证格式不正确', position: 'middle', duration: 2000 })
      } else if (this.RegisteredYear === 0) {
        Toast({ message: '请选择卡类型', position: 'middle', duration: 2000 })
      } else {
        this.$store.dispatch('signQuery', {patientCardId: this.cardNo, registeredYear: this.RegisteredYear}).then(res => {
          vm.$indicator.close()
          this.$router.push({path: '/signQueryResult'})
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .signQuery{
    font-family:PingFangSC-Regular;
  /deep/  .filed{
      margin-top: $base-indent;
      color: $color-font1;
      .mint-cell-wrapper{
        border-bottom: 1px solid $color-border;
        .mint-cell-text{
          font-size: $font-size3;
        }
        .mint-field-core{
          font-family:PingFangSC-Regular;
          color: $color-font7;
          font-size: $font-size3;
        }
      }
    }
  /deep/  .single-line{
      font-family:PingFangSC-Regular;
      color: $color-font7;
      font-size: $font-size3;
    }
    .button{
        margin:$font-size1 0.5rem;
        .mint-button--primary{
          background:$color-font3;
          color:$bg-color;
          font-size: $font-size1;
        }
      }
    .cell-wrapper{
      color: $color-font7;
      font-size: $font-size4;
    }
  /deep/  .pick-number-modal{
      .modal-content{
        position: absolute!important;
        bottom: 0;
        left: 0;
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
          padding: 0.8rem 0.8rem;
          display: block;
        }
      }
    }
  }
</style>
