<script setup lang="ts">
interface Props {
  imageUrl: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="background">
    <!-- <div
      
      :style="{ backgroundImage: `url('${props.imageUrl}')` }"
    ></div> -->
    <NuxtImg :src="props.imageUrl" preload class="background-image" />
  </div>
</template>

<style scoped lang="sass">
.background
  width: 100%
  height: 100vh
  position: fixed
  top: 0
  z-index: 1

  &-image
    width: 100%
    height: 100vh
    background-size: cover
    background-position: center
</style>
