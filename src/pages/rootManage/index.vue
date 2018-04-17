<template>
  <div>
    <Tabs :animated="false">
      <TabPane label="公司管理">
        <company-manage></company-manage>
      </TabPane>
      <TabPane label="管理员用户管理">
        <manage-users></manage-users>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import companyManage from './component/companyManage'
import manageUsers from './component/manageUsers'

export default {
  name: 'rootManage',
  components: {
    companyManage,
    manageUsers
  }
}
</script>

<style>
</style>
