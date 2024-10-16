<script setup lang="ts">
import axios from "axios";
import { navigateTo, useNuxtApp } from "nuxt/app";
import { ref } from "vue";
import { useUserStore } from "~/store/userStore";
import { BACK_URL } from "~/utils/api/apiConfig";

const { setUser } = useUserStore();
const isOpen = ref(false);
const promoCodeInput = ref("");
const user = toRef(useUserStore(), "user");

const { $telegramInitData } = useNuxtApp();
const isPromoCodeValid = ref<null | boolean>(null);

const id = $telegramInitData?.user?.id;

const togglePromoCode = () => {
  if (user.value?.promo_active) {
    navigateTo("/private");
    return;
  }

  isOpen.value = !isOpen.value;
};

const sendPromoCode = async () => {
  try {
    const response = await axios.post(`${BACK_URL}/privat/active`, {
      user_id: id,
      promo_code: promoCodeInput.value,
    });
    navigateTo("/private");
    refetchUser();
    isPromoCodeValid.value = true;
  } catch (e) {
    console.log(e);
    isPromoCodeValid.value = false;
  }
};

const refetchUser = async () => {
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
};
</script>

<template>
  <section class="promo-code" id="promo-code">
    <div
      :class="[
        'promo-code-inner',
        { 'promo-code-inner-error': isPromoCodeValid === false },
      ]"
      v-if="!isPromoCodeValid"
    >
      <div class="promo-code-inner-no-active">
        <button class="promo-code-inner-button" @click="togglePromoCode">
          <NuxtImg
            class="promo-code-inner-button-icon"
            src="/image/bin/promocode.png"
          />
        </button>

        <div class="promo-code-inner-type" :class="{ 'is-open': isOpen }">
          <p class="promo-code-inner-type-text">Ввести промо-код</p>
          <div class="promo-code-inner-type-form">
            <input
              v-model="promoCodeInput"
              class="promo-code-inner-type-form-input"
              type="text"
              placeholder="Промо-код"
              autocomplete="on"
              required
            />
            <button
              class="promo-code-inner-type-form-button"
              type="submit"
              @click="sendPromoCode"
            >
              <NuxtImg
                class="promo-code-inner-type-form-button-icon"
                src="/image/bin/submit.png"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="promo-code-active">
      <NuxtLink to="/private">
        <NuxtImg
          style="height: 95px; display: flex"
          src="/image/airdrop/button.png"
        />
      </NuxtLink>
    </div>
  </section>
</template>

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

    &-error
      border-color: red

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
      position: relative

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
          margin-left: 33px
          position: relative
          color: black

        &-button
          outline: none
          background-color: var(--color-transparent)
          padding: 0.3rem
          position: absolute
          right: 0
          cursor: pointer

          &-icon
            width: 0.9rem
            height: 0.9rem
</style>
