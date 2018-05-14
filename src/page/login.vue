<template>
  <div class="login-wrapper" @keyup.enter="submit('form')">
    <div class="login-box">
      <h2 class="title">Admin</h2>
      <p class="note" v-if="errorMsg">{{errorMsg}}</p>
      <el-form :model="form" :rules="rules" ref="form" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" maxlength="11" placeholder="手机号码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.autoLogin">下次自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="aw" type="primary" @click="submit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
  import qs from 'qs'
  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else if (!utils.isvalidPhone(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!utils.isvalidPass(value)) {
          callback(new Error('请输入正确的密码'));
        } else {
          callback();
        }
      };
      return {
        form: {
          phone: '',
          password: '',
          autoLogin: false
        },
        rules: {
          phone: [{
            validator: checkPhone,
            trigger: 'blur'
          }],
          password: [{
            validator: checkPass,
            trigger: 'blur'
          }]
        },
        errorMsg: ''
      }
    },
    mounted(){
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.errorMsg = '';
            var form = {
              "phone": this.form.phone,
              "password": this.form.password
            };
            this.$http.post('/api/sso/kgjCompanyAccount/login', form).then((res) => {
              
            }).then(() => {
          
            }).catch(err => {
              this.errorMsg = err;
            });
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-wrapper {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/img/login-bg.jpg) no-repeat center / cover;
    .text-center {
      text-align: center;
    }
    .logo {
      padding-top: 60px;
    }
    .copy {
      font-size: 14px;
      color: #fff;
    }
    .login-box {
      width: 300px;
      margin: 40px auto 20px;
      padding: 40px 50px 25px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 2px 1px #ccc;
      .note {
        border: 1px solid #d46f16;
        border-radius: 5px;
        background: #ffe6e5;
        padding: 0 10px;
        color: #666;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        &:before {
          content: '–';
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          font-weight: bold;
          background: #f65939;
          border-radius: 50%;
          vertical-align: middle;
          margin: 0 10px;
          color: #fff;
        }
      }
      .title {
        font-size: 26px;
        text-align: center;
        margin-bottom: 20px;
      }
      .login-form {
        margin-top: 20px;
      }
      .aw {
        width: 100%;
      }
    }
  }
</style>
