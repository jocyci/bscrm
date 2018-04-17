<template>
  <div class="outbound-box">
    <audio ref="audio" :src="isScuess ? 'http://hehe-1252068473.costj.myqcloud.com/static/sheep.wav' : 'http://hehe-1252068473.costj.myqcloud.com/static/horse.wav'"></audio>
    <div class="ob-block">
      <div class="obb">
        <div class="smt-item vm">
          <span class="vm si-title">开始装箱 </span><Button type="default"  class="vm"><a :href="`printtag:fnsku/${boxId}/${boxId}/2`
">打印箱子编码</a></Button>
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
    </div>
    <div class="ob-block">
      <div class="obb">
        <div class="smt-item vm">
          <span class="vm si-title font-red">删除箱子 </span>
          <Input  placeholder=""  style="width: 180px" v-model="delete_Id"></Input>
          <Button type="error"  class="vm" @click.native="deleteOutbound">提交</Button>
        </div>
      </div>
    </div>
    <!-- <div class="ob-block">
      <div class="obb">
        <div class="smt-item vm">
          <Button type="primary"  class="vm" @click.native="saveOutbounds">查询</Button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Apis from '@/common/js/apis'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: '',
  data () {
    this.mapBarcode = {}
    this.barcodeArr = []
    return {
      boxId: '',
      storeId: '',
      isScuess: true,
      load: '',
      extract: '',
      skulist: {},
      delete_Id: '',
      num: 0
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
    }
  },
  methods: {
    ...mapActions(['getStoreId', 'fetchAfterLoginData']),
    async saveOutbounds () {
      let skulist = {}
      Object.keys(this.skulist).forEach(key => {
        skulist[this.mapBarcode[key]] = this.skulist[key]
      })
      let response = await Apis.saveOutbounds(this.boxId, {store_id: this.storeId, skulist: JSON.stringify(skulist)}, true)
      if (!this.$responseMessage(response.data, 202, '提交成功')) {
        this.reset()
        this.getOutboundId()
      }
    },
    async deleteOutbound () {
      let response = await Apis.deleteOutbound(this.delete_Id)
      this.$responseMessage(response.data, 202, response.data.msg)
    },
    async getOutboundId () {
      let response = await Apis.getOutboundId(null, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.boxId = response.data.msg
        this.getBarcodeMapping()
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
        this.getOutboundId()
      } else {
        let afterLoginData = await this.fetchAfterLoginData()
        if (afterLoginData && afterLoginData.data.msg.store_list) {
          this.storeId = await this.getStoreId()
          if (this.storeId) {
            this.getOutboundId()
          } else {
            this.$Message.warning('请选择店铺！')
          }
        }
      }
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
</style>
