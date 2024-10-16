<script setup lang="ts">
import axios from "axios";
import { BACK_URL } from "~/utils/api/apiConfig";
import { useUserStore } from "~~/store/userStore";
const { user, setUser } = useUserStore();
const { $telegramInitData } = useNuxtApp();

const userBalance = toRef(useUserStore(), "user");
const balance = ref(user?.balance_coin || 0);

const counterAnimation = (nextBalance: number) => {
  let startBalance = balance.value;
  // let duration = 3000;
  let interval = 100;

  const animation = () => {
    if (startBalance < nextBalance) {
      startBalance++;
      balance.value = startBalance;

      setTimeout(() => {
        requestAnimationFrame(animation);
      }, interval);
    }
  };
  animation();
};

watch(
  () => userBalance.value?.balance_coin,
  (newVal) => {
    newVal && counterAnimation(newVal);
  },
  { immediate: true }
);

try {
  const id = $telegramInitData?.user?.id;
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
  counterAnimation(response.data.balance_coin);
} catch (e) {}
</script>

<template>
  <section class="balance" id="balance">
    <div class="balance-inner v-container">
      <div class="balance-inner-container">
        <NuxtImg
          class="balance-inner-container-coin"
          src="/image/bin/coin.png"
        />
        <span class="balance-inner-container-text">{{ balance }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="sass">
.balance-inner-container-text
  display: flex
  align-items: center
  flex-direction: center

.balance
  position: relative
  z-index: 100
  background-color: var(--color-transparent)
  height: auto
  display: flex
  align-items: flex-end
  margin-bottom: 15px

  &-inner

    &-container
      padding: 0.2rem 0.35rem 0.2rem 0.35rem
      background-color: var(--color-white-60)
      border-radius: 2rem
      width: 140px
      display: flex
      margin: 0 auto

      justify-content: center
      align-items: center
      gap: 0.5rem
      border: 0.15em solid var(--color-black)

      &-coin
        width: 36px
        height: 36px
      &-text
        font-size: 32px
        font-weight: bolder
        font-family: 'Montserrat', sans-serif
        color: var(--color-white)
        margin-bottom: -3px
        text-shadow: 2px 2px 0 var(--color-black), -2px -2px 0 var(--color-black), 2px -2px 0 var(--color-black), -2px 2px 0 var(--color-black)
</style>
