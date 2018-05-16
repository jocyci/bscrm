<template>
  <div>
    <div class="manage-box">
      <div class="cm-form">
        <Button type="primary" size="small" class="new-opa" @click.native="openModel">新增</Button>
      </div>
      <div class="cm-table" style="width: 42%">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
    </div>
    <Modal
      v-model="showModal"
      title="新增供货商"
      :loading="modalLoading"
      @on-ok="ok"
      @on-cancel="cancel">
      <div class="modal-item supplier-mi">
        <span class="vm">供货商全称：</span>
        <Input class="vm" v-model="name" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
      </div>
      <div class="modal-item supplier-mi">
        <span class="vm">供货商缩写代号：</span>
        <Input class="vm" v-model="code" placeholder="请输入" :maxlength="60" clearable style="width: 200px"></Input>
      </div>
    </Modal>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: 'supplier',
  data () {
    this.isUpdate = false
    this.updateId = ''
    return {
      showModal: false,
      modalLoading: true,
      name: '',
      code: '',
      columns: [
        {
          title: '供货商全称',
          key: 'name',
          width: 130
        },
        {
          title: '供货商缩写代号',
          key: 'code',
          width: 150
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
                  'margin-right': '9px'
                },
                on: {
                  click: () => {
                    this.updateSupplieAction(params.row)
                  }
                }
              }, '更新'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteSupplie(params.row.id)
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
    async getSupplierList () {
      let response = await Apis.searchSuppliers(null, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
      }
    },
    async deleteSupplie (id) {
      let response = await Apis.deleteSupplie(id, true)
      if (!this.$responseMessage(response.data, 204)) {
        this.getSupplierList()
      }
    },
    updateSupplieAction (params) {
      this.isUpdate = true
      this.updateId = params.id
      this.openModel()
      this.name = params.name
      this.code = params.code
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
        if (this.$requiredInVerify(this.name, '供货商全称') || this.$requiredInVerify(this.code, '供货商缩写代号')) {
          this.modalLoadingAtion()
          return
        }
        let response = null
        let status = ''
        if (this.isUpdate) {
          response = await Apis.updateSupplie(this.updateId, {name: this.name, code: this.code}, true)
          this.isUpdate = false
          status = 202
        } else {
          response = await Apis.createNewSupplie({name: this.name, code: this.code}, true)
          status = 201
        }
        if (!this.$responseMessage(response.data, status, '', true)) {
          this.showModal = false
          this.reset()
          this.getSupplierList()
        }
      })
    },
    cancel () {
      this.reset()
    },
    reset () {
      this.isUpdate = false
      this.name = ''
      this.code = ''
    }
  },
  created () {
    this.getSupplierList()
  }
}
</script>

<style>
.supplier-mi>span {
  width: 115px;
}
</style>
