<template>
  <div>
    <div class="manage-box">
      <div class="wn-search">
        <Input class="vm" v-model="searchContent" placeholder="输入运单号或承运人(至少三个字符)" clearable style="width: 210px"></Input>
        <Button :disabled="searchContent.length < 3"  type="primary"  class="new-opa" @click.native="searchWaybills">搜索</Button>
      </div>
      <div class="cm-table vm" style="width: 65%">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
      <div class="cm-table vm" style="width: 33%">
        <Table border stripe :columns="infoColumns" :data="InfoLists"></Table>
        <Table class="detail-table" border stripe :columns="detailColumns" :data="detailLists"></Table>
      </div>
      <Modal
        v-model="showModal"
        title="编辑运单"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div v-if="modalType === 'edit'">
           <div class="modal-item supplier-mi">
            <span class="vm">运单号：</span>
            <Input class="vm" v-model="rowModule.track" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
          </div>
          <div class="modal-item supplier-mi">
            <span class="vm">承运人：</span>
            <Input class="vm" v-model="rowModule.carrier" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
          </div>
          <div class="modal-item supplier-mi">
            <span class="vm">预计抵达时间：</span>
            <Input class="vm" v-model="rowModule.eta" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
          </div>
          <div class="modal-item supplier-mi">
            <span class="vm">实际抵达时间：</span>
            <Input class="vm" v-model="rowModule.arrive_date" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
          </div>
        </div>
        <div v-if="modalType === 'add'">
          <div class="modal-item supplier-mi">
            <span class="vm">转运信息：</span>
            <Input class="vm" v-model="transportInfo" placeholder="请输入" :maxlength="50" clearable style="width: 200px"></Input>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'manage',
  data () {
    return {
      searchContent: '',
      modalType: 'edit',
      modalLoading: true,
      showModal: false,
      transportInfo: '',
      transportId: '',
      rowModule: {
        track: '',
        carrier: '',
        eta: '',
        arrive_date: '',
        id: ''
      },
      infoColumns: [
        {
          title: '添加时间',
          key: 'time',
          width: 120
        },
        {
          title: '详情',
          key: 'info'
        }
      ],
      InfoLists: [],
      detailColumns: [
        {
          title: '箱子编号',
          key: 'id',
          width: 110
        },
        {
          title: '货件编号',
          key: 'shipment__name',
          width: 110
        },
        {
          title: '承运人',
          key: 'waybill__carrier',
          width: 110
        },
        {
          title: '运单号',
          key: 'waybill__track',
          width: 110
        }
      ],
      detailLists: [],
      columns: [
        {
          title: '运单号',
          key: 'track',
          width: 110
        },
        {
          title: '承运人',
          key: 'carrier',
          width: 100
        },
        {
          title: '预计抵达时间',
          key: 'eta',
          width: 105
        },
        {
          title: '实际抵达时间',
          key: 'arrive_date',
          width: 105
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.getWaybillById(params.row)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delWaybill(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        },
        {
          title: '转运信息',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.add(params.row)
                  }
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.getTransportInfo(params.row.id)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      lists: []
    }
  },
  computed: {
    ...mapGetters(['globalStoreIdGr'])
  },
  watch: {
    globalStoreIdGr () {
      this._getStoreId()
    }
  },
  methods: {
    ...mapActions(['getStoreId', 'fetchAfterLoginData']),
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (!this.storeId) {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (!this.storeId) {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    },
    async getWaybillById (row) {
      let response = await Apis.getWaybillById(row.id, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.detailLists = response.data.msg
      }
    },
    async searchWaybills () {
      let response = await Apis.searchWaybills({search: this.searchContent, store_id: this.storeId}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
      }
    },
    async delWaybill (id) {
      let response = await Apis.delWaybill(id, true)
      if (!this.$responseMessage(response.data, 204, '删除成功')) {
        this.searchWaybills()
      }
    },
    async getTransportInfo (id) {
      let response = await Apis.getTransportInfo(id, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.InfoLists = response.data.msg
      }
    },
    edit (row) {
      this.rowModule.track = row.track
      this.rowModule.carrier = row.carrier
      this.rowModule.eta = row.eta
      this.rowModule.arrive_date = row.arrive_date
      this.rowModule.id = row.id
      this.openModel('edit')
    },
    add (row) {
      this.transportId = row.id
      this.openModel('add')
    },
    openModel (type) {
      this.modalType = type
      this.showModal = true
    },
    modalLoadingAtion () {
      this.showModal = true
      this.modalLoading = false
      window.setTimeout(() => {
        this.modalLoading = true
      }, 100)
    },
    ok () {
      window.setTimeout(async () => {
        if (this.modalType === 'edit') {
          if (this.$requiredInVerify(this.rowModule.track, '运单号') || this.$requiredInVerify(this.rowModule.carrier, '承运人') || this.$requiredInVerify(this.rowModule.eta, '预计抵达时间') || this.$requiredInVerify(this.rowModule.arrive_date, '实际抵达时间')) {
            this.modalLoadingAtion()
            return
          }
          let reg = /^\d{4}-\d{2}-\d{2}/
          if (!reg.test(this.rowModule.eta) || !reg.test(this.rowModule.arrive_date)) {
            this.$Message.warning('预计抵达时间格式错误')
            this.modalLoadingAtion()
            return
          }

          let response = await Apis.editWaybill(this.rowModule.id, {
            track: this.rowModule.track,
            carrier: this.rowModule.carrier,
            eta: this.rowModule.eta,
            arrive_date: this.rowModule.arrive_date
          })
          if (!this.$responseMessage(response.data, 202, '编辑成功')) {
            this.showModal = false
            this.searchWaybills()
          }
        } else if (this.modalType === 'add') {
          if (this.$requiredInVerify(this.transportInfo, '转运信息')) {
            this.modalLoadingAtion()
            return
          }
          let response = await Apis.addTransportInfo(this.transportId, {info: this.transportInfo}, true)
          if (!this.$responseMessage(response.data, 200, '添加成功')) {
            this.showModal = false
          }
        }
      })
    },
    cancel () {
    }
  },
  created () {
    // this.searchWaybills()
    this._getStoreId()
  }
}
</script>

<style>
.detail-table {
  margin-top: 20px;
}
.manage-box .cm-table {
  vertical-align: top!important;
}
.manage-box .cm-table:last-child {
  margin-left: 1%;
}
</style>
