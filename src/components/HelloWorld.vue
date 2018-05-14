<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="password" v-model="password"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
    </form>
  </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: '',
      password: ''
    }
  },
  methods: {
    addUser() {
      var name = this.userName;
      var password = this.password;
      this.$http.post('/api/user/addUser', {
        username: name,
        password: password
      }).then((response) => {
        console.log(response);
      })
    }
  }
}
</script>