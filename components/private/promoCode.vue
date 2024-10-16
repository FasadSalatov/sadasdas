<template>
  <section class="promo-code" id="promo-code">
    <div class="promo-code-active">
      <NuxtLink to="/">
        <svg
          width="69"
          height="93"
          viewBox="0 0 69 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M49 20H69V0C68.5972 10.8745 59.8745 19.5972 49 20Z"
            fill="#2D3748"
          />
          <path
            d="M0 46.5C0 31.8645 11.8645 20 26.5 20H69V73H26.5C11.8645 73 0 61.1355 0 46.5Z"
            fill="#2D3748"
          />
          <rect x="4" y="24" width="45" height="45" rx="22.5" fill="#1A82FF" />
          <path
            d="M27.5 53.5L20.5 46.5L27.5 39.5"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M49 73H69V93C68.5972 82.1255 59.8745 73.4028 49 73Z"
            fill="#2D3748"
          />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>
<script lang="ts" setup>
</script>

<style scoped lang="sass">
.promo-code
  position: absolute
  top: 0
  right: 0
  z-index: 1
  display: flex
  align-items: center
  height: 100vh
  justify-content: flex-end
  pointer-events: none
  &-active
    pointer-events: all

  &-inner
    padding: 0.5rem 0.5rem
    background-color: var(--color-white-60)
    display: flex
    align-items: center
    gap: 0.5rem
    border-top-left-radius: 2rem
    border-bottom-left-radius: 2rem
    border: 0.15em solid var(--color-black)
    border-right-color: var(--color-transparent)

    &-no-active
      display: flex
      gap: 0.5rem

      &-button
        background-color: var(--color-black)
        display: flex
        justify-content: center
        align-items: center
        padding: 0.47rem
        border-radius: 50%
        cursor: pointer

        &-icon
          width: 1.9rem
          height: 1.9rem

          &-type
            display: flex
            flex-direction: column
            transition: width 0.3s ease, max-height 0.3s ease, opacity 0.3s ease
            max-height: 0
            opacity: 0
            width: 0
            overflow: hidden

            &.is-open
              display: flex
              width: 200px
              max-height: 500px
              opacity: 1

              &-text
                font-family: Inter, sans-serif
                font-weight: bold
                text-wrap: nowrap
                margin-bottom: 0.2rem

                &-form
                  background-color: var(--color-white-60)
                  border-radius: 1em
                  overflow: hidden
                  display: flex
                  justify-content: center
                  padding: 0 0.4rem

                &-input
                  outline: none
                  background-color: transparent

                  &-button
                    outline: none
                    background-color: var(--color-transparent)
                    padding: 0.3rem

                    &-icon
                      width: 0.9rem
                      height: 0.9rem
</style>