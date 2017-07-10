<template>
  <content-container class="login">
    <div slot="container">
      <div class="content">
        <div class="signUp">
          <div>Do you have account?</div>
          <button>LOGIN IN</button>
        </div>
        <div class="loginIn">
          <div>Have an account!</div>
          <button>LOGIN IN</button>
        </div>
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
    position: absolute;
    top: 25%;
    left: 27%;
    width: 35rem;
    height: 19rem;
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

</style>
