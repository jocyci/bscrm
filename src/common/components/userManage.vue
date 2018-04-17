<template>
  <div>
    <div class="manage-box">
      <div class="cm-form">
        <Input v-model="searchContent" placeholder="请输入用户名" clearable style="width: 120px"></Input>
        <Button type="primary" size="small" class="search" @click.native="searchUser">搜索</Button>
        <Button type="primary" size="small" class="new-opa" @click.native="openModel" v-if="role === 'admin'">新增</Button>
      </div>
      <div class="cm-table users-table" :style="{width: role === 'root' ? '45%' : '35%'}">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
      <Modal
        v-model="showModal"
        title="新增用户"
        :loading="modalLoading"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="roll-select">
          <Select v-model="selectRoll" style="width:100px">
              <Option v-for="item in rollList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <Input v-model="count" placeholder="请输入新增用户数量" clearable style="width: 200px"></Input>
      </Modal>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import mapList from '@/common/config/mapList'

export default {
  name: '',
  data () {
    this.rootColumns = [
      {
        title: '用户名',
        key: 'username',
        width: 130
      },
      {
        title: '公司名',
        key: 'company__name',
        width: 130
      },
      {
        title: '姓名',
        key: 'first_name',
        width: 130
      }
    ]
    this.adminColumns = [
      {
        title: '用户名',
        key: 'username',
        width: 130
      },
      {
        title: '角色',
        key: 'roll',
        width: 130
      }
    ]
    return {
      modalLoading: true,
      showModal: false,
      searchContent: '',
      count: '',
      columns: [
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
                    this.deleteUser(params.row.reg_token)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      lists: [],
      selectRoll: '',
      rollList: mapList.rollList
    }
  },
  props: ['role'],
  methods: {
    async searchUser () {
      // if (this.$requiredInVerify(this.searchContent, '用户名')) {
      //   return
      // }
      let response = await Apis.searchUser({username: this.searchContent})
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
      }
    },
    async deleteUser (registerToken) {
      let response = await Apis.deleteUser(registerToken, true)
      this.$responseMessage(response.data, 201, '删除成功')
      this.searchUser()
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
        if (this.$requiredInVerify(this.selectRoll, '角色')) {
          this.modalLoadingAtion()
          return
        }
        if (!/^\d+$/.test(this.count)) {
          this.$Message.warning('请输入正确格式的数字')
          this.modalLoadingAtion()
          return false
        }

        let response = await Apis.createNewManager({roll: this.selectRoll, count: this.count})
        this.selectRoll = ''
        this.count = ''
        if (!this.$responseMessage(response.data, 201, '', true)) {
          this.showModal = false
          this.successTip(response.data.msg)
        }
      })
    },
    cancel () {
      this.selectRoll = ''
      this.count = ''
    },
    successTip (lists) {
      let html = ''
      lists.forEach((value) => {
        html += `<p class="link"><a target="_blank"   href="${window.location.origin}/#${value}">${window.location.origin}/#${value}</a></p>`
      })
      this.$Modal.success({
        title: '创建成功',
        content: `<p>已生成注册链接，链接为：</p>${html}<p>请将注册链接发送给需要的人</p>`
      })
    },
    tableInit () {
      if (this.role === 'root') {
        this.columns = this.rootColumns.concat(this.columns)
      } else if (this.role === 'admin') {
        this.columns = this.adminColumns.concat(this.columns)
      }
    }
  },
  created () {
    this.tableInit()
    this.searchUser()
  }
}
</script>

<style>
.roll-select {
  margin-bottom: 15px;
}
.link {
  margin: 2px 0;
}
</style>
