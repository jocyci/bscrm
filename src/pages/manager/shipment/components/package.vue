<template>
  <div>
    <div class="manage-box">
      <div class="cm-form">
        <Input v-model="ShipmentId" placeholder="货件编号" clearable style="width: 120px"></Input>
        <Button type="primary" size="small" :disabled="!ShipmentId" class="download" @click="download">下载</Button>
      </div>
    </div>
  </div>
</template>

<script>
import multiDownload from '@/common/js/download'

export default {
  name: '',
  data () {
    return {
      ShipmentId: ''
    }
  },
  methods: {
    download () {
      multiDownload([`/api/package-list/?shipment_id=${this.ShipmentId}`], `装箱单${this.ShipmentId}.csv`)
    }
  }
}
</script>

<style>
.download {
  margin-left: 20px;
}
</style>
