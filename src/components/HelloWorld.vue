<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="password" v-model="password"> <br>
      <el-button @click="addUser">提交</el-button>
      <el-button @click="isLogin">isLogin</el-button>
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
  mounted(){
    this.isLogin();
  },
  methods: {
    addUser() {
      var name = this.userName;
      var password = this.password;
      this.$http.post('/api/user/login', {
        username: name,
        password: password
      }).then((response) => {
        console.log(response);
      })
    },
    isLogin(){
      this.$http.post('/api/user/',{}).then(
        (res) => {
          console.log(res);
        }
      )
    }
  }
}
</script>