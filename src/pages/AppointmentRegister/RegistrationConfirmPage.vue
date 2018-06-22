<template>
<div class="flex-container">
  <section>
    <cellItem :title="item.value" :value="registration[item.key]" :value-div="item.valueDiv" v-for="(item, index) in fields" :key="index" :is-money="item.isMoney" :text-color="item.color">
      <slot v-if="item.valueDiv" slot="value-div">
        <span class='doctor-tag'>{{registration.docTitle}}</span>
      </slot>
    </cellItem>
  </section>
  <section class="margin-top-m flex-main">
    <cellItem title="就诊人" isLink hasSubtitle :value="person ? person : patientInfo.userName" :subValue="personCard ? personCard : '(' + patientInfo.cardType + patientInfo.cardNum + ')'" @click.native="linkTo('person')"></cellItem>
    <cellItem title="就诊序号" isLink :value="number ? number : '请选择就诊序号'" @click.native="linkTo('num')"></cellItem>
  </section>
  <section class="button-container">
    <mt-button type="danger" @click="handleToComfirmDetail()">提 交</mt-button>
  </section>

  <MyModal :width="'100%'" title="选择就诊人" :visible="personVisible" @oncancel="onCancel('person')" @onok="onOk('person')" v-if="personVisible" :className="'pick-number-modal'" :header="true">
    <a class="number-cell" v-for="(item, index) in userList" :key="index" @click="pickPerson(item)">{{item.userName}}<span>({{item.cardType}}{{item.cardNum}})</span></a>
  </MyModal>

  <MyModal :width="'100%'" title="选择就诊序号" :visible="numVisible" @oncancel="onCancel('num')" @onok="onOk('num')" v-if="numVisible" :className="'pick-number-modal'" :header="true">
    <a class="number-cell" v-for="(item, index) in seqNumList" :key="index" @click="pickSeqNumber(item.seqNum,item.timePart)">{{item.seqNum}}号 <span>{{item.timePart}}</span></a>
  </MyModal>
</div>
</template>

<script>
import { Button, MessageBox } from 'mint-ui'
import CellItem from '@/components/CommonComponents/CellItem.vue'
import MyModal from '@/components/CommonComponents/Modal.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

const fields = [
  {key: 'hospName', value: '就诊医院', color: '', isMoney: false},
  {key: 'schTypeText', value: '门诊类型', color: '', isMoney: false, valueDiv: true},
  {key: 'deptName', value: '就诊科室', color: '', isMoney: false},
  {key: 'pbDate', value: '就诊时间', color: '#249dee', isMoney: false},
  {key: 'fee', value: '挂号费', color: '#ff2b2b', isMoney: true}
]

export default {
  name: 'RegistrationConfirm',
  components: { Button, CellItem, MyModal },
  data () {
    return {
      fields: fields,
      numVisible: false, // 就诊序号模态框是否显示
      personVisible: false, // 就诊人模态框是否显示
      number: '', // 就诊序号
      person: '', // 就诊人
      personCard: ''
    }
  },
  computed: {
    ...mapGetters(['registration', 'seqNumList', 'userList', 'patientInfo', 'regParams', 'bookRegistParams', 'userInfo'])
  },
  created () {
    this.$store.commit('changeHeaderTitle', '挂号确认单')
  },
  mounted () {
    this.$indicator.open({text: '加载中...', spinnerType: 'snake'})
    this.getSeqNumList({...this.regParams}) // 获取就诊序号列表
    this.getUserList({sessionId: this.userInfo.sessionId}) // 获取就诊人列表
  },

  methods: {
    ...mapActions([ 'getSeqNumList', 'getUserList', 'postAppointRegistration' ]),
    ...mapMutations([ 'setSeqNum', 'setPatientInfo' ]),

    handleToComfirmDetail () {
      if (this.number === '') {
        this.$toast({message: '请选择就诊序号', position: 'center', duration: 2000})
      } else {
        this.setSeqNum(this.number.substr(0, 1))
        this.postAppointRegistration({...this.bookRegistParams}).then(res => {
          if (res.state === '1') {
            this.$router.push({path: '/regDetail/' + res.regId})
          } else {
            MessageBox('提示', res.result ? res.result : '挂号失败')
          }
        })
      }
    },

    // 点击cell跳转函数
    linkTo (type) {
      type === 'person' ? this.personVisible = true : this.numVisible = true
    },
    onCancel (type) {
      type === 'person' ? this.personVisible = false : this.numVisible = false
    },
    onOk (type) {
      type === 'person' ? this.personVisible = false : this.numVisible = false
    },
    pickSeqNumber (seqNum, timePart) {
      this.number = seqNum + '号 ' + timePart
      this.numVisible = false
    },
    pickPerson (item) {
      this.person = item.userName
      this.personCard = '(' + item.cardType + item.cardNum + ')'
      this.setPatientInfo(item)
      this.personVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
.doctor-tag {
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid $color-font3;
  color: $color-font3;
  margin-left: 2px;
  font-size: 0.5rem;
  padding: 0.05rem .1rem;
  margin-left: 0.25rem;
  line-height: 0.6rem;
}
</style>

<style lang="scss">
.pick-number-modal{
  .modal-content{
    position: absolute!important;
    bottom: 0;
    width: 100%;
    border-radius: 0!important;
    max-height: 13rem;
    text-align: center
  }
  .modal-body{
    padding: 0!important;
    max-height: 10.6rem;
    overflow: auto;
    .number-cell{
      border-bottom: 1px solid $color-border;
      padding: 0.8rem 0.8rem;
      display: block;
      font-size: .8rem;
      span{
        font-size: .7rem
      }
    }
  }
}
</style>
