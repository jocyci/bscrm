<template>
  <div class="outbound-box">
    <audio ref="audio" :src="isScuess ? 'http://hehe-1252068473.costj.myqcloud.com/static/sheep.wav' : 'http://hehe-1252068473.costj.myqcloud.com/static/horse.wav'"></audio>
    <div class="ob-block">
      <div class="obb">
        <div class="smt-item vm">
          <!-- <span class="vm si-title">开始装箱 </span> -->
          <Button type="primary" @click.native="getOutboundId"  class="vm" v-if="btnStatus === 'start'">
            开始装箱
          </Button>
          <Button type="default"  class="vm" v-if="btnStatus === 'print'">
            <a :href="`printtag:fnsku/${boxId}/${boxId}/2`">
              打印箱子编码
            </a>
          </Button>
        </div>
        <div class="smt-item vm smt-input">
          <span class="vm si-title">装入扫描 </span>
          <Input  placeholder=""  style="width: 180px" v-model="load"></Input>
        </div>
        <div class="smt-item vm smt-input">
          <span class="vm si-title">取出扫描 </span>
          <Input  placeholder=""  style="width: 180px" v-model="extract"></Input>
        </div>
        <div class="smt-item vm fr">
          <Button type="primary"  class="vm" @click.native="saveOutbounds">提交</Button>
        </div>
      </div>
      <div class="obb">
        <div class="smt-item vm">
          <span class="vm si-title">已扫描数量：{{num}}</span>
        </div>
      </div>
      <div class="obb">
        <div class="smt-item vm smt-input" style="vertical-align: top">
          <span class="vm si-title">装箱查看 </span>
          <Input  placeholder=""  style="width: 180px" v-model="see"></Input>
        </div>
        <div class="smt-item vm" style="vertical-align: top">
          <div class="preview-table">
            <Table border stripe :columns="preViewColumns" :data="preViewLists"></Table>
          </div>
        </div>
      </div>
    </div>
    <div class="ob-block zs-box">
      <p class="zs-title">箱唛助手</p>
      <div class="smt-item zs-item">
        <Input  placeholder="输入货件编号"  style="width: 180px" v-model="searchBounds"></Input>
        <Button type="primary" @click.native="getShipments"  class="vm ml5">
            提交
        </Button>
        <Button type="primary" @click.native="downLoad"  class="vm ml5" :disabled="!zsSeFlag">
            下载箱唛
        </Button>
      </div>
      <div class="smt-item zs-item" style="width: 300px;">
         <Table border stripe :columns="zsColumns" :data="zsLists"></Table>
      </div>
    </div>
    <div class="ob-block zs-box">
      <p class="zs-title font-red">删除箱子</p>
      <div class="smt-item zs-item">
          <Input  placeholder="输入货件编号"  style="width: 180px" v-model="delete_Id"></Input>
          <Button type="primary"  class="vm ml5" @click.native="deleteOutbound">提交</Button>
        </div>
    </div>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'
import multiDownload from '@/common/js/download'

export default {
  name: '',
  data () {
    this.mapBarcode = {}
    this.barcodeArr = []
    return {
      searchBounds: '',
      btnStatus: 'start',
      boxId: '',
      storeId: '',
      isScuess: true,
      load: '',
      extract: '',
      see: '',
      skulist: {},
      delete_Id: '',
      num: 0,
      preViewColumns: [
        {
          title: 'SKU名',
          key: 'sku'
        },
        {
          title: '箱子',
          key: '箱子'
        },
        {
          title: '数量',
          key: '数量'
        }
      ],
      preViewLists: [],
      zsColumns: [
        {
          type: 'index',
          width: 100
        },
        {
          title: '箱子ID',
          key: 'id'
        }
      ],
      zsLists: [],
      zsSeFlag: false
    }
  },
  computed: {
    ...mapGetters(['globalStoreIdGr'])
  },
  watch: {
    globalStoreIdGr () {
      this._getStoreId()
    },
    load (val) {
      this.judgeValue(val, true, 'load')
    },
    extract (val) {
      this.judgeValue(val, false, 'extract')
    },
    see (val) {
      setTimeout(() => {
        if (val) {
          this.getPackagePreview(val)
          this.see = ''
        }
      }, 200)
    }
  },
  methods: {
    ...mapActions(['getStoreId', 'fetchAfterLoginData']),
    async getShipments () {
      let response = await Apis.getShipments(this.searchBounds, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.zsLists = response.data.msg.data
        this.zsSeFlag = true
      }
    },
    async getPackagePreview (id) {
      let response = await Apis.getPackagePreview(id, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.preViewLists = response.data.msg
      }
    },
    async saveOutbounds () {
      let skulist = {}
      Object.keys(this.skulist).forEach(key => {
        skulist[this.mapBarcode[key]] = this.skulist[key]
      })
      let response = await Apis.saveOutbounds(this.boxId, {store_id: this.storeId, skulist: JSON.stringify(skulist)}, true)
      if (!this.$responseMessage(response.data, 202, '提交成功')) {
        this.reset()
        this.btnStatus = 'start'
      }
    },
    async deleteOutbound () {
      let response = await Apis.deleteOutbound(this.delete_Id)
      this.$responseMessage(response.data, 202, response.data.msg)
    },
    async getOutboundId () {
      let response = await Apis.getOutboundId(null, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.boxId = '0'.repeat(8 - response.data.msg.length) + response.data.msg
        this.getBarcodeMapping()
        this.btnStatus = 'print'
      }
    },
    async getBarcodeMapping () {
      let response = await Apis.getBarcodeMapping({store_id: this.storeId})
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.mapBarcode = response.data.msg
        this.barcodeArr = Object.keys(response.data.msg)
      }
    },
    async _getStoreId () {
      this.storeId = await this.getStoreId()
      if (this.storeId) {
        // this.getOutboundId()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            // this.getOutboundId()
          } else {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
    },
    downLoad () {
      multiDownload([`/api/shipment-label/?store_id=${this.storeId}&shipment_id=${this.searchBounds}`], '箱唛.zip')
    },
    reset () {
      this.mapBarcode = {}
      this.barcodeArr = []
      this.skulist = {}
      this.num = 0
    },
    playAudio () {
      let ele = this.$refs.audio
      ele.play()
    },
    judgeValue (val, isAdd, key) {
      setTimeout(() => {
        if (val) {
          if (this.barcodeArr.indexOf(val) > -1) {
            this.isScuess = true
            if (isAdd) {
              if (this.skulist[val]) {
                this.skulist[val] = this.skulist[val] + 1
              } else {
                this.skulist[val] = 1
              }
              this.num++
            } else {
              this.skulist[val] = this.skulist[val] - 1
              this.num--
              if (this.skulist[val] === undefined || this.skulist[val] < 0 || this.num < 0) {
                this.isScuess = false
                this.num = 0
              }
            }
          } else {
            this.isScuess = false
          }
          this.$nextTick(() => {
            this[key] = ''
            this.playAudio()
          })
        }
      }, 200)
    }
  },
  mounted () {
    this._getStoreId()
  }
}
</script>

<style>
.smt-item {
  font-size: 18px;
  margin-right: 60px;
}
.ob-block {
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  color: #666;
}
.ob-block:last-child {
  border-bottom: 0;
}
.si-title {
  margin-right: 14px;
}
.obb {
  margin-bottom: 15px;
}
.smt-input input:focus {
  background: red;
  color: #fff;
}
.outbound-box .preview-table {
  width: 500px;
}
.zs-box {
  padding-bottom: 30px;
}
.zs-title {
  font-size: 20px;
  color: rgba(40,123,211,.91);
}
.zs-item {
  margin-top: 10px;
}
.outbound-box .font-red {
  color: red!important;
}
</style>
