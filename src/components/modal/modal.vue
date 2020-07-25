<script src="../../config/httpApi.js"></script>
<template>

  <modal class="handle-popup handle-popup-warp"   v-model="showModal"
         :title="title"  :width="width"  @on-visible-change="change">

    <slot></slot>
    <Spin  fix v-if="shipModal"></Spin>

    <template #footer>
      <Button type="text" @click="showModal = false">取消</Button>
      <Button type="primary" :loading="shipModal" @click="saveConfig">保存</Button>
    </template>

  </modal>

</template>

<script>
  import { mapMutations } from 'vuex'
  import http from '@/libs/api.request'
  import { isPass } from '@/libs/util'

  export default {
    name: 'popmodal',
    data () {
      return {
        showModal: false,
        shipModal: false
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 60
      },
      urlApi: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      stateShowModal () {
        return this.$store.getters.showModal
      }
    },
    watch: {
      ship (val) {
        this.ship = val
      },
      value (val) {
        this.showModal = val
      }
    },
    mounted () {
      this.$nextTick(function () {
        setTimeout(() => {
          this.initUi()
        }, 300)
      })
    },
    methods: {
      ...mapMutations([
        'setShowModal'
      ]),
      change(val){
        if(!val) this.shipModal = false
      },
      saveConfig () {
        if(!this.loading){
          this.showModal = false
        }
        this.$emit('on-save')
      },
      openModal () {
        this.showModal = true
      },
      closeModal () {
        this.showModal = false
      },
      openShip (){
        this.shipModal = true
      },
      closeShip (){
        this.shipModal = false
      },
      initUi () {
        let modalContent = document.querySelectorAll('.handle-popup .ivu-modal-wrap .ivu-modal .ivu-modal-content'),
          modalBody = document.querySelectorAll('.handle-popup .ivu-modal-wrap .ivu-modal .ivu-modal-body')
        for (let val of modalContent) {
          val.style.minHeight = window.innerHeight * 0.7 + 'px'
        }
        for (let val of modalBody) {
          val.style.minHeight = (window.innerHeight * 0.7 - 110) + 'px'
        }
      },
      async getData (id) {
        console.log(id)
        let res = await http.get(this.urlApi.GET_DETAIL, { id })
        return res
      },
      async get (url, params) {
        let res = await http.get(url, params)
        return res
      },
      async post (url, data) {
        let res = await http.post(url, data)
        return res
      },
    }
  }
</script>

<style lang="less" scoped>
  .handle-popup {

  }
</style>

<style>
  .handle-popup-warp .ivu-modal-body{
    position: relative;
  }

</style>
