<template>
  <div class="familyMember">
    <div class="card" @click="goIn(item.patnName, item.cardNo, cardType, item.cardNum, item.cardId)">
      <div class="cardHead" :style="cardType === 1 ? styleObj[0] : styleObj[1]">
        <img :src="cardType === 1 ? src[0] : src[1]" alt="">
        <span>{{cardType === 1 ? '杭州社会保障卡.市民卡' : '杭州健康卡'}}</span>
      </div>
      <ul class="cardHead cardInfo">
        <li class="name">{{item.patnName}}</li>
        <li><span  class="text">身份证号</span><span>{{item.cardNo}}</span></li>
        <li><span class="text">卡号</span><span>{{item.cardNum}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import smk from '@/assets/img/smk@2x.png'
import jkk from '@/assets/img/jkk@2x.png'
export default {
  name: 'FamilyMember',
  components: {
    smk, jkk
  },
  props: ['cardType', 'item'],
  data () {
    return {
      styleObj: [
        {background: '#249dee'},
        {background: '#7dbf3e'}
      ],
      src: [
        smk, jkk
      ]
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    goIn (patnName, cardNo, cardType, cardNum, cardId) {
      this.$store.commit('deleteMember', {patnName: patnName, cardNo: cardNo, cardType: cardType, cardNum: cardNum, cardId: cardId})
      this.$router.push({path: '/deleteMember'})
    }
  }
}
</script>
<style lang="scss" scoped>
  .card{
    padding:$font-size2 $font-size2 0 $font-size2;
    .cardHead{
      padding: $font-size3;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      img{
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.2rem;
      }
      span{
        font-size: $font-size3;
        line-height: 1.25rem;
        color: $bg-color;
      }
    }
    .cardInfo{
      background: $bg-color;
      li{
        span{
          font-size: $font-size4;
          color: $color-font1;
          line-height: 1;
        }
        .text{
          display: inline-block;
          width: 20%;
        }
      }
      .name{
        font-size: $font-size2;
        color: $color-font2;
        padding-bottom: 0.3rem;
      }
    }
  }
</style>
