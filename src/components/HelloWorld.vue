<template>
  <div class="hello">
     <h1>HelloWorld</h1>
     <Button type="info">Info</Button>
     <Button type="success">Success</Button>
     <Button type="warning">Warning</Button>
     <Button type="error">Error</Button>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    /*eslint-disable*/
    // axios.post('/api/login/', {
    //   username: 'root',
    //   password: 'ljs12345'
    // })
    // .then(function (response) {
    //   console.log('response', response.data.token)
    //   axios({
    //     url: '/api/after_login/',
    //     method: 'get',
    //     headers: {'Authorization': `JWT ${response.data.token}`}
    //   })
    //   .then((response) => {
    //     console.log(response)
    //   })
    // })
    // .catch(function (error) {
    //   console.log('error', error)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
