<template>
  <div class="content-container">
    <slot name="container"></slot>
  </div>

</template>

<script>

</script>

<style>
  .content-container {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 200px;
    padding: 10px;
    box-sizing: border-box;
    width: calc(100% - 200px);
  }

</style>
