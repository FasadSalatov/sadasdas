<script setup lang="ts">
const onClick = () => {
  navigateTo("/private");
};
</script>

<template>
  <button @click="onClick" class="button">Private</button>
</template>

<style scoped lang="sass">
.button
  position: fixed
  top: 77px
  right: 10px
  z-index: 100
  font-size: 22px
  background: red
  padding: 9px 13px
  border-radius: 12px
  color: white
</style>
