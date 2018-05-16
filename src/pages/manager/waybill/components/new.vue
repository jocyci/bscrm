<template>
  <div>
    <div class="manage-box">
      <div class="wn-add">
        <Button :disabled="!box_id_list.length" type="primary" class="new-opa" @click.native="openModel">新增</Button>
        <Button type="primary" class="new-opa refresh" @click.native="refresh">刷新箱子</Button>
      </div>
      <div class="cm-table" style="width: 25%">
        <Table @on-selection-change="selectItem" border stripe :columns="columns" :data="lists"></Table>
      </div>
      <Modal
        v-model="showModal"
        title="新增运单"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="modal-item supplier-mi">
          <span class="vm">运单号：</span>
          <Input class="vm" v-model="track" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item supplier-mi">
          <span class="vm">承运人：</span>
          <Input class="vm" v-model="carrier" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item supplier-mi">
          <span class="vm">预计抵达时间：</span>
          <Input class="vm" v-model="eta" placeholder="请输入(格式为YYYY-MM-DD)" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'new',
  data () {
    return {
      modalLoading: true,
      showModal: false,
      storeId: '',
      track: '',
      carrier: '',
      eta: '',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '箱子ID',
          key: 'id'
        }
      ],
      lists: [],
      box_id_list: []
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
    refresh () {
      this.getOutboundId()
    },
    async getOutboundId () {
      let response = await Apis.searchOutboundList({
        waybill_is_null: 1,
        store_id: this.storeId
      })
      if (!this.$responseMessage(response.data, 200, '', true)) {
        let lists = []
        response.data.msg.forEach((item) => {
          lists.push({
            id: item
          })
        })
        this.lists = lists
      }
    },
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (this.storeId) {
        this.getOutboundId()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            this.getOutboundId()
          } else {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    },
    selectItem (selection) {
      let boxIdList = []
      selection.forEach((item) => {
        boxIdList.push(item.id)
      })
      this.box_id_list = boxIdList
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
        if (this.$requiredInVerify(this.track, '运单号') || this.$requiredInVerify(this.carrier, '承运人') || this.$requiredInVerify(this.eta, '预计抵达时间')) {
          this.modalLoadingAtion()
          return
        }

        if (!/^\d{4}-\d{2}-\d{2}/.test(this.eta)) {
          this.$Message.warning('预计抵达时间格式错误')
          this.modalLoadingAtion()
          return
        }

        let response = await Apis.createNewWaybill({
          track: this.track,
          carrier: this.carrier,
          eta: this.eta,
          box_id_list: JSON.stringify(this.box_id_list)
        })
        this.reset()
        if (!this.$responseMessage(response.data, 201, '新建成功')) {
          this.showModal = false
        }
      })
    },
    cancel () {
      this.reset()
    },
    reset () {
      this.track = ''
      this.carrier = ''
      this.eta = ''
    }
  },
  created () {
    this._getStoreId()
  }
}
</script>

<style>
.refresh {
  margin-left: 5px;
}
</style>
