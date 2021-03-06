<template>
<div class="">
  <div class="bar-code ac" v-if="registrationDetail.barcodeUrl">
    <p class="title" :style="{margin: '0.1rem'}">{{registrationDetail.barCodeName}}</p>
    <p @click="openModal">
      <img :src="registrationDetail.barcodeUrl" :style="{width: '12.2rem', height: 'auto'}"/>
    </p>
    <p class="info" :style="{margin: '0.1rem'}">{{registrationDetail.barCodeNo}}</p>
    <p class="info" :style="{padding: '0 0 0.3rem', color: '#999'}">(凭此条形码到相应科室就诊)</p>
  </div>
  <div class="margin-top-m status profile">
    <CellItem title="状态" :value="registrationDetail.regStatus" :text-color="registrationDetail.regStatusColor"></CellItem>
  </div>
  <div class="margin-top-m tips" v-if="registrationDetail.canCancel === '1'">
    <CellItem title="就医提醒" value=" " is-open v-if="registrationDetail.prompt">
      <p v-html="registrationDetail.prompt" slot="collapse-content"></p>
    </CellItem>
  </div>
  <div class="margin-top-m profile">
    <CellItem :title="item.value" :value="registrationDetail[item.key]" :value-div="item.valueDiv" v-for="(item, index) in fields" :key="index" :is-money="item.isMoney" :text-color="item.color" v-if="(!item.hide || (item.hide && registrationDetail[item.key]))">
      <slot v-if="item.key === 'deptName' && registrationDetail.docTitle" slot="value-div">
        <span class='doctor-tag'>{{registrationDetail.docTitle}}</span>
      </slot>
      <slot v-if="item.key === 'userName' && registrationDetail.mrn" slot="value-div">
        <span v-if="registrationDetail.mrn" :style="{fontSize: '0.6rem'}">&nbsp;(病历号{{registrationDetail.mrn}})</span>
      </slot>
    </CellItem>
  </div>
  <div class="margin-top-m tips" v-if="registrationDetail.canCancel !== '1'">
    <CellItem title="就医提醒" value=" " is-open v-if="registrationDetail.prompt">
      <p v-html="registrationDetail.prompt" slot="collapse-content"></p>
    </CellItem>
  </div>
  <div class="margin-top-m profile" :style="{marginBottom: registrationDetail.canCancel === '1' ? '2rem' : '0'}">
    <CellItem :title="item.value" :value="registrationDetail[item.key]" :value-div="item.valueDiv" v-for="(item, index) in payFields" :key="index" :is-money="item.isMoney" :text-color="item.key === 'payStatus' ? registrationDetail.payStatusColor : item.color" :is-link="item.isLink" v-if="((!item.hide || (item.hide && registrationDetail[item.key])) && (registrationDetail.regStatus !== '预约成功' || (!item.delete && registrationDetail.regStatus === '预约成功')))">
      <slot v-if="item.valueDiv" slot="value-div">
        <span v-if="registrationDetail[item.key]">元<span v-if="registrationDetail.payMethod" :style="{fontSize: '0.6rem'}">({{registrationDetail.payMethod}})</span></span>
      </slot>
    </CellItem>
  </div>
  <mt-button class="cancel-button" type="primary" v-if="registrationDetail.canCancel === '1'" @click.native="cancelRegistration">取消预约</mt-button>

  <MyModal :visible="visible" @oncancel="onCancel" @onok="onOk" v-if="visible" :className="'barcode-modal'">
    <div class="rotate-content" ref="rotateContent">
      <h4 class="title">{{registrationDetail.hospName}}</h4>
      <p class="title">{{registrationDetail.barCodeName}}</p>
      <p class="bar-image" @click="openModal">
        <img :src="registrationDetail.barcodeUrl" :style="{width: '100%', height: '6.5rem', margin: 'auto 0'}"/>
      </p>
      <p class="code-info" :style="{fontSize: '1.6rem'}">{{registrationDetail.barCodeNo}}</p>
      <p class="info">(凭此条形码到相应科室就诊)</p>
    </div>
  </MyModal>

</div>
</template>
<script>
import { Cell, Button, MessageBox } from 'mint-ui'
import MyModal from '@/components/CommonComponents/Modal.vue'
import CellItem from '@/components/CommonComponents/CellItem.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RegistrationDetail',
  components: { Cell, Button, MyModal, CellItem },
  data () {
    return {
      fields: [
        {key: 'userName', value: '就诊人', valueDiv: true},
        {key: 'hospName', value: '就诊医院'},
        {key: 'deptName', value: '就诊科室', valueDiv: true},
        {key: 'treatTime', value: '就诊时间', color: '#249dee'},
        {key: 'codePass', value: '取号密码', color: '#249dee', hide: true}
      ],
      payFields: [
        {key: 'payStatus', value: '支付状态'},
        {key: 'fee', value: '费用总额', color: '#ff2b2b', isMoney: true},
        {key: 'medicareFee', value: '医保支付', isMoney: true, hide: true},
        {key: 'personalFee', value: '个人支付', color: '#ff2b2b', valueDiv: true, delete: true},
        {key: 'invoice', value: '发票号', delete: true},
        {key: 'regId', value: '挂号单号'},
        {key: 'regTime', value: '挂号时间'}
      ],
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'registrationDetail'
    ])
  },
  created () {
    this.$store.commit('changeHeaderTitle', '挂号单详情')
    this.$store.commit('GET_REGISTRATION_DETAIL_FAILURE')
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getRegistrationDetail({regId: this.$route.params.id})
  },
  mounted () {
    // 返回首页
    const vm = this
    window.goHome = function () {
      vm.$router.push({path: '/hospList', query: {tag: 1}})
    }
  },

  methods: {
    ...mapActions(['getRegistrationDetail', 'cancelPrescription']),
    onCancel () {
      this.visible = false
    },
    onOk () {
      this.visible = false
    },
    openModal () {
      this.visible = true
    },
    cancelRegistration () {
      const vm = this
      MessageBox({title: '提示', message: '确定取消预约?', showCancelButton: true}).then(action => {
        if (action !== 'cancel') {
          vm.$indicator.open({text: '加载中...', spinnerType: 'snake'})
          vm.cancelPrescription({regId: vm.$route.params.id}).then(res => {
            if (res.state === '1') {
              MessageBox('提示', res.result ? res.result : '取消预约成功')
            } else {
              MessageBox('提示', res.result ? res.result : '取消预约失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.flex-container{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.flex-main{
  background-color: #ffffff;
  flex: 1;
}
.button-container{
  padding: 0.95rem 0.75rem;
  button{
    width: 100%;
  }
}
.bar-code{
  background-color: #fff;
  border-bottom: 1px solid #ddd
}
.margin-top-m{
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd
}
.profile{
  padding-left: 0.75rem;
  background-color: #ffffff;
  .cell{
    min-height: 2rem!important;
  }
  .cell-wrapper{
    padding: 0!important;
    .cell-title{
      width: 4rem;
    }
  }
}
.barcode-modal{
  .modal-dialog{
    width: 100%!important;
    height: 100%;
    top: 0;
    padding-bottom: 0;
    .modal-content{
      border-radius: 0;
      height: 100%;
      img{
        display: block;
      }
    }
    .rotate-content {
      width: 27.4rem;
      margin: 0 auto;
      transform: rotate(90deg);
      transform-origin: 8rem;
      position: fixed;
      top: 15%;
    }
    h4.title{
      margin: 0.1rem;
      text-align: center;
      color: $color-font2;
      font-size: 0.8rem;
    }
    p.title{
      margin: 0.1rem;
      text-align: center;
      font-size: 0.75rem;
    }
    p.bar-image{
      height: 6.5rem;
      text-align: center;
    }
    p.code-info{
      margin: 0.1rem;
      text-align: center;
      color: $color-font2
    }
    p.info{
      margin: 0.1rem;
      text-align: center;
      color: $color-font7
    }
  }
}
.cancel-button{
  position: fixed;
  bottom: 0;
  background-color: #fff;
  color: #333333;
  width: 100%;
  border-top: 1px solid $color-border;
  border-radius: 0;
  font-size: 0.7rem;
}
.doctor-tag{
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid $color-font3;
  color: $color-font3;
  margin-left: 2px;
  font-size: 0.5rem;
  padding: .05rem .1rem;
  margin-left: 0.25rem;
}
</style>
