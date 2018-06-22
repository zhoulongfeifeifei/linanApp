<template>
<div class="header-container">
  <mt-header :title="header" :class="{'androidStyle': android, 'iosStyle' : ios}">
    <mt-button icon="back" slot="left" @click="goBack()" :class="{'ios-mint-but' : ios}"></mt-button>
  </mt-header>
</div>
</template>

<script>
import { Button } from 'mint-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: { Button },
  data () {
    return {
      android: false,
      ios: false
    }
  },
  computed: {
    ...mapGetters([
      'header'
    ])
  },
  methods: {
    goBack () {
      console.log('this.$route', this.$route)
      if (this.$route.name === 'HospList' || this.$route.name === 'RegistrationDetail' || this.$route.name === 'RegisterList' || this.$route.name === 'FamilyMembers' || this.$route.name === 'GuideList' || this.$route.name === 'SignQuery' || this.$route.name === 'HospHomepage') {
        this.goBackApp()
      } else {
        this.$router.back()
      }
    },
    goBackApp () {
      if (window.isAndroid) {
        window.laAndroid.pageClose()
      } else if (window.isiOS) {
        window.webkit.messageHandlers.pageClose.postMessage('')
      }
    }
  },
  created () {
    if (window.isAndroid) {
      this.android = true
    }
    if (window.isiOS) {
      this.ios = true
    }
  },
  mounted () {
    // // 返回APP
    // let vm = this
    // window.goBackApp = function () {
    //   let NoWaitCall = parseInt(vm.$route.query.NoWaitCall)
    //   if (NoWaitCall === 1) {
    //     this.goBackApp()
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999; // 默认，但报告单筛选modal时 优先级不够
  z-index: 1002
}
.mint-header {
  background: $color-bg2;
  // height: 2.25rem;
  color: $color-font2;
  border-bottom: 1px solid #B2B2B2;
  // padding: 10px;
  .mint-header-button {
    flex: .3;
  }
  h1{
    font-size: 0.9rem;
    margin-top: 5px;
    line-height: 1.2rem;
    // height: 1rem;
    // line-height: 1rem;
  }
}
.mint-indicator-mask {
  top: 2.25rem;
}
.iosStyle {
  height: 3.2rem;
}
.androidStyle{
  height: 2.25rem;
}
.ios-mint-but{
  margin-top: 0.8rem;
}
.iosStyle h1{
  margin-top: 1.2rem;
}
</style>
