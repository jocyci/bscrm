<template>
  <div class="manage-box ind-box">
    <div class="cm-form">
      <header class="">
        <h1>入库单详情</h1>
      </header>
    </div>
    <ul>
      <li><span>入库单号：</span><span>{{header.id}}</span></li>
      <li><span>入库日期：</span><span>{{header.time}}</span></li>
      <li><span>容器数：</span><span>{{header.container_count}}</span></li>
      <li><span>物流信息：</span><span>{{header.tracknumber}}</span></li>
      <li>
        <span>货件数量：</span>
        <span style="width: 85%">
          <Table  :columns="columns" :data="lists"></Table>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Apis from '@/common/js/apis'

export default {
  name: 'inboundDetail',
  data () {
    return {
      header: {},
      content: [],
      columns: [
        {
          title: '品名',
          key: 'name'
        },
        {
          title: 'SKU名',
          key: 'sku'
        },
        {
          title: '数量',
          key: 'quantity_received',
          width: 90
        }
      ],
      lists: []
    }
  },
  methods: {
    async getInboundDetail (id) {
      let response = await Apis.getInboundDetail(id, true)
      let data = response.data
      if (!this.$responseMessage(data, 200, '', true)) {
        let lists = []
        this.header = data.msg.header
        lists = data.msg.content.map((item) => {
          return Object.assign({}, {quantity_received: item.quantity_received}, item.sku)
        })
        this.lists = lists
      }
    }
  },
  created () {
    this.getInboundDetail(this.$route.params.id)
  }
}
</script>

<style>
.ind-box header {
  color: #333;
}
.ind-box ul,
.ind-box li {
  list-style: none;
  font-size: 16px;
}
.ind-box ul {
  margin-top: 10px;
  width: 60%;
}
.ind-box li {
  padding: 15px 0;
  color: #666;
  border-bottom: 1px solid #ddd;
}
.ind-box li>span {
  display: inline-block;
  vertical-align: middle;
}
.ind-box li>span:first-child {
  color: #000;
  width: 80px;
}
.ind-box li:last-child {
  border-bottom-width: 0;
}
.ind-box li:last-child>span {
  vertical-align: top;
}
</style>
