<template>
  <div>
    <users role="root"></users>
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
