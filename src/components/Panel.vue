<template>
  <div>
    <navigation></navigation>
    <side-bar></side-bar>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navigation from './partials/Navigation.vue'
  import SideBar from './partials/SideBar.vue'

  export default {
    data() {
      return {}
    },
    components: {
      Navigation,
      SideBar
    }

  }
</script>

<style>
  .content-container {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 200px;
    box-sizing: border-box;
    overflow: scroll;
    width: calc(100% - 200px);
    padding: 20px;
  }
</style>
