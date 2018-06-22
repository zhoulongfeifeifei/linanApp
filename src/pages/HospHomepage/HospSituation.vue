<template>
  <div class="hospSituation">
    <div class="hospDetail">
      <div class="hospImg"><img :src="'data:image/png;base64,'+getHospHomepage.hospSPic" alt=""></div>
      <p class="hopsIntroduct">
        <span class="hospName">{{getHospHomepage.hospName}}</span>
        <span class="hospLevel">{{getHospHomepage.grade}}</span>
        <span><img src="../../assets/img/dingwei@2x.png" alt="">{{getHospHomepage.address}}</span>
      </p>
    </div>
    <p class="hospText">{{getHospHomepage.details}}</p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HospSituation',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['getHospHomepage'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '医院概况')
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getHospHome({hospId: this.$route.params.id})
  },
  methods: {
    ...mapActions(['getHospHome'])
  }
}
</script>
<style lang="scss" scoped>
.hospSituation{
  .hospDetail{
    display: flex;
    flex-direction: row;
    background: $bg-color;
    padding: 0.8rem;
    .hospImg{
      width: 3.5rem;
      height: 3rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .hopsIntroduct{
      display: flex;
      flex-direction: column;
      padding-left:0.4rem;
      .hospName{
        font-size: $font-size3;
        color: $color-font2;
      }
      .hospLevel{
        width: 55%;
        color:#6ea6d2;
        font-size: 0.45rem;
        border:1px solid #6ea6d2;
        text-align: center;
      }
      img{
        width:$base-indent;
        height:$font-size1;
        margin-right: 0.2rem;
      }
    }
  }
  .hospText{
    margin-top: 0.5rem;
    padding-top: 0.2rem;
    text-indent:2em;
    background: $bg-color;
    font-size: $font-size3;
    font-family:PingFangSC-Regular;
    line-height: 1.5;
  }
}
</style>
