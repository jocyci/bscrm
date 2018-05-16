<template>
  <div>
    <div class="manage-box">
      <!-- <div class="as-btn">
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
      </div> -->
    </div>
    <div>
    <div class="ivu-table-wrapper" style="width: 700px;">
    <div class="ivu-table ivu-table-border">
        <div class="ivu-table-header">
            <table cellspacing="0" cellpadding="0" border="0" style="width: 700px;">
                <colgroup>
                    <col width="200">
                    <col width="500">
                </colgroup>
                <thead>
                    <tr>
                        <th class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <span class="">项目</span>
                            </div>
                        </th>
                        <th class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <span class="">操作</span>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="ivu-table-body">
            <table cellspacing="0" cellpadding="0" border="0" style="width:700px;">
                <colgroup>
                    <col width="200">
                    <col width="500">
                </colgroup>
                <tbody class="ivu-table-tbody">
                    <tr class="ivu-table-row">
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <span>本地仓库商品信息维护</span>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                              <div class="">
                                  <div class="as-btn">
                                    <Button type="primary" size="small" @click.native="download('/api/warehouse-sku-file/', `本地仓库商品信息维护.xls`)">
                                      下载模板
                                    </Button>
                                  </div>
                                  <div class="as-btn">
                                    <Upload :action="`/api/warehouse-sku-file/`" @on-success="sucessLoad">
                                      <Button type="warning" size="small">上传</Button>
                                    </Upload>
                                  </div>
                              </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="ivu-table-row">
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <span>FBA/海外仓商品信息维护</span>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                              <div class="">
                                  <div class="as-btn">
                                    <Button type="primary" size="small" @click.native="download(`/api/3rd-barcode-mapping-file/?store_id=${storeId}`, `海外仓.xls`)">
                                      下载模板（海外仓）
                                    </Button>
                                  </div>
                                  <div class="as-btn">
                                    <Upload :action="`/api/3rd-barcode-mapping-file/?store_id=${storeId}`" :on-success="sucessLoadLa">
                                      <Button type="warning" size="small">上传（海外仓）</Button>
                                    </Upload>
                                  </div>
                                  <div class="as-btn">
                                    <Upload :action="`/api/myi-file/?store_id=${storeId}`" :on-success="sucessLoadLa">
                                      <Button type="warning" size="small">上传“管理亚马逊库存”报告文件</Button>
                                    </Upload>
                                  </div>
                              </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="ivu-table-row">
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                                <span>映射信息维护</span>
                            </div>
                        </td>
                        <td class="ivu-table-column-center">
                            <div class="ivu-table-cell">
                              <div class="">
                                  <div class="as-btn">
                                    <Button type="primary"  size="small" @click.native="download(`/api/amz-sku-mapping-file/?store_id=${storeId}`, `映射模板${storeName}.xls`)">
                                      下载模板
                                    </Button>
                                  </div>
                                  <div class="as-btn">
                                    <Upload :action="`/api/amz-sku-mapping-file/?store_id=${storeId}`">
                                      <Button type="warning" size="small" icon="ios-cloud-upload-outline">上传</Button>
                                    </Upload>
                                  </div>
                              </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
          <object tabindex="-1" type="text/html" data="about:blank" style="display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none;"></object>
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
    sucessLoadLa (response) {
      if (!/^2/.test(response.status)) {
        this.$Message.warning(response.msg)
      } else {
        this.$Message.success('上传成功')
      }
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
