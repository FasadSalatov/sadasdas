
<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRef } from "vue";
import { useUserStore } from "~/store/userStore";

const user = toRef(useUserStore(), "user");
const isCapcha = toRef(useUserStore(), "isCapcha");

const backgroundImages = [
  {
    src: "image/farm/gt1.jpg",
    id: 0,
  },
  {
    src: "image/farm/gt2.jpg",
    id: 1,
  },
  {
    src: "image/farm/gt2.jpg",
    id: 2,
  },
  {
    src: "image/farm/gt3.jpg",
    id: 3,
  },
  {
    src: "image/farm/gt4.jpg",
    id: 4,
  },
  {
    src: "image/farm/gt5.jpg",
    id: 5,
  },
  {
    src: "image/farm/gt6.jpg",
    id: 6,
  },
  {
    src: "image/farm/gt7.jpg",
    id: 7,
  },
  {
    src: "image/farm/gt8.jpg",
    id: 8,
  },
  // "image/farm/gt1.jpg",
  // "image/farm/gt2.jpg",
  // "image/farm/gt3.jpg",
  // "image/farm/gt4.jpg",
  // "image/farm/gt5.jpg",
  // "image/farm/gt6.jpg",
  // "image/farm/gt7.jpg",
  // "image/farm/gt8.jpg",
];

const currentBackgroundImage = ref(0);
let animationFrameId: number | null = null;

function preloadImages(imageUrls: string[]) {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Функция для циклической смены фонов
function cycleBackgroundImages() {
  let imageIndex = 0;

  const updateBackground = () => {
    currentBackgroundImage.value = backgroundImages[imageIndex].id;
    imageIndex = (imageIndex + 1) % backgroundImages.length;

    setTimeout(() => {
      animationFrameId = requestAnimationFrame(updateBackground);
    }, 200);
  };

  updateBackground();
}

onMounted(() => {
  // preloadImages(backgroundImages);
  cycleBackgroundImages();
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div>
    <CommonHeader />
    <CommonBalance />
    <NuxtImg src="image/farm/gt1.jpg" class="background background-active" />
    <NuxtImg
      :key="img.id"
      v-for="img in backgroundImages"
      :src="img.src"
      class="background"
      :class="{ 'background-active': currentBackgroundImage === img.id }"
      preload
    />
    <IndexPromoCode />
    <Capcha v-show="!isCapcha" />

    <CommonNavBar />
  </div>
</template>

<style scoped lang="sass">
.background
  width: 100%
  height: 100vh
  background-size: cover
  background-position: center
  position: absolute
  top: 0
  transition: background 1s ease-in-out
  display: none

.background-active
  display: block
</style>
