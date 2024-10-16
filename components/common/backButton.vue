<template>
  <button @click="onClick" class="backButton">
    <svg
      width="69"
      height="93"
      viewBox="0 0 69 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="24" width="45" height="45" rx="22.5" fill="#1A82FF" />
      <path
        d="M27.5 53.5L20.5 46.5L27.5 39.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>
<script setup lang="ts">
const onClick = () => {
  navigateTo("/");
};
</script>
<style lang="sass">
.backButton
    position: absolute
    top: 30px
    left: 10px
    z-index: 200
    padding: 10px
</style>