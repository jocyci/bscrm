<template>
  <div>
    <Tabs :animated="false">
      <TabPane label="新建运单">
        <newc></newc>
      </TabPane>
      <TabPane label="管理运单">
        <manage></manage>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import newc from './components/new'
import manage from './components/manage'

export default {
  name: 'waybill',
  components: {
    newc,
    manage
  }
}
</script>

<style>
</style>
