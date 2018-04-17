<template>
  <div>
    <div class="manage-box">
      <div class="wn-search">
        <Input class="vm" v-model="searchContent" placeholder="输入运单号或承运人(至少四个字符)" clearable style="width: 210px"></Input>
        <Button :disabled="searchContent.length < 4"  type="primary"  class="new-opa" @click.native="searchWaybills">搜索</Button>
      </div>
      <div class="cm-table" style="width: 60%">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
      <Modal
        v-model="showModal"
        title="编辑运单"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
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
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: 'manage',
  data () {
    return {
      searchContent: '',
      modalLoading: true,
      showModal: false,
      rowModule: {
        track: '',
        carrier: '',
        eta: '',
        arrive_date: '',
        id: ''
      },
      columns: [
        {
          title: '运单号',
          key: 'track',
          width: 120
        },
        {
          title: '承运人',
          key: 'carrier',
          width: 120
        },
        {
          title: '预计抵达时间',
          key: 'eta',
          width: 130
        },
        {
          title: '实际抵达时间',
          key: 'arrive_date',
          width: 130
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
        }
      ],
      lists: []
    }
  },
  methods: {
    async searchWaybills () {
      let response = await Apis.searchWaybills({search: this.searchContent}, true)
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
    edit (row) {
      this.rowModule.track = row.track
      this.rowModule.carrier = row.carrier
      this.rowModule.eta = row.eta
      this.rowModule.arrive_date = row.arrive_date
      this.rowModule.id = row.id
      this.openModel()
    },
    openModel () {
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
      })
    },
    cancel () {
    }
  },
  created () {
    this.searchWaybills()
  }
}
</script>

<style>
</style>
