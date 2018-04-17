<template>
  <div class="manage-box">
    <div class="cm-form">
      <Button type="primary" size="small" class="new-opa" @click.native="openModel">新增</Button>
    </div>
    <div class="cm-table user-store-table">
      <Table border stripe :columns="columns" :data="lists"></Table>
    </div>
    <div class="">
      <Modal
        v-model="showModal"
        title="新建授权"
        okText="授权"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="modal-item user-mi">
          <span class="vm">用户列表：</span>
          <Select v-model="userId" style="width:130px">
              <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="modal-item user-mi">
          <span class="vm">店铺列表：</span>
          <Select v-model="storeId" style="width:130px">
              <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: 'authorize',
  data () {
    return {
      modalLoading: true,
      userId: '',
      storeId: '',
      showModal: false,
      columns: [
        {
          title: '店铺名',
          key: 'store__Name',
          width: 130
        },
        {
          title: '店铺地区',
          key: 'store__Market',
          width: 130
        },
        {
          title: '用户姓名',
          key: 'user__first_name',
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
                    this.deleteUserStore(params.row.user_id)
                  }
                }
              }, '删除授权')
            ])
          }
        }
      ],
      lists: [],
      userList: [],
      storeList: []
    }
  },
  methods: {
    async getUsers () {
      let response = await Apis.searchUser(null, true)
      let data = response.data
      if (!this.$responseMessage(data, 200, '', true)) {
        let userList = []
        data.msg.forEach((item) => {
          userList.push({
            value: item.id,
            label: item.first_name
          })
        })
        this.userList = userList
      }
    },
    async getStores () {
      let response = await Apis.searchStores(true)
      let data = response.data
      if (!this.$responseMessage(data, 200, '', true)) {
        let storeList = []
        data.msg.forEach((item) => {
          storeList.push({
            value: item.id,
            label: item.Name
          })
        })
        this.storeList = storeList
      }
    },
    async searchAction () {
      let response = await Apis.searchUserStores(true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        if (this.searchContent) {
          this.lists = [response.data.msg]
        } else {
          this.lists = response.data.msg
        }
      }
    },
    async deleteUserStore (id) {
      let response = await Apis.deleteUserStore(id, true)
      this.$responseMessage(response.data, 200)
      this.searchAction()
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
        if (this.$requiredInVerify(this.userId, '用户') || this.$requiredInVerify(this.storeId, '店铺')) {
          this.modalLoadingAtion()
          return
        }
        let response = await Apis.createNewUserStore({
          user_id: this.userId,
          store_id: this.storeId
        })
        if (!this.$responseMessage(response.data, 201, '新增授权成功')) {
          this.showModal = false
          this.resetData()
          this.searchAction()
        }
      })
    },
    resetData () {
      this.userId = ''
      this.storeId = ''
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
    this.getUsers()
    this.getStores()
  }
}
</script>

<style>
.user-store-table {
  width: 55%!important;
}
.modal-item {
  margin: 5px 0;
}
.modal-item>span {
  font-size: 14px;
  margin-right: 3px;
  width: 105px;
}
.user-mi>span {
  width: 70px!important;
}
</style>
