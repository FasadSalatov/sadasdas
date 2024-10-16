<template >
  <div>
    <div class="navbar-private">
      <svg
        width="359"
        height="56"
        viewBox="0 0 359 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.2 -3.8147e-06C31.2667 -3.8147e-06 35.6667 0.85333 39.4 2.56C43.1333 4.21333 46.0133 6.61333 48.04 9.76C50.0667 12.8533 51.08 16.5067 51.08 20.72C51.08 24.9333 50.0667 28.5867 48.04 31.68C46.0133 34.7733 43.1333 37.1733 39.4 38.88C35.6667 40.5333 31.2667 41.36 26.2 41.36H16.44V56H0.6V-3.8147e-06H26.2ZM25.24 28.88C28.4933 28.88 30.9467 28.1867 32.6 26.8C34.2533 25.36 35.08 23.3333 35.08 20.72C35.08 18.1067 34.2533 16.08 32.6 14.64C30.9467 13.2 28.4933 12.48 25.24 12.48H16.44V28.88H25.24ZM83.2831 41.12H74.6431V56H58.8031V-3.8147e-06H84.4031C89.4698 -3.8147e-06 93.8698 0.85333 97.6031 2.56C101.336 4.21333 104.216 6.61333 106.243 9.76C108.27 12.8533 109.283 16.5067 109.283 20.72C109.283 24.7733 108.323 28.32 106.403 31.36C104.536 34.3467 101.843 36.6933 98.3231 38.4L110.403 56H93.4431L83.2831 41.12ZM93.2831 20.72C93.2831 18.1067 92.4565 16.08 90.8031 14.64C89.1498 13.2 86.6965 12.48 83.4431 12.48H74.6431V28.88H83.4431C86.6965 28.88 89.1498 28.1867 90.8031 26.8C92.4565 25.36 93.2831 23.3333 93.2831 20.72ZM118.022 -3.8147e-06H133.862V56H118.022V-3.8147e-06ZM201.775 -3.8147e-06L177.775 56H162.175L138.255 -3.8147e-06H155.375L170.575 36.48L186.095 -3.8147e-06H201.775ZM240.62 45.12H216.94L212.54 56H196.38L221.1 -3.8147e-06H236.7L261.5 56H245.02L240.62 45.12ZM235.98 33.44L228.78 15.52L221.58 33.44H235.98ZM275.098 12.56H257.898V-3.8147e-06H308.058V12.56H290.938V56H275.098V12.56ZM358.919 43.76V56H313.959V-3.8147e-06H357.879V12.24H329.639V21.68H354.519V33.52H329.639V43.76H358.919Z"
          fill="#272D3D"
        />
      </svg>
    </div>
    <section class="navbar" id="navbar">
      <div class="navbar-inner v-container">
        <NuxtLink
          class="navbar-inner-button gg"
          active-class="navbar-inner-button-active"
          to="/private"
        >
          <NuxtImg src="/icon/navbar/main.svg" />
          <span class="navbar-inner-button-text">Главная</span>
        </NuxtLink>
        <NuxtLink
          class="navbar-inner-button gg"
          to="/private2"
          active-class="navbar-inner-button-active"
        >
          <NuxtImg src="/icon/navbar/team.svg" />
          <span class="navbar-inner-button-text">Команда</span>
        </NuxtLink>

        <NuxtLink
          class="navbar-inner-button"
          to="/private3"
          active-class="navbar-inner-button-active"
        >
          <NuxtImg src="/icon/navbar/how-it.svg" />
          <span class="navbar-inner-button-text">Как это работает</span>
        </NuxtLink>
        <button
          class="navbar-inner-button"
          active-class="navbar-inner-button-active"
          @click="onClickCommunity"
        >
          <NuxtImg src="/icon/navbar/question.svg" />
          <span class="navbar-inner-button-text"> Закрытое комьюнити </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $telegramOpenLink } = useNuxtApp();

const onClickCommunity = () => {
  // let create = document.createElement('a');
  // create.href = "t.me/+RN6WrX8WNOswYWMy";
  // create.click();
  $telegramOpenLink("https://t.me/+RN6WrX8WNOswYWMy");
};
</script>



<style scoped lang="sass">
.navbar-inner-button
  display: flex
  text-align: center
  img
    width: 32px
    height: 32px
.gg
  margin-top: -5%
.navbar
  position: fixed
  display: flex
  flex-direction: column
  width: 100%
  bottom: 0
  z-index: 2
  padding: 5px 20px 20px 20px
  &-private
    left: 50%
    transform: translateX(-50%)
    z-index: 1
    margin-top: auto
    width: fit-content
    z-index: 1
    bottom: 106px
    position: fixed
    margin-top: auto

  &-inner
    display: grid
    grid-template-columns: 25% 25% 25% 25%
    align-items: baseline

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
