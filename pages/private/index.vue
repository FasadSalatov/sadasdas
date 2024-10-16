<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
// Массив с URL изображений для переключения
const backgrounds = [
  "image/airdrop/mc1.jpg",
  "image/airdrop/mc2.jpg",
  "image/airdrop/mc3.jpg",
];
const currentBackgroundIndex = ref(0);
let intervalId: any | undefined;

// Функция для переключения изображений
function switchBackground() {
  currentBackgroundIndex.value =
    (currentBackgroundIndex.value + 1) % backgrounds.length;
}

// Запуск интервала переключения при монтировании компонента
onMounted(() => {
  intervalId = setInterval(switchBackground, 70); // Переключение каждые 3 секунды
});

// Очистка интервала при размонтировании компонента
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div>
    <!-- Компонент с динамически изменяемым изображением -->
    <CommonHeaderpriv />
    <CommonBackgroundImage :image-url="backgrounds[currentBackgroundIndex]" />

    <div class="v-container"></div>

    <PrivatePromoCode />
    <CommonNavBarPrivat />
  </div>
</template>

<style scoped lang="sass">
.navbar-inner-button
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.navbar
  position: fixed
  width: 100%
  bottom: 0
  z-index: 1
  padding: 5px 20px 20px 20px

  &-inner
    position: relative
    display: flex
    justify-content: space-between

    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 50px
      background-color: rgba(4, 110, 181, 0.4)
      opacity: 40%
      filter: blur(2px)
      z-index: -1

      &-button
        padding: 5px 10px
        display: flex
        background-color: var(--color-transparent)
        justify-content: center
        align-items: center
        flex-direction: column

        &-active
          background-color: rgba(110, 110, 181, 0.2)
          border-radius: 25px

          &-icon
            width: 1.5rem
            height: 1.5rem
            object-fit: cover
            object-position: center

            &-text
              color: var(--color-white)

        &-airdrop-button
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          position: relative

          &-active
            background-color: var(--color-white-60)

            &-text
              font-weight: bold

            &-icon
              width: 1.5rem
              height: 1.5rem
              object-fit: cover
              z-index: 1
              object-position: center

              &-star
                &:nth-child(2)
                  position: absolute
                  width: 0.6rem
                  top: 0.9em
                  left: 1em

                  &:nth-child(3)
                    position: absolute
                    right: 0.5rem
                    width: 0.6rem

                    &:nth-child(4)
                      position: absolute
                      bottom: 0.2rem
                      width: 0.6rem

            &-background
              display: flex
              top: -2rem
              flex-direction: column
              justify-content: center
              align-items: center
              position: absolute
              border-radius: 50%
              width: 3.7rem
              height: 3.7rem
              margin-bottom: 0.1rem
              background-color: var(--color-bright-blue)
</style>
