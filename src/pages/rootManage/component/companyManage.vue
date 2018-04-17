<template>
  <div class="manage-box">
    <div class="cm-form">
      <Input v-model="searchContent" placeholder="请输入公司名" clearable style="width: 120px"></Input>
      <Button type="primary" size="small" class="search" @click.native="searchCompany">搜索</Button>
      <Button type="primary" size="small" class="new-opa" @click.native="openModel">新建公司</Button>
    </div>
    <div class="cm-table">
      <Table border stripe :columns="columns" :data="lists"></Table>
    </div>
    <div class="">
      <Modal
        v-model="showModal"
        title="新建公司"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="companyName" placeholder="请输入公司名，不超过60个字符" :maxlength="60" clearable style="width: 200px"></Input>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: '',
  data () {
    return {
      modalLoading: true,
      searchContent: '',
      showModal: false,
      companyName: '',
      columns: [
        {
          title: '公司名',
          key: 'name',
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
                  marginRight: '15px'
                },
                on: {
                  click: () => {
                    this.createNewManager(params.row.id)
                  }
                }
              }, '新建管理员'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteCompany(params.row.id)
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
    async createNewManager (id) {
      let response = await Apis.createNewManager({company_id: id}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.successTip(response.data.msg)
      }
    },
    async searchCompany () {
      let response = await Apis.searchCompany({search: this.companyName}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
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
        if (this.$requiredInVerify(this.companyName, '公司名')) {
          this.modalLoadingAtion()
          return
        }
        let response = await Apis.createNewCompany({company_name: this.companyName})
        this.companyName = ''
        if (!this.$responseMessage(response.data, 201, '', true)) {
          this.showModal = false
          this.successTip(response.data.msg)
        } else {
          this.modalLoadingAtion()
        }
      })
    },
    cancel () {
      this.companyName = ''
    },
    successTip (value) {
      this.$Modal.success({
        title: '创建成功',
        content: `<p>已生成注册链接，链接为：<a target="_blank"   href="${window.location.origin}/#${value}">${window.location.origin}/#${value}</a></p><p>请将注册链接发送给需要的人</p>`
      })
    }
  },
  created () {
    this.searchCompany()
  }
}
</script>

<style>
</style>
