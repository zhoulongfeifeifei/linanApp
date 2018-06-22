<template>
  <div v-html="rule" class="rule">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Rule',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['rule', 'hospId'])
  },
  created () {
    this.$store.commit('changeHeaderTitle', '挂号规则')
    this.$store.dispatch('getRule', {hospId: this.hospId})
  },
  methods: {
  }
}
</script>

<style scoped>
.rule { background: #fff; padding: 1rem; line-height: 1.2rem; font-size: .7rem }
</style>
