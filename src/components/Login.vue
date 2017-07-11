<template>
  <div class="login">
    <div class="content">
      <div class="signUp">
        <div>Do you have account?</div>
        <button @click="signUp">SIGN UP</button>
      </div>
      <div class="loginIn">
        <div>Have an account!</div>
        <button @click="loginIn">LOGIN IN</button>
      </div>
    </div>
    <div :class="[{contentWrite:chooseIndex === 1},{contentWrite2:chooseIndex === 2}]">
      <div class="content-title">
        <span v-if="chooseIndex === 1">SIGN UP</span>
        <span v-if="chooseIndex === 2">LOGIN IN</span>
      </div>
      <div class="signMain">
        <div class="fullName">
          <input v-if="chooseIndex === 1" type="text" placeholder="FullName"/>
        </div>
        <div class="Email">
          <input type="email" placeholder="E-mail"/>
        </div>
        <div class="passWord">
          <input type="password" autocomplete="new-password" placeholder="Password"/>
        </div>
      </div>
      <button v-if="chooseIndex === 1" class="signBtn">SIGN UP</button>
      <button v-if="chooseIndex === 2" class="signBtn">LOGIN IN</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        chooseIndex: 1
      }
    },
    methods: {
      signUp(){
        this.chooseIndex = 1
      },
      loginIn(){
        this.chooseIndex = 2
        this.LOGIN({name: 'ciqu', password: 111})
      },
      ...mapActions(['LOGIN'])
    },
    created(){

    }
  }
</script>
<style lang="scss">
  .login {
    background: url("http://oqjgod7s1.bkt.clouddn.com/c10471e1ff97e45032194a111ea7ab80.jpg");
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
      ;
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
      ;
        border-radius: .2rem;
      }
    }
    .loginIn {
      @extend .signUp;
      button {
        margin: {
          top: 3.1rem;
        }
      ;
      }
    }

  }

  .contentWrite {
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
    ;
      margin: {
        top: 3rem;
        right: 2rem;
      }
    ;
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

  .contentWrite2 {
    @extend .contentWrite;
    transform: translate3d(100%, 0, 0);
  }
</style>
