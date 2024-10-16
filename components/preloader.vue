<template>
  <section class="preloader">
    <div class="bg"><NuxtImg :src="currentBackgroundImage" /></div>
    <div class="preloader-inner v-container">
      <div class="spinner"></div>
      <div class="now">
        <img
          class="imgload"
          src="/image/loading/loading.png"
          :style="{ width: '50%', margin: '0 auto' }"
        />

        <div class="progress-bar">
          <img
            src="./bl.png"
            class="progress"
            :style="{ width: progress + '%' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref } from "vue";

const emit = defineEmits(["loadingComplete"]);

const progress = ref(0);
const currentBackgroundImage = ref("/image/loading/loading1.jpg");

const backgroundImages = [
  "/image/loading/loading1.jpg",
  "/image/loading/loading2.jpg",
  "/image/loading/loading3.jpg",
  "/image/loading/loading4.jpg",
  "/image/loading/loading1.jpg",
  "/image/loading/loading2.jpg",
  "/image/loading/loading3.jpg",
  "/image/loading/loading4.jpg",
];

// Константа для управления скоростью переключения
const backgroundChangeSpeed = 1.5; // Чем меньше значение, тем быстрее переключение

onMounted(() => {
  preloadImages();
  simulateLoading();
});

function preloadImages() {
  backgroundImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function simulateLoading() {
  const duration = 3000;
  const interval = 30;
  const totalSteps = duration / interval;

  let currentStep = 0;
  let currentImageIndex = 0;

  const loadingInterval = setInterval(() => {
    currentStep++;
    progress.value = Math.floor((currentStep / totalSteps) * 100);

    // Меняем фоновое изображение циклично
    if (currentStep % backgroundChangeSpeed === 0) {
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
      currentBackgroundImage.value = backgroundImages[currentImageIndex];
    }

    if (currentStep >= totalSteps) {
      clearInterval(loadingInterval);
      emit("loadingComplete");
      console.log("Loading Complete");
    }
  }, interval);
}
</script>

<style scoped lang="sass">
.preloader
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-size: 100vw
  display: flex
  justify-content: center
  align-items: center
  z-index: 9999

  &-inner
    text-align: center
    position: relative
    z-index: 1000

.now
  margin-top: -30vh

.progress-bar
  width: 100%
  height: 62px
  background-image: url('bl2.png')
  background-size: 100%
  border-radius: 30px
  overflow: hidden
  display: flex
  justify-content: start

.progress
  height: 100%
  transition: width 0.2s ease

.bg
  position: absolute
  left: 0px
  top: 0px
  img
    width: 100vw
    height: 100vh
</style>
