<template>
  <div class="hosp-list">
    <p class="tips">请先选择医院,再继续挂号/缴费。</p>
    <ul class="content-list">
      <li class="list-item" v-for="item in hospList" @click="goNext(item.hospId, item.hospName, item.hospSPic)" :data-hospIcon="item.hospSPic" :key="item.hospId">{{item.hospName}}</li>
    </ul>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'HospList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['hospList', 'userInfo'])
  },
  created () {
    // alert('你真点了我')
    window.scope = this
    this.$store.commit('changeHeaderTitle', '选择医院')
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getHospList()
  },
  methods: {
    ...mapActions([ 'getHospList' ]),
    ...mapMutations([ 'setHospInfo' ]),

    goNext: function (id, hospName, hospSPic) {
      // alert('你点了我')
      this.setHospInfo({hospId: id, hospName: hospName, hospSPic: hospSPic})
      // 登录拦截
      let sessionId = this.getUserIdFromSDK()
      if (this.$route.query.tag === '1') {
        this.$router.push({ name: 'DepartmentList' })
      // 查询报告单时，登陆拦截
      } else if (this.$route.query.tag === '2' && sessionId !== '') {
        this.$router.push({ name: 'InspectionList' })
      } else if (this.$route.query.tag === '2' && sessionId === '') {
        MessageBox({title: '', message: '请先登录再进行操作'}).then(action => {
          if (action === 'confirm') {
            alert('跳转到app登陆页面')
            this.goLogin()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tips{ padding: .5rem .75rem;border-bottom: 1px solid $color-border;/*border-top: 1px solid #ddd*/ }
.list-item{ font-size: .8rem; color: #333;background: #fff;padding: .6rem .75rem;border-bottom: 1px solid $color-border }
</style>
