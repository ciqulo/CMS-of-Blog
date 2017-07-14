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
    <div :class="[{'sign-up-state':isSigningUp === true},{'login-state':isSigningUp === false}]">
      <div class="content-title">
        <span v-show="isSigningUp === false">SIGN UP</span>
        <span v-show="isSigningUp === true">LOGIN IN</span>
      </div>
      <div class="signMain">
        <div class="fullName">
          <input v-if="isSigningUp === false" v-model="fullName" type="text" placeholder="FullName"/>
        </div>
        <div class="Email">
          <input type="email" v-model="username" placeholder="E-mail"/>
        </div>
        <div class="passWord">
          <input type="password" v-model="password" autocomplete="new-password" placeholder="Password"/>
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
        let isValid = false
        if (!this.username) this.$notify.info({
          title: '提示',
          message: '用户名不能为空'
        })

        if (!this.password) this.$notify.info({
          title: '提示',
          message: '密码不能为空'
        })

        return true
      },
      async doLogin(){

        const isValid = this.checkForm()
        console.log(!isValid)
        if (!isValid) return

        const {msg, data, code} = await this.LOGIN({
          username: this.username,
          password: this.password
        }) || {}

        if (code !== 0) return this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        })

        this.SET_USER({
          isValid: true,
          ...data
        })
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
    margin: 10% auto;
    width: 70%;
    height: 20rem;
    background: #31393e;
    display: flex;
    .signUp {
      flex: 1;
      color: #babdbd;
      margin-top: 3rem;
      margin-left: 10%;
      div {
        text-align: left;
        width: 90%;
        font: {
          size: 1.5rem;
        }
      }
      button {
        background: #31393e;
        border: 1px solid #babdbd;
        color: #babdbd;
        width: 6.5rem;
        height: 2rem;
        margin: {
          top: 1rem;
        }
        border-radius: .2rem;
      }
    }
    .loginIn {
      @extend .signUp;
      button {
        margin: {
          top: 3.1rem;
        }
      }
    }

  }

  .login-state {
    position: absolute;
    margin: auto;
    height: 25rem;
    width: 30%;
    top: 12%;
    left: 20%;
    background: #fff;
    transition: all .475s;
    transform: translate3d(0, 0, 0);
    .signMain {
      .fullName, .Email, .passWord {
        width: 80%;
        margin: {
          left: 10%;
          top: 2rem;
        }
        input {
          width: 100%;
          height: 2.5rem;
          border-bottom: 1px solid #d9d9d9;
          background: #fff;
        }
      }
    }
    .signBtn {
      background: #009cfe;
      color: #fff;
      border: none;
      width: 7.5rem;
      height: 2rem;
      border: {
        radius: .2rem;
      }
      margin: {
        top: 3rem;
        right: 2rem;
      }
      float: right;
    }
    .content-title {
      color: #009cfe;
      margin: {
        top: 2rem;
        left: 2.1rem;
      }
      font: {
        size: 1.5rem;
        weight: 300;
      }
    }
  }

  .sign-up-state {
    @extend .login-state;
    transform: translate3d(100%, 0, 0);
  }
</style>
