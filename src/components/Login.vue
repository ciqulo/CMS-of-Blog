<template>
  <div class="container">
    <div class="content">
      <div class="signUp">
        <div>没有账户？注册一个</div>
        <button @click="isSigningUp=false">注册</button>
      </div>
      <div class="loginIn">
        <div>已有账户？现在登录</div>
        <button @click="isSigningUp=true">登录</button>
      </div>
    </div>
    <div :class="isSigningUp ? 'sign-up-state' :'login-state' ">
      <div class="content-title">
        <span>{{isSigningUp ? 'LOGIN IN' : 'SIGN UP'}}</span>
      </div>
      <div class="signMain">
        <div class="fullName">
          <input v-show="isSigningUp === false" v-model="fullName" type="text" placeholder="姓名"/>
        </div>
        <div class="Email">
          <input type="email" v-model="username" placeholder="用户名"/>
        </div>
        <div class="passWord">
          <input type="password" v-model="password" autocomplete="new-password" placeholder="密码"/>
        </div>
      </div>
      <button v-if="isSigningUp === false" class="signBtn" @click="signUp">SIGN UP</button>
      <button v-if="isSigningUp === true" class="signBtn" @click="doLogin">LOGIN IN</button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations} from 'vuex'
  import {SET_USER} from '../store/mutationTypes'
  import {LOGIN} from '../store/actionTypes'
  export default {
    data () {
      return {
        isSigningUp: true,
        fullName: '',
        username: '',
        password: '',
      }
    },
    methods: {
      signUp(){
        this.$message.error('注册你妹啊')
      },

      checkForm(){
        let isValid = true
        if (!this.username) this.$notify.info({title: '提示', message: '用户名不能为空'})
        if (!this.password) this.$notify.info({title: '提示', message: '密码不能为空', offset: 90})
        return isValid
      },
      async doLogin(){
        const isValid = this.checkForm()
        if (!isValid) return

        const {msg, data, code} = await this.LOGIN({
          username: this.username,
          password: this.password
        }) || {}

        if (code !== 0) return this.$notify({title: '警告', message: msg, type: 'warning'})
        this.SET_USER({isValid: true, ...data})
        this.$router.push({path: '/'})
      },
      ...mapActions([LOGIN]),
      ...mapMutations([SET_USER])
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../assets/bg.jpg");
    background-size: cover;
  }

  .content {
    display: flex;
    margin: 10% auto;
    width: 70%;
    height: 320px;
    background: #31393e;
    .signUp, .loginIn {
      flex: 1;
      margin: 48px 0 0 10%;
      color: #babdbd;
      div {
        text-align: left;
        width: 90%;
        font-size: 24px;
      }
      button {
        margin-top: 16px;
        border-radius: 3.2px;
        width: 105px;
        height: 32px;
        outline: none;
        color: #babdbd;
        background: #31393e;
        border: 1px solid #babdbd;
      }
    }
  }

  .login-state {
    position: absolute;
    top: 12%;
    left: 20%;
    margin: auto;
    width: 30%;
    height: 400px;
    transition: all .475s;
    transform: translateX(0);
    background: #fff;
    .signMain {
      .fullName, .Email, .passWord {
        margin: 32px 0 0 10%;
        width: 80%;
        input {
          width: 100%;
          height: 40px;
          border-bottom: 1px solid #d9d9d9;
          outline: none;
          background: #fff;
        }
      }
    }
    .signBtn {
      float: right;
      margin: 48px 32px 0 0;
      width: 120px;
      height: 32px;
      border: none;
      border-radius: 3.2px;
      outline: none;
      color: #fff;
      background: #009cfe;
    }
    .content-title {
      margin: 32px 0 0 33.6px;
      font-size: 24px;
      font-weight: 300;
      color: #009cfe;
    }
  }

  .sign-up-state {
    @extend .login-state;
    transform: translateX(100%);
  }
</style>
