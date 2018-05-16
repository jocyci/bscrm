<template>
  <div>
    <Tabs :animated="false">
      <TabPane label="入库录入">
        <entry></entry>
      </TabPane>
      <TabPane label="查看入库单">
        <check></check>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import entry from './components/extry'
import check from './components/check'

export default {
  name: 'inbound',
  components: {
    entry,
    check
  }
}
</script>

<style>
</style>
