<template>
  <div class="manage-box">
    <div class="cm-form">
      <Input v-model="searchContent" placeholder="请输入店铺名" clearable style="width: 120px"></Input>
      <Button type="primary" size="small" class="search" @click.native="searchAction">搜索</Button>
      <Button type="primary" size="small" class="new-opa" @click.native="openModel">新增</Button>
    </div>
    <div class="cm-table store-table">
      <Table border stripe :columns="columns" :data="lists"></Table>
    </div>
    <div class="tip-text">
      <h3>如何授权我们？</h3>
      <p>北美地区 Developer ID: 3534-9879-1213</p>
      <p>欧洲五国 Developer ID: 3837-6991-1830</p>
      <p>澳大利亚 Developer ID: 5137-1071-3427</p>
    </div>
    <div class="">
      <Modal
        v-model="showModal"
        title="新建店铺"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="modal-item roll-select">
          <span class="vm">地区：</span>
          <Select v-model="Market" style="width:100px">
              <Option v-for="item in marketList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Checkbox class="no-amz" v-model="noAmz">非亚马逊</Checkbox>
        </div>
        <div class="modal-item">
          <span class="vm">店铺名：</span>
          <Input class="vm" v-model="Name" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">卖家ID：</span>
          <Input class="vm" v-model="MERCHANT_ID" placeholder="请输入" :disabled="noAmz" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
        <div class="modal-item">
          <span class="vm">MWS授权令牌：</span>
          <Input class="vm" v-model="MWSAuthToken" placeholder="请输入" :disabled="noAmz" :maxlength="60" clearable style="width: 200px"></Input>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import mapList from '@/common/config/mapList'

export default {
  name: 'store',
  data () {
    return {
      noAmz: false,
      Name: '',
      Market: '',
      MERCHANT_ID: '',
      MWSAuthToken: '',
      modalLoading: true,
      searchContent: '',
      showModal: false,
      companyName: '',
      columns: [
        {
          title: '店铺名',
          key: 'Name',
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
                    this.deleteStore(params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      lists: [],
      marketList: mapList.marketList
    }
  },
  watch: {
    noAmz (val) {
      if (val) {
        this.MERCHANT_ID = ''
        this.MWSAuthToken = ''
      }
    }
  },
  methods: {
    async createNewManager (id) {
      let response = await Apis.createNewManager({company_id: id}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.successTip(response.data.msg)
      }
    },
    async searchAction () {
      if (this.searchContent && !/^\d+$/.test(this.searchContent)) {
        this.$Message.warning('请输入数字格式的ID')
        return
      }
      let response = null
      if (this.searchContent) {
        response = await Apis.searchStoresById(this.searchContent, true)
      } else {
        response = await Apis.searchStores(true)
      }
      if (!this.$responseMessage(response.data, 200, '', true)) {
        if (this.searchContent) {
          this.lists = [response.data.msg]
        } else {
          this.lists = response.data.msg
        }
      }
    },
    async deleteCompany (id) {
      let response = await Apis.deleteCompany(id, true)
      this.$responseMessage(response.data, 200)
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
        if (this.$requiredInVerify(this.Market, '地区') || this.$requiredInVerify(this.Name, '店铺名')) {
          this.modalLoadingAtion()
          return
        }
        if (!this.noAmz && (this.$requiredInVerify(this.MERCHANT_ID, '卖家ID') || this.$requiredInVerify(this.MWSAuthToken, 'MWS授权令牌'))) {
          this.modalLoadingAtion()
          return
        }
        let response = await Apis.createNewStore({
          Market: this.Market,
          Name: this.Name,
          MERCHANT_ID: this.noAmz ? 'undefined' : this.MERCHANT_ID,
          MWSAuthToken: this.noAmz ? 'undefined' : this.MWSAuthToken,
          is_amz: this.noAmz ? 0 : 1
        })
        if (!this.$responseMessage(response.data, 201, '新增店铺成功')) {
          this.showModal = false
          this.resetData()
        }
      })
    },
    resetData () {
      this.Market = ''
      this.Name = ''
      this.MERCHANT_ID = ''
      this.MWSAuthToken = ''
    },
    cancel () {
      this.resetData()
    },
    async deleteStore (id) {
      let response = await Apis.deleteStore(id)
      if (!this.$responseMessage(response.data, 202, '删除成功')) {
        this.searchAction()
      }
    }
  },
  created () {
    this.searchAction()
  }
}
</script>

<style>
.store-table {
  width: 25%!important;
  display: inline-block;
  vertical-align: top;
}
.tip-text {
  vertical-align: top;
  display: inline-block;
  padding-top: 50px;
  margin-left: 60px;
}
.tip-text p {
  margin-top: 5px;
}
.no-amz {
  margin-left: 30px;
}
</style>
