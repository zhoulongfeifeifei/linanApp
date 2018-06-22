<template>
  <div class="familyMember">
    <FamilyMember v-for="item in getMember" :key="item.cardId" :item='item' :cardType="item.cardType"></FamilyMember>
    <p class="addPerson">已添加<span>{{getBind.bindSize}}</span>,还能添加<span>{{getBind.restSize}}</span>人</p>
    <div @click ="goAdd()" type="default" size="large" class="btn">
      <img src="../../assets/img/tianjia@2x.png" alt="">
      立即添加
      </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { mapGetters, mapMutations } from 'vuex'
import FamilyMember from '../../components/CommonComponents/FamilyMember.vue'
export default {
  name: 'FamilyMembers',
  components: {
    FamilyMember
  },
  data () {
    return {
      cardType: 1
    }
  },
  computed: {
    ...mapGetters(['getMember', 'getBind', 'userInfo'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '家庭成员')
    this.getMemmber()
  },
  methods: {
    ...mapMutations(['setHospId', 'setSessionId']),
    getMemmber () {
      this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
      this.$store.dispatch('getMembers', {sessionId: this.userInfo.sessionId})
    },
    goAdd () {
      if (this.getBind.restSize === 0) {
        Toast({
          message: '添加成员已满',
          position: 'middle',
          duration: 2000
        })
      } else {
        this.$router.push({path: '/addMembers'})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .addPerson{
    padding:0.3rem $font-size2;
    text-align: right;
    color: #999;
    font-size: $font-size4;
    span{
      color: #249dee
    }
  }
  .btn{
    border:1px dotted #249dee;
    margin: 0.7rem;
    padding:0.5rem 0;
    border-radius: 24px;
    color: #249dee;
    text-align: center;
    font-size: 0.8rem;
    img{
      width: 0.75rem;
      height: 0.75rem;
    }
  }
</style>
