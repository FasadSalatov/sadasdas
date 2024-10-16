<script setup lang="ts">
</script>

<template>
  <section class="navbar" id="navbar">
    <div class="navbar-inner v-container">
      <NuxtLink
        class="navbar-inner-button navbar-inner-button-disabled"
        active-class="navbar-inner-button-active"
      >
        <span
          ><NuxtImg class="navbar-inner-button-icon" src="/icon/lock.svg"
        /></span>
        <span class="navbar-inner-button-text">Фарм</span>
      </NuxtLink>
      <NuxtLink
        class="navbar-inner-button navbar-inner-button-disabled"
        active-class="navbar-inner-button-active"
      >
        <span
          ><NuxtImg class="navbar-inner-button-icon" src="/icon/lock.svg"
        /></span>
        <span class="navbar-inner-button-text">банк</span>
      </NuxtLink>
      <NuxtLink
        class="navbar-inner-airdrop-button"
        to="/airdrop"
        active-class="navbar-inner-airdrop-button-active"
      >
        <span class="navbar-inner-airdrop-button-background">
          <NuxtImg
            class="navbar-inner-airdrop-button-icon"
            src="/image/bin/rocket.png"
          />
          <NuxtImg
            class="navbar-inner-airdrop-button-icon-star"
            src="/image/bin/star.png"
          />
          <NuxtImg
            class="navbar-inner-airdrop-button-icon-star"
            src="/image/bin/star.png"
          />
          <NuxtImg
            class="navbar-inner-airdrop-button-icon-star"
            src="/image/bin/star.png"
          />
        </span>
        <span><p class="navbar-inner-button-icon" /></span>
        <span class="navbar-inner-airdrop-button-text">AirDrop</span>
      </NuxtLink>
      <NuxtLink
        class="navbar-inner-button"
        to="/team"
        active-class="navbar-inner-button-active"
      >
        <span
          ><NuxtImg class="navbar-inner-button-icon" src="/image/bin/team.png"
        /></span>
        <span class="navbar-inner-button-text">Команда</span>
      </NuxtLink>
      <NuxtLink
        class="navbar-inner-button navbar-inner-button-disabled"
        active-class="navbar-inner-button-active"
      >
        <span
          ><NuxtImg class="navbar-inner-button-icon" src="/icon/lock.svg"
        /></span>
        <span class="navbar-inner-button-text">Курсы</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="sass">
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
      background-color: var(--color-white)
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

      &-disabled
        position: relative

      &-active
        background-color: var(--color-white-60)

      &-icon
        width: unset
        height: 1.5rem
        object-fit: cover
        object-position: center

      &-text
        color: var(--color-black)

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
    
