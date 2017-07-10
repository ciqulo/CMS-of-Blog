<template>
  <div>
    <navigation></navigation>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Navigation from './components/partials/Navigation.vue'
  import SideBar from './components/partials/SideBar.vue'
  export default {
    data () {
      return {}
    },
    created(){
      console.log(this.hello)
      this.LOGIN()
    },
    components: {
      Navigation,
      SideBar,
    },
    computed: {
      ...mapState(['hello'])
    },
    methods:{
      ...mapActions(['LOGIN'])
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
