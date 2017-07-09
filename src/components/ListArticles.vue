<template>
  <content-container>
    <div slot="container">哎嘿嘿</div>
  </content-container>

</template>

<script>

  import ContentContainer from './partials/ContentContainer.vue'
  export default {
    name: 'hello',
    data () {
      return {}
    },
    components: {
      ContentContainer,
    }
  }
</script>
