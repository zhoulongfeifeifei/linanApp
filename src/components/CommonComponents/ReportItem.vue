<template>
  <div class="report-item" @click="goNext(item.repCode, item.repType, item.repDate)">
    <div class="report-content">
      <mt-cell :title="item.repName" class="report-content">
        <span :style="{color: '#999'}">{{item.repTime}}</span>
      </mt-cell>
      <p class="lable">{{item.hospSName}}</p>
    </div>
    <mt-cell :title="'就诊人：'" :label="item.patnName" class="user-content">
      <span :style="{color: item.repStatusColor}">{{item.repStatus}}</span>
    </mt-cell>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ReportItem',
  props: ['item'],
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['setInspectionDate']),

    goNext: function (id, repType, repDate) {
      this.setInspectionDate(repDate)
      this.$router.push({path: '/inspectionDetail/' + id, query: {repType: repType}})
    }
  }
}
</script>

<style lang="scss" scoped>
.report-item{ margin-bottom: 0.5rem }
/deep/.report-content {
  .mint-cell{ min-height:38px;color:$color-font2 }
  .mint-cell-wrapper{ padding: .65rem .5rem 0 }
  .mint-cell-value{color:$color-font7;font-size:.6rem }
  .mint-cell-label{ display: block }
}
.report-content {
  .lable{padding:.1rem 0 .5rem .5rem;color:#888; background:#fff;font-size:.65rem}
  .doc-title {color:$color-font3;border:1px solid $color-font3;border-radius:0.15rem; padding: .05rem .2rem;margin-left:.5rem;font-size:.5rem}
}
/deep/.user-content{
  .mint-cell-text{ font-size:.6rem;color:#888; }
  .mint-cell-label{ color:$color-font1; vertical-align:middle }
  .mint-cell-value span{font-size:.65rem}
}
</style>
