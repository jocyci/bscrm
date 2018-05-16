<template>
  <div class="cou-box">
    <div class="manage-box">
      <div class="cm-form">
        <Button type="primary" :disabled="box_id_list.length <= 0"  @click.native="openModel(true)">新增</Button>
        <Button type="warning" class="mid-m" @click.native="openModel(false)">更新</Button>
        <Button type="warning" :disabled="!ShipmentId" class="mid-m" @click.native="deleteShipment">取消</Button>
        <Input v-model="ShipmentId" placeholder="货件编号" clearable style="width: 500px"></Input>
      </div>
      <div class="cm-table vm" style="width: 25%">
        <Table @on-selection-change="selectItem" border stripe :columns="columns" :data="lists"></Table>
      </div>
      <div class="refresh vm"><Button type="primary" @click.native="refresh">刷新</Button></div>
      <div class="preview-btn vm"> <Button type="primary" :disabled="box_id_list.length <= 0" @click.native="getPackagePreview">预览</Button></div>
      <div class="pr-table vm" style="width: 35%">
        <div class="preview-table">
          <Table border stripe :columns="preViewColumns" :data="preViewLists"></Table>
        </div>
      </div>
      <Modal
        v-model="showModal"
        title="新增货件"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="modal-item">
          <span class="vm cou-item">发货地址：</span>
          <Select class="vm" v-model="address" style="width:200px">
            <Option v-for="item in addressList" :value="item.id" :key="item.id">{{ `${item.Name} | ${item.AddressLine1}` }}</Option>
          </Select>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: '',
  data () {
    this.isNew = true
    return {
      modalLoading: true,
      showModal: false,
      storeId: '',
      address: '',
      ShipmentId: '',
      box_id_list: [],
      addressList: [],
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
      preViewColumns: [
        {
          title: 'SKU名',
          key: 'sku'
        },
        {
          title: '箱子',
          key: '箱子'
        },
        {
          title: '数量',
          key: '数量'
        }
      ],
      preViewLists: []
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
    async getPackagePreview () {
      let response = await Apis.getPackagePreview(this.box_id_list.join('_'), true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.preViewLists = response.data.msg
      }
    },
    async getOutboundList () {
      let response = await Apis.searchOutboundList({shipment_is_null: 1, store_id: this.storeId})
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
        this.getOutboundList()
        this.getAddressList()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            this.getOutboundList()
            this.getAddressList()
          } else {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    },
    async getAddressList () {
      let response = await Apis.searchAddressList({store_id: this.storeId}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.addressList = response.data.msg
      }
    },
    async deleteShipment () {
      let response = await Apis.deleteShipment(this.ShipmentId, this.storeId, true)
      if (/^2/.test(response.data.status)) {
        this.$Message.success('取消成功')
      } else {
        this.$Message.error(response.data.msg)
      }
    },
    selectItem (selection) {
      let boxIdList = []
      selection.forEach((item) => {
        boxIdList.push(item.id)
      })
      this.box_id_list = boxIdList
    },
    openModel (isNew) {
      this.isNew = isNew
      if (!this.isNew && !this.ShipmentId) {
        this.$Message.warning('请输入货件编号')
        return false
      }
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
        if (this.$requiredInVerify(this.address, '发货地址')) {
          this.modalLoadingAtion()
          return
        }
        if (this.isNew) {
          let response = await Apis.createNewFbashipment(this.storeId, {address: this.address, box_id_list: JSON.stringify(this.box_id_list)})
          this.reset()
          if (!this.$responseMessage(response.data, 201, '创建成功')) {
            let shimIds = []
            response.data.msg.forEach((item) => {
              shimIds.push(item.ShipmentId)
            })
            this.ShipmentId = shimIds.join(' | ')
            this.showModal = false
          }
        } else {
          let response = await Apis.updateFbashipment(this.ShipmentId, this.storeId, {address: this.address, box_id_list: JSON.stringify(this.box_id_list)})
          this.reset()
          if (!this.$responseMessage(response.data, 200, '更新成功')) {
            this.showModal = false
          }
        }
        this.showModal = false
      })
    },
    cancel () {
      this.reset()
    },
    reset () {
      this.address = ''
    },
    refresh () {
      this.box_id_list = []
      this.getOutboundList()
    }
  },
  created () {
    this._getStoreId()
  }
}
</script>

<style>
.cou-box {
  position: relative;
}
.cou-box .cm-table {
  vertical-align: top!important;
}
.mid-m {
  margin: 0 10px;
}
.cou-item {
  width: 70px!important;
}
.refresh {
  vertical-align: top!important;
  padding-top: 50px;
  margin-left: 50px;
}
.preview-btn {
  vertical-align: top!important;
  padding-top: 50px;
  margin-left: 10px;
}
.pr-table {
  vertical-align: top!important;
  margin-left: 50px;
  padding-top: 30px;
}
.preview-table {
  border-style: dashed;
  border-width: 1px;
  border-color: #aaa;
  padding: 8px;
}
</style>
