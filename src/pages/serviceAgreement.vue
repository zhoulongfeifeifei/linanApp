<template>
  <div class="service">
软件许可及服务协议
  </div>
</template>

<script>
export default {
  name: 'ServiceAgreement',
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.$store.commit('changeHeaderTitle', '软件许可及服务协议')
  },
  methods: {
  }
}
</script>

<style scoped>
.service { background: #fff; padding: 1rem; line-height: 1.2rem; font-size: .7rem }
</style>
