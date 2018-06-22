<template>
  <div class="guide">
    <div class="guideList" v-for="(item, index) in guideList" :key="item.dept" @click="fold(index,item.shows)">
      <p class="guidText">
        <span>{{item.dept}}</span><img :src="num === index ? downImg : upImg" alt="">
      </p>
      <ul v-for="items in item.deptList" :key='items.id' v-show='num === index ? true : false'>
        <li class="guidText" @click="goIn(items.id)">
          <img src="../../assets/img/zixun@2x.png" alt="" style="width:1rem;height:1.15rem;margin:-0.1rem 0.15rem">
          {{items.text}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import upImg from '@/assets/img/img_jiantou@2x.png'
import downImg from '@/assets/img/img_jiantou1@2x.png'
export default {
  name: 'GuideList',
  components: {
    upImg, downImg
  },
  data () {
    return {
      upImg: upImg,
      downImg: downImg,
      num: 0,
      guideList: [
        {dept: '参保登记科', deptList: [{id: 0, text: '被征地农民退保'}, {id: 1, text: '被征地农民退保'}, {id: 2, text: '被征地农民退保'}]},
        {dept: '结算管理科', deptList: [{id: 3, text: '被征地农民退保'}, {id: 4, text: '被征地农民退保'}, {id: 5, text: '被征地农民退保'}]},
        {dept: '社保关系科', deptList: [{id: 6, text: '被征地农民退保'}, {id: 7, text: '被征地农民退保'}, {id: 8, text: '被征地农民退保'}]},
        {dept: '综合科', deptList: [{id: 9, text: '被征地农民退保'}, {id: 10, text: '被征地农民退保'}, {id: 11, text: '被征地农民退保'}]}
      ]
    }
  },
  computed: {
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '办事指南')
  },
  methods: {
    fold (index, shows) {
      if (this.num === index) {
        this.num = -1
      } else {
        this.num = index
      }
    },
    goIn (id) {
      this.$router.push({path: '/guideDetail/' + id})
    }
  }
}
</script>
<style lang="scss" scoped>
  .guideList{
    background: $bg-color;
    font-size: $font-size3;
    color: $color-font2;
    .guidText{
      padding: $font-size3;
      border-bottom:1px solid $color-border;
      img{
        display: inline-block;
        width:0.75rem;
        height:0.4rem;
        margin-top: 0.4rem;
      }
    }
    p{
      font-size: $font-size2;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img{
        width: 0.45rem;
        height: $font-size1;
      }
    }
  }
</style>
