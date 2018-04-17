<template>
  <div>
    <div class="manage-box">
      <div class="cm-form">
        <Input v-model="searchContent" placeholder="请输入用户名" clearable style="width: 120px"></Input>
        <Button type="primary" size="small" class="search" @click.native="searchAcion">搜索</Button>
      </div>
      <div class="cm-table" style="width: 40%">
        <Table border stripe :columns="columns" :data="lists"></Table>
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
      searchContent: '',
      columns: [{
        title: '入库单ID',
        key: 'id',
        width: 150,
        render: (h, params) => {
          return h('a', {
            attrs: {
              href: `/#/inbound-detail/${params.row.id}`,
              target: '_blank'
            }
          }, [params.row.id])
        }
      }, {
        title: '容器数量',
        key: 'container_count',
        width: 150
      }, {
        title: '追踪号',
        key: 'tracknumber'
      }],
      lists: []
    }
  },
  methods: {
    async searchAcion () {
      let response = await Apis.searchInbound({search: this.searchContent || null}, true)
      if (!this.$responseMessage(response.data, 200, '', true)) {
        this.lists = response.data.msg
      }
    }
  },
  created () {
    this.searchAcion()
  }
}
</script>

<style>
</style>
