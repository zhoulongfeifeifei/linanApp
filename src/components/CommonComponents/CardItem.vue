<template>
  <div class="card-item" @click="goNext(item.regId)">
    <mt-cell title="就诊人" :label="item.userName" is-link class="userName">
      <span :style="{color : item.regStatusColor}">{{item.regStatus}}</span>
    </mt-cell>
    <div class="item-content">
      <i class="line"></i>
      <div>
        <span class="font-span">{{item.deptName}}&nbsp;{{item.docName}}</span>
        <span class="sche-rank">{{item.docTitle}}</span>
      </div>
      <span class="hosp-font">{{item.hospSName}}</span><br>
      <span class="time-font"><i></i>{{item.regTime}} {{item.noonType === '1' ? '上午' : '下午'}}{{item.regSeq}}号</span>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'CardItem',
  props: ['item'],
  data () {
    return {
      // regStatus: '--'
    }
  },
  computed: {
  },
  created () {
    // if (this.item.regStatus === -1) {
    //   this.regStatus = '预约失败'
    // } else if (this.item.regStatus === 0) {
    //   this.regStatus = '已提交'
    // } else if (this.item.regStatus === 1) {
    //   this.regStatus = '挂号成功'
    // } else if (this.item.regStatus === 2) {
    //   this.regStatus = '预约成功'
    // } else if (this.item.regStatus === 3) {
    //   this.regStatus = '已取消'
    // } else {
    //   this.regStatus = '已就诊'
    // }
  },
  methods: {
    goNext: function (id) {
      this.$router.push({path: '/regDetail/' + id})
    }
  }
}
</script>

<style lang="scss">
.card-item { background: #fff;margin-bottom: 0.5rem;border-bottom: 1px solid $color-border2;border-top: 1px solid $color-border2  }
.mint-cell span { font-size: 0.7rem }
.item-content { padding: 0 .75rem 0 .5rem }
.sche-rank{
  box-sizing: border-box;
  border-radius: 2.5px;
  border: 1px solid #249dee;
  color: #249dee;
  margin-left: 2px;
  font-size: 0.4rem;
  padding: 0.05rem .1rem;
  margin-left: 0.25rem;
  line-height: 0.6rem;
}
.line { display: block;border-top:1px solid $color-border; padding-bottom: .6rem }
.hosp-font { font-size: .65rem; color: #666 }
.font-span{
  color: #333;
  font-size: 0.75rem;
}
.time-font { color: #666 ;background: $color-border; font-size: .6rem ;padding: .3rem .6rem; margin: .3rem 0 .6rem; display: inline-block;border-radius:.75rem }
.time-font i { display: inline-block; height: .9rem; width: .9rem; background: url(../../assets/img/icon_time.png) no-repeat; background-size: 100% 100%; vertical-align: top;margin-right: .3rem }
.card-item .userName .mint-cell-label {
    font-size: $font-size3;
    color:#333;
}
</style>
