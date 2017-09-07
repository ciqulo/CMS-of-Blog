<template>
  <div class="side-menu">
    <el-menu default-active="1-2" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1">
        <template slot="title" style="background-color: rgb(50, 65, 87);"><i class="el-icon-message"></i>文章</template>
        <el-menu-item index="1-2" @click="$router.push('/post/postList')">所有文章</el-menu-item>
        <el-menu-item index="1-1" @click="$router.push('/post/postEditor')">写文章</el-menu-item>
        <el-menu-item index="1-4" @click="$router.push('/post/postTag')">标签</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" style="background-color: rgb(50, 65, 87);"><i class="el-icon-menu"></i>评论</el-menu-item>
      <el-submenu index="4" style="background-color: rgb(50, 65, 87);">
        <template slot="title"><i class="el-icon-message"></i>用户</template>
        <el-menu-item index="4-1">所有用户</el-menu-item>
        <el-menu-item index="4-2">添加用户</el-menu-item>
        <el-menu-item index="4-3">我的资料</el-menu-item>
      </el-submenu>
      <el-submenu index="5" style="background-color: rgb(50, 65, 87);">
        <template slot="title"><i class="el-icon-message"></i>设置</template>
        <el-menu-item index="5-1">站点设置</el-menu-item>
        <el-menu-item index="5-3">固定链接</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
  .side-menu {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 200px;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ul.el-menu {
    border-radius: 0;
    height: 100%;
  }
</style>
