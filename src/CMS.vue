<template>
  <div>
    <navigation></navigation>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Navigation from './components/partials/Navigation.vue'
  import SideBar from './components/partials/SideBar.vue'
  export default {
    data () {
      return {}
    },
    components: {
      Navigation,
      SideBar,
    }
  }
</script>

<style lang="scss">
  *, *::before, *::after {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    position: relative;
  }
</style>
