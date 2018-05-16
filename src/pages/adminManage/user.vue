<template>
  <div>
    <users role="admin"></users>
  </div>
</template>

<script>
import users from '@/common/components/userManage'

export default {
  name: 'manageUsers',
  data () {
    return {
    }
  },
  components: {
    users
  }
}
</script>

<style>
</style>
