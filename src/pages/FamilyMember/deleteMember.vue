<template>
  <div class="deleteMember">
    <cellItem title="姓名" :value="deleteMember.patnName"></cellItem>
    <cellItem title="身份证号" :value="deleteMember.cardNo"></cellItem>
    <cellItem title="卡类型" isLink :value="deleteMember.cardType ===1 ? cardInfo[0].cardText : cardInfo[1].cardText"></cellItem>
    <cellItem title="卡号" isLink :value="deleteMember.cardNum"></cellItem>
    <div class="button">
      <mt-button @click.native ="goDelete()" size="large" type="primary">删 除</mt-button>
    </div>
    <MyModal :width="'100%'" title="选择卡类型" :visible="visible" @oncancel="onCancel" @onok="onOk" v-if="visible" :className="'pick-number-modal'" :header="true">
    <a class="number-cell" v-for="(item, index) in cardInfo" :key="index" @click="pickSeqNumber(item.cardType,item.cardText)">
      {{item.cardText}}
    </a>
  </MyModal>
  </div>
</template>
<script>
import CellItem from '@/components/CommonComponents/CellItem.vue'
import MyModal from '@/components/CommonComponents/Modal.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'DeleteMember',
  components: { MyModal, CellItem },
  data () {
    return {
      visible: false,
      cardName: '李美丽',
      cardNo: '4355466567676',
      cardNum: 'A23445',
      cardText: '请选择卡类型',
      cardInfo: [
        {cardType: 1, cardText: '杭州社会保障卡.市民卡'},
        {cardType: 2, cardText: '杭州健康卡'}
      ]
    }
  },
  computed: {
    ...mapGetters(['deleteMember'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '家庭成员')
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
    goDelete () {
      this.$store.dispatch('deleteMembers', {cardId: this.deleteMember.cardId})
        .then(res => {
          this.$indicator.close()
          this.$router.go(-1)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .button{
      margin:$font-size1 0;
      .mint-button--primary{
        background: #fff;
        color:#f22735;
        font-size: $font-size3;
      }
    }
  .cell-wrapper{
    color: $color-font7;
    font-size: $font-size4;
  }
  .pick-number-modal{
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
</style>
