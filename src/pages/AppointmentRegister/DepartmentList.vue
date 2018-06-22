<template>
  <div class='page'>
    <div class="deptList">
      <div class="item" v-for='(item, index) in deptList' :class='{active: index === deptSelIndex}' :key='item.deptId' @click='handleSel(index, item.deptId)'>{{item.deptName}}</div>
    </div>
    <div class="subDeptList">
      <div class="subItem single-line" v-for='(subItem, index) in deptSubList' :class='{active: index === deptSubSelIndex}' :key='subItem.deptSubId + deptSelIndex' @click='handleToDocList(subItem, index)'>{{subItem.deptSubName}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'DepartmentsList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['hospId', 'hospName', 'deptList', 'deptSubList', 'deptSelIndex', 'deptSubSelIndex'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', this.hospName)
  },
  mounted () {
    this.resetState()
    this.getDeptData({ 'hospId': this.hospId })
  },
  methods: {
    ...mapMutations(['setDeptSelIndex', 'setDeptSubSelIndex', 'setDeptInfo', 'resetState']),
    ...mapActions(['getDeptData', 'getDeptSubData']),

    handleSel: function (index, id) {
      this.setDeptSubSelIndex(-1)
      this.setDeptSelIndex(index)
      this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
      this.getDeptSubData({ 'hospId': this.hospId, 'deptId': id })
    },
    handleToDocList: function (item, index) {
      this.setDeptSubSelIndex(index)
      this.setDeptInfo(item)
      this.$router.push({ name: 'DoctorList' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  @include fill-all;
  display: flex;
  .deptList {
    position: relative;
    flex: 0 0 9.4rem;
    height: 100%;
    overflow: auto;
    font-size: .75rem;
    color: $color-font1;
    box-sizing: border-box;
    // border-right: 1px solid $color-border;
    .item {
      position: relative;
      height: 2.2rem;
      line-height: 2.2rem;
      border-bottom: 1px solid $color-border;
      box-sizing: border-box;
      padding-left: 1.4rem;
      &.active {
        color: $color-font3;
        background-color: #fff;
        // border: none;
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0.2rem;
          background-color: $color-font3;
        }
      }
    }
  }
  .subDeptList {
    flex: auto;
    background-color: #fff;
    color: $color-font2;
    height: 100%;
    overflow: auto;
    font-size: .75rem;
    .subItem {
      height: 2.2rem;
      line-height: 2.2rem;
      // border-bottom: 1px solid $color-border;
      box-sizing: border-box;
      padding: 0 0.75rem;
      &.active {
        color: $color-font3;
      }
    }
  }
}
</style>
