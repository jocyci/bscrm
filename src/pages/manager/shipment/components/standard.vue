<template>
  <div>
    <div class="manage-box">
      <div class="cm-form">
        <div class="">
          <Button type="primary" class="new-opa" @click.native="openModel">新增</Button>
        </div>
      </div>
      <div class="cm-table">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
    </div>
    <Modal
      v-model="showModal"
      title="新增亚马逊货件"
      :loading="modalLoading"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="shipment-modal">
        <div class="modal-item">
          <span class="vm">街道：</span>
          <Input class="vm" v-model="AddressLine1" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">发货人：</span>
          <Input class="vm" v-model="Name" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">城市：</span>
          <Input class="vm" v-model="City" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">省：</span>
          <Input class="vm" v-model="StateOrProvinceCode" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">国家：</span>
          <Input class="vm" v-model="CountryCode" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">邮编：</span>
          <Input class="vm" v-model="PostalCode" placeholder="只能添字母或数字" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'standard',
  data () {
    return {
      showModal: false,
      modalLoading: true,
      AddressLine1: '',
      Name: '',
      City: '',
      StateOrProvinceCode: '',
      CountryCode: '',
      PostalCode: '',
      storeId: '',
      columns: [
        {
          title: '发货人',
          key: 'Name',
          width: 130
        },
        {
          title: '街道',
          key: 'AddressLine1',
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteAddress(params.row.id)
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
    async deleteAddress (id) {
      let response = await Apis.deleteAddress(id, this.storeId, true)
      this.$responseMessage(response.data, 204, '删除成功')
      this.getAddressList()
    },
    async getAddressList () {
      let response = await Apis.searchAddressList({store_id: this.storeId}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
      }
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
        const REG = /^[A-Za-z0-9]+$/
        const STR = '字段不合法（只能添字母或数字）'
        if (this.$requiredInVerify(this.AddressLine1, `街道${STR}`, REG) || this.$requiredInVerify(this.Name, `发货人${STR}`, REG) || this.$requiredInVerify(this.City, `城市${STR}`, REG) || this.$requiredInVerify(this.StateOrProvinceCode, `省${STR}`, REG) || this.$requiredInVerify(this.CountryCode, `国家${STR}`, REG) || this.$requiredInVerify(this.PostalCode, `邮编${STR}`, REG)) {
          this.modalLoadingAtion()
          return false
        }
        let response = await Apis.createNewAddress({
          AddressLine1: this.AddressLine1,
          Name: this.Name,
          City: this.City,
          StateOrProvinceCode: this.StateOrProvinceCode,
          CountryCode: this.CountryCode,
          PostalCode: this.PostalCode
        }, this.storeId, true)
        if (!this.$responseMessage(response.data, 201, '新增成功')) {
          this.showModal = false
          this.reset()
          this.getAddressList()
        }
      })
    },
    cancel () {
    },
    reset () {
      this.AddressLine1 = ''
      this.Name = ''
      this.City = ''
      this.StateOrProvinceCode = ''
      this.CountryCode = ''
      this.PostalCode = ''
    },
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (this.storeId) {
        this.getAddressList()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            this.getAddressList()
          } else {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    }
  },
  created () {
    this._getStoreId()
  }
}
</script>

<style>
.shipment-modal .modal-item {
  margin-bottom: 7px;
}
.shipment-modal .modal-item>span {
  width: 56px;
}
</style>
