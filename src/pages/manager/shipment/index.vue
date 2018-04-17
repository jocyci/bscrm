<template>
  <div>
    <Tabs :animated="false">
      <TabPane label="管理亚马逊货件">
        <standard></standard>
      </TabPane>
      <TabPane label="创建/更新亚马逊货件">
        <creare-or-update></creare-or-update>
      </TabPane>
      <TabPane label="查询装箱单">
        <package-list></package-list>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import standard from './components/standard'
import creareOrUpdate from './components/createOrUpdate'
import packageList from './components/package'

export default {
  name: 'shipment',
  components: {
    standard,
    creareOrUpdate,
    packageList
  }
}
</script>

<style>
</style>
