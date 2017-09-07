<template>
  <div style="background-color:rgb(50, 65, 87);height: 60px">
    <router-link class="nav-home" to="/">
      <i class="fa fa-home fa-2x" style="line-height: 60px" aria-hidden="true"></i>
    </router-link>
    <div style="float: right" class="nav-user">
      <el-dropdown>
        <el-button>
          你好, {{user.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item ><div @click="logout">登出</div></el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {LOGOUT} from '../../store/actionTypes'

  export default {
    data() {
      return {
        activeIndex: '0',
      }
    },
    methods: {
      async logout() {
        const {code} = await this.LOGOUT() || {}
        if (code == 200) this.$router.replace('/login')
      },
      ...mapActions([LOGOUT]),
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="scss">
  .nav-home {
    width: 200px;
    height: 60px;
    text-align: center;
    float: left;
    color: white;
  }

  .nav-user {
    margin-right: 20px;
    .el-button {
      background-color: transparent;
      border: none;
      color: white;
      line-height: 40px;
    }
  }
</style>
