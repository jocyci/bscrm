<template>
  <div class="manage-box">
    <div class="cm-form">
      <Input v-model="searchContent" placeholder="请输入SKU" clearable style="width: 120px"></Input>
      <Button type="primary" size="small" class="search" @click.native="searchAcion">搜索</Button>
    </div>
    <div class="cm-table tag-table">
      <Table border stripe :columns="columns" :data="lists"></Table>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: '',
  data () {
    return {
      storeId: '',
      searchContent: '',
      companyName: '',
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
          title: '店铺sku',
          key: 'skuname',
          width: 160
        },
        {
          title: '图片',
          key: 'img_url',
          render: (h, params) => {
            return h('img', {
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
              h('a', {
                class: {
                  'num-tag': true
                },
                attrs: {
                  href: `printtag:fnsku/${params.row.barcode}/${params.row.product_name}/2`
                }
              }, '2'),
              h('a', {
                class: {
                  'num-tag': true
                },
                attrs: {
                  href: `printtag:fnsku/${params.row.barcode}/${params.row.product_name}/10`
                }
              }, '10'),
              h('a', {
                class: {
                  'num-tag': true
                },
                attrs: {
                  href: `printtag:fnsku/${params.row.barcode}/${params.row.product_name}/20`
                }
              }, '20'),
              h('a', {
                class: {
                  'num-tag': true
                },
                attrs: {
                  href: `printtag:fnsku/${params.row.barcode}/${params.row.product_name}/50`
                }
              }, '50'),
              h('a', {
                class: {
                  'num-tag': true
                },
                attrs: {
                  href: `printtag:fnsku/${params.row.barcode}/${params.row.product_name}/100`
                }
              }, '100')
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
    async searchAcion () {
      let response = await Apis.searchSKU({search: this.searchContent, store_id: this.storeId}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        let lists = []
        response.data.msg.forEach((item) => {
          item.warehouse_sku.barcode = item.barcode
          item.warehouse_sku.product_name = item.product_name.split(' ').join('_')
          item.warehouse_sku.skuname = item.skuname
          lists.push(item.warehouse_sku)
        })
        this.lists = lists
      }
    },
    async deleteCompany (id) {
      let response = await Apis.deleteCompany(id, true)
      this.$responseMessage(response.data, 200)
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
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (this.storeId) {
        // this.searchAcion()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            // this.searchAcion()
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
.tag-table {
  width: 80%!important;
}
.num-tag {
  display: inline-block;
  width: 35px;
  height: 24px;
  line-height: 24px;
  background: #407ce2;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  margin-right: 5px;
}
.num-tag:hover {
  background: #6093ea;
  color: #fff;
}
</style>
