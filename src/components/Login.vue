<template>
  <content-container class="login">
    <div slot="container">
      <div class="content">
        <div class="signUp">
          <div>Do you have account?</div>
          <button>SIGN UP</button>
        </div>
        <div class="loginIn">
          <div>Have an account!</div>
          <button>LOGIN IN</button>
        </div>
      </div>
      <div class="contentWrite">
        <div class="content-title">
          SIGN UP
        </div>
        <div class="signMain">
          <div class="fullName">
            <input type="text" placeholder="FullName"/>
          </div>
          <div class="Email">
            <input type="email" placeholder="E-mail"/>
          </div>
          <div class="passWord">
            <input type="password" placeholder="Password"/>
          </div>
        </div>
        <button class="signBtn">SIGN UP</button>
      </div>
    </div>
  </content-container>
</template>

<script type="text/ecmascript-6">
  import ContentContainer from './partials/ContentContainer.vue'
  export default {
    data () {
      return {}
    },
    components: {
      ContentContainer,
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
    .signMain {
      .fullName, .Email, .passWord {
        width: 80%;
        margin: {
          left: 10%;
          top: 2rem;
        }
      ;
        input {
          width: 100%;
          height: 2.5rem;
          border-bottom: 1px solid #d9d9d9;
        }
      }
    }
    .signBtn {
      background: #009cfe;
      color: #fff;
      border: none;
      width: 7.5rem;
      height: 2.5rem;
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
        left: 1rem;
      }
      font: {
        size: 1.5rem;
        weight: 300;
      }
    ;

    }
  }
</style>
