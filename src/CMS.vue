<template>
  <router-view></router-view>
</template>

<script>

  export default {
    data () {
      return {}
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
