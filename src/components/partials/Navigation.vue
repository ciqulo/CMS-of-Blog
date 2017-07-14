<template>
  <el-menu theme="dark"
           :default-active="activeIndex"
           mode="horizontal"
           @select="handleSelect">
    <el-menu-item index="1" class="nav-home">
      <i class="fa fa-home fa-2x" style="vertical-align: middle" aria-hidden="true"></i>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">新建</template>
      <el-menu-item index="2-1">文章</el-menu-item>
      <el-menu-item index="2-2">用户</el-menu-item>
      <el-menu-item index="2-3">标签</el-menu-item>
    </el-submenu>
    <el-menu-item index="1" class="nav-home">
      你好, {{user.name}}
    </el-menu-item>
    <el-menu-item index="1" class="nav-home" @click="logout">
      登出
    </el-menu-item>
  </el-menu>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {LOGOUT} from '../../store/actionTypes'

  import {SET_USER} from '../../store/mutationTypes'
  export default {
    data() {
      return {
        activeIndex: '0',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      async logout(){
        const {code, msg} = await this.LOGOUT() || {}
        if (code == 0) {
          this.$router.push('/login')
          this.SET_USER({isValid: null})
        }
        else this.$message.error(msg)
      },
      ...mapActions([LOGOUT]),
      ...mapMutations([SET_USER])
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style>
  .nav-home {
    width: 200px;
    text-align: center;
  }
</style>
