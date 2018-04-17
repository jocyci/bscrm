<template>
  <div>
    <div class="manage-box">
      <div class="as-btn">
        <Upload :action="`/api/myi-file/?store_id=${storeId}`" @on-success="sucessLoad">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传“管理亚马逊库存”报告文件</Button>
        </Upload>
      </div>
      <div class="as-btn">
        <Upload action="/api/warehouse-sku-file/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传"本地库存商品信息"文件</Button>
        </Upload>
      </div>
      <div class="as-btn">
        <Upload :action="`/api/amz-sku-mapping-file/?store_id=${storeId}`">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传"店铺-本地商品映射"文件</Button>
        </Upload>
      </div>
      <div class="as-btn">
        <Button type="primary" @click.native="download('/api/warehouse-sku-file/', '本地库存商品信息文件模板.txt')">
          下载"本地库存商品信息文件"模板
        </Button>
      </div>
      <div class="as-btn">
        <Button type="primary" @click.native="download(`/api/amz-sku-mapping-file/?store_id=${storeId}`, `映射模板${storeName}.xls`)">
          下载"店铺-本地商品映射"模板
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import multiDownload from '@/common/js/download'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: '',
  data () {
    this.storeList = []
    return {
      storeId: '',
      host: window.location.host,
      storeName: ''
    }
  },
  computed: {
    ...mapGetters(['globalStoreIdGr'])
  },
  watch: {
    globalStoreIdGr () {
      this._getStoreId()
    },
    storeId (val) {
      if (val) {
        let currentStore = this.storeList.filter((item) => {
          return +val === +item.id
        })
        if (currentStore.length) {
          this.storeName = currentStore[0].Name
        }
      }
    }
  },
  methods: {
    ...mapActions(['getStoreId', 'fetchAfterLoginData']),
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (!this.storeId) {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (!this.storeId) {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    },
    sucessLoad () {
      this.$Message.success('上传成功')
    },
    download (url, name) {
      multiDownload([url], name)
    },
    async getStoreList () {
      let afterLoginData = await this.fetchAfterLoginData()
      if (afterLoginData && afterLoginData.data) {
        this.storeList = afterLoginData.data.msg.store_list
      }
      this._getStoreId()
    }
  },
  created () {
    this.getStoreList()
  }
}
</script>

<style>
.as-btn {
  margin-top: 15px;
  display: inline-block;
  margin-right: 5px;
}
.dl-font {
  color: #fff;
}
.dl-font:hover {
  color: #fff;
}
</style>
