<template>
  <div>
    <div class="manage-box entry-box">
      <div class="cm-form entry-form">
        <div class="">
          <div class="vm cmf-item">
            <span class="cmf-font">入库单号：</span>
            <Input disabled v-model="oddNumber" style="width: 150px"></Input>
          </div>
          <div class="vm cmf-item">
            <span class="cmf-font">物流编号：</span>
            <Input :disabled="tracknumberDisable" v-model="tracknumber" placeholder="请输入" clearable style="width: 150px"></Input>
          </div>
          <div class="vm cmf-item">
            <span class="cmf-font">箱/袋数：</span>
            <Input :disabled="containeCountDisable" v-model="containeCount" placeholder="请输入" clearable style="width: 80px"></Input>
          </div>
          <div class="vm cmf-item">
            <span class="cmf-font vm">供货商：</span>
            <Select :disabled="selecSupplierDisable" v-model="selecSupplier" filterable style="width:120px" placeholder="输入供货商代码">
                <Option v-for="item in supplierList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="vm cmf-item fr">
            <span class="cmf-font vm">未提交：</span>
            <span class="vm" :class="{'cmf-font-red': notPushNum > 0}">{{notPushNum}}</span>
          </div>
        </div>
        <div class="entry-action">
          <div class="vm">
            <Button type="primary" class="new-opa" @click.native="createNewInbound">新建</Button>
            <Button :disabled="!skulist.length" type="warning" class="new-opa" @click.native="confirm">提交</Button>
          </div>
          <div class="fr vm">
            <Input :disabled="searchDisable" v-model="sku" placeholder="请输入" clearable style="width: 120px"></Input>
            <Button :disabled="searchDisable" type="primary" class="new-opa" @click.native="searchWarehouseList">搜索</Button>
          </div>
        </div>
      </div>
      <div class="cm-table" style="width: 70%" ref="entryTable">
        <Table border :columns="columns" :data="lists"></Table>
      </div>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: '',
  data () {
    return {
      oddNumber: '',
      tracknumber: '',
      containeCount: '',
      selecSupplier: '',
      sku: '',
      tracknumberDisable: false,
      containeCountDisable: false,
      selecSupplierDisable: false,
      searchDisable: true,
      supplierList: [],
      skulist: [],
      notPushNum: 0,
      columns: [
        {
          title: '品名',
          key: 'name',
          width: 180
        },
        {
          title: 'SKU名',
          key: 'sku',
          width: 160
        },
        {
          title: '图片',
          key: 'img_url',
          render: (h, params) => {
            return h('img', {
              style: {
                width: '100%'
              },
              attrs: {
                src: params.row.img_url
              }
            })
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  placeholder: '请填写数量'
                },
                class: {
                  countClass: true
                },
                style: {
                  width: '80px',
                  marginRight: '10px'
                },
                on: {
                  input: (value) => {
                    params.row.count = value
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.inbound(params)
                  }
                }
              }, '入库')
            ])
          }
        }
      ],
      lists: []
    }
  },
  methods: {
    async saveInbounds () {
      let response = await Apis.saveInbounds(this.oddNumber, {skulist: this.skulist})
      if (!this.$responseMessage(response.data, 200, '已保存入库单')) {
        this.skulist = []
        this.notPushNum = 0
        this.oddNumber = ''
        this.tracknumber = ''
        this.containeCount = ''
        this.selecSupplier = ''
        this.sku = ''
        this.tracknumberDisable = false
        this.containeCountDisable = false
        this.selecSupplierDisable = false
        this.searchDisable = true
        this.skulist = []
        this.notPushNum = 0
        this.lists = []
      }
    },
    async getSuppliers () {
      let response = await Apis.searchSuppliers(null, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        let supplierList = []
        response.data.msg.forEach((item) => {
          supplierList.push({
            value: item.id,
            label: item.name
          })
        })
        this.supplierList = supplierList
      }
    },
    async createNewInbound () {
      if (this.$requiredInVerify(this.tracknumber, '物流编号') || this.$requiredInVerify(this.containeCount, '箱/袋数') || this.$requiredInVerify(this.selecSupplier, '供货商')) {
        return
      }
      let response = await Apis.createNewInbound({
        container_count: this.containeCount,
        tracknumber: this.tracknumber,
        supplier_id: this.selecSupplier
      }, true)
      if (!this.$responseMessage(response.data, 201, '新建成功')) {
        this.oddNumber = response.data.msg.id
        this.disabledAction()
      }
    },
    async searchWarehouseList () {
      let response = await Apis.searchWarehouseList({search: this.sku || null, supplier_id: 9}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        let data = response.data.msg
        data.forEach((item, index) => {
          item.classCount = index
        })
        this.lists = data
      }
    },
    confirm () {
      this.$Modal.confirm({
        title: '提交',
        content: '<p>提交后信息将无法更改，请确认</p>',
        onOk: () => {
          this.saveInbounds()
        },
        onCancel: () => {
          console.log('Clicked cancel')
        }
      })
    },
    inbound (params) {
      let countEles = this.$refs.entryTable.querySelectorAll('.countClass')
      let currentCountEle = countEles[params.row.classCount].querySelector('input')
      this.notPushNum = +this.notPushNum + +params.row.count
      this.skulist.push({
        id: params.row.id,
        quantity: params.row.count
      })
      currentCountEle.value = ''
    },
    disabledAction () {
      this.tracknumberDisable = true
      this.containeCountDisable = true
      this.selecSupplierDisable = true
      this.searchDisable = false
    }
  },
  created () {
    this.getSuppliers()
  }
}
</script>

<style>
.entry-form>div:first-child {
  margin-bottom: 20px;
}
.cmf-item {
  margin-right: 20px;
  font-size: 14px;
}
.cmf-font {
  font-size: 14px;
  margin-right: 2px;
}
.cmf-font-red {
  color: red;
  font-size: 14px;
}
.entry-action {
  font-size: 20px;
}
.entry-action>button {
  margin-right: 10px;
}
.entry-box {
  min-height: 350px!important;
}
</style>
