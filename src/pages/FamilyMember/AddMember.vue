<template>
  <div class="addMember">
    <mt-field label="姓名" placeholder="请输入姓名" class="filed" v-model="patnName"></mt-field>
    <mt-field label="身份证号" placeholder="请输入身份证号" class="filed" v-model="cardNo"></mt-field>
    <cellItem title="卡类型" isLink :value="cardText" @click.native="linkTo" class="cardType"></cellItem>
    <mt-field label="卡号" placeholder="请输入卡号" class="filed" v-model="cardNum"></mt-field>
    <div class="prompt">
      <h3>温馨提示</h3>
       <p>1、可选择输入市民卡卡号或者健康卡卡号绑定</p>
    </div>
    <div class="button">
      <mt-button @click.native ="goAdd()" size="large" type="primary">添 加</mt-button>
    </div>
    <MyModal :width="'100%'" title="选择卡类型" :visible="visible" @oncancel="onCancel" @onok="onOk" v-if="visible" :className="'pick-number-modal'" :header="true">
    <a class="number-cell" v-for="(item, index) in cardInfo" :key="index" @click="pickSeqNumber(item.cardType,item.cardText)">
      {{item.cardText}}
    </a>
  </MyModal>
  </div>
</template>
<script>
import { Button, Field, Toast } from 'mint-ui'
import CellItem from '@/components/CommonComponents/CellItem.vue'
import MyModal from '@/components/CommonComponents/Modal.vue'
export default {
  name: 'AddMember',
  components: { Button, Field, MyModal, CellItem },
  data () {
    return {
      visible: false,
      cardText: '请选择卡类型',
      cardInfo: [
        {cardType: 1, cardText: '杭州社会保障卡.市民卡'},
        {cardType: 2, cardText: '杭州健康卡'}
      ],
      patnName: '',
      cardNo: '',
      cardNum: '',
      cardType: 0
    }
  },
  computed: {

  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '添加家庭成员')
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
    pickSeqNumber (cardType, cardText) {
      this.cardType = cardType
      this.cardText = cardText
      this.visible = false
    },
    goAdd () {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      const vm = this
      if (!this.patnName) {
        Toast({
          message: '姓名不能为空',
          position: 'middle',
          duration: 2000
        })
      } else if (reg.test(this.cardNo) === false) {
        Toast({
          message: '身份证格式不正确',
          position: 'middle',
          duration: 2000
        })
      } else if (!this.cardNum) {
        Toast({
          message: '卡号不能为空',
          position: 'middle',
          duration: 2000
        })
      } else if (this.cardType === 0) {
        Toast({
          message: '请选择卡类型',
          position: 'middle',
          duration: 2000
        })
      } else {
        this.$store.dispatch('addMembers', {patnName: this.patnName, cardNo: this.cardNo, cardNum: this.cardNum, cardType: this.cardType}).then(res => {
          vm.$indicator.close()
          vm.$router.go(-1)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .addMember{
    margin-top: $base-indent;
  /deep/  .filed{
      background: $bg-color;
      font-size: $font-size3;
      color: $color-font1;
      border-bottom: 1px solid $color-border;
      .mint-cell-wrapper{
          background-image:-webkit-linear-gradient(bottom, $bg-color, $bg-color 50%, transparent 50%);
      }
    }
  /deep/  .mint-field-core{
      font-family:PingFangSC-Regular;
      color: $color-font7;
      font-size: $font-size3;
    }
    .cell-wrapper{
      color: $color-font7;
      font-size: $font-size4;
    }
    .cardType{
      margin-top: 0.5rem;
    }
  /deep/  .single-line{
      color: #777;
      font-size: $font-size3;
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
    .prompt{
        padding: $base-indent;
        color: $color-font7;
        h3{
          font-size: $font-size3;
        }
        p{
          font-size: $font-size4;
          padding: 0.2rem 0;
        }
      }
      .button{
        margin:$font-size1 $base-indent;
        .mint-button--primary{
          font-size: $font-size3;
        }
      }
    }
</style>
