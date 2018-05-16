<template>
  <div class="store-item-box">
    <div class="manage-box">
      <div class="cm-form">
        <Input v-model="searchContent" placeholder="店铺SKU/条码" clearable style="width: 120px"></Input>
        <Button type="primary" size="small" class="search" @click.native="search">搜索</Button>
      </div>
      <div class="cm-table users-table" :style="{width: '90%'}">
        <Table border stripe :columns="columns" :data="lists"></Table>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: '',
  data () {
    return {
      searchContent: '',
      columns: [
        {
            title: '图片',
            key: 'img_url',
            width: 150,
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
            renderHeader: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                    h('p', {style: {padding: '5px', borderBottom: '1px solid rgb(206, 199, 199)'}}, '库房SKU'),
                    h('p', {style: {padding: '5px', borderBottom: '1px solid rgb(206, 199, 199)'}}, '店铺SKU'),
                    h('p', {style: {padding: '5px'}}, '条码')
                ])
            },
            render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                    h('p', {style: {padding: '5px', borderBottom: '1px solid rgb(206, 199, 199)'}}, params.row.warehouse_sku),
                    h('p', {style: {padding: '5px', borderBottom: '1px solid rgb(206, 199, 199)'}}, params.row.store_sku),
                    h('p', {style: {padding: '5px'}}, params.row.barcode)
                ])
            }
        }, 
        {
            title: '品名',
            key: 'product_name',
            width: 220
        },
        {
            title: '类目',
            key: 'category',
            width: 120
        },
        {
            title: '父商品',
            key: 'parent_sku',
            width: 120
        },
        {
            title: '补货策略',
            key: 'strategy',
            width: 120
        },
        {
            title: '库房库存',
            key: 'quantity',
            width: 100
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
    async search () {
      let response = await Apis.getStoreInfo({store_id: this.storeId, search: this.searchContent}, true)
      console.log('responser', response)
      if (!this.$responseMessage(response.data, 200, '', true)) {
          this.lists = response.data.msg
      }
    },
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (this.storeId) {
        // this.search()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            // this.search()
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
.roll-select {
  margin-bottom: 15px;
}
.link {
  margin: 2px 0;
}
.store-item-box th, .store-item-box td {
    text-align: center!important;
}
</style>
