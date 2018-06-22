<template>
  <div class="noData">
    <img class="img-empty" src="../../assets/img/icon_empty.png">
    <p class="tips">{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    'content': {
      type: String,
      default: '当前暂无记录'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.noData { text-align: center; margin-top: 6rem}
.tips { margin: .5rem auto; font-size: .7rem; color: #666; width: 80%; line-height: 1rem }
.img-empty {width: 5rem; height: 5rem;}
</style>
