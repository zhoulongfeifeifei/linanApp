<template>
  <div class="deleteMember">
    <div v-if="getQueryList.IsRegistered === '1'">
      <div class="sign">
        <img src="../../assets/img/chengg@2x.png" alt="">
        <p>已签约</p>
      </div>
      <cellItem title="姓名" :value="getQueryList.patnName"></cellItem>
      <cellItem title="身份证号" :value="getQueryList.RegisteredDoctorCardID"></cellItem>
      <CellItem class-name="payment-cell" title="签约医生" value=' ' :value-div="true">
        <div slot="value-div">
          <img :src="getQueryList.docPic" alt="">
          <p>{{getQueryList.RegisteredDoctorName}}</p>
        </div>
      </CellItem>
      <cellItem title="签约地点" :value="getQueryList.MedicalOrgName"></cellItem>
      <cellItem title="签约时间" :value="getQueryList.RegisteredYear"></cellItem>
    </div>
    <NoData :content="'“' + getQueryList.patnName + '/' + getQueryList.RegisteredDoctorCardID + '”' + getQueryList.RegisteredYear + '年度没有签约记录。\n可和签约服务中心联系，确认签约状态。'" v-if="getQueryList.IsRegistered !== '1'"></NoData>
  </div>
</template>
<script>
import CellItem from '@/components/CommonComponents/CellItem.vue'
import NoData from '../../components/CommonComponents/NoData.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SignQueryResult',
  components: { CellItem, NoData },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getQueryList'])
  },
  created () {
    window.scope = this
    this.$store.commit('changeHeaderTitle', '家庭医生签约查询')
    this.getQueryList.docPic = 'data:image/png;base64,' + this.getQueryList.docPic
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
  .sign{
    text-align: center;
    padding: 1.5rem 0;
    margin-bottom: 0.5rem;
    background: $bg-color;
    img{
      width: 3rem;
      height: 3rem;
    }
    p{
      padding-top:0.5rem;
    }
  }
  .cell.payment-cell{
     min-height: 2.5rem!important;
     padding: 0.3rem 0;
    img{
      width: 1.5rem;
      height: 1.5rem;
      margin-bottom: 0.2rem;
    }
    p{
      color:$color-font1;
      font-size: $font-size4;
    }
  }
  .button{
      margin:$font-size1 0;
      .mint-button--primary{
        background: #fff;
        color:#f22735;
        font-size: $font-size3;
      }
    }
  .cell-wrapper{
    color: $color-font7;
    font-size: $font-size4;
  }
</style>
