<script setup lang="ts">
import axios from "axios";
import { computed, ref, toRef, watch } from "vue";
import { BACK_URL } from "~/utils/api/apiConfig";
import { useUserStore } from "~/store/userStore";
const { user, setUser } = useUserStore();
const { $telegramInitData } = useNuxtApp();
const tasksComp = toRef(useUserStore(), "tasksComp");

const userBalance = toRef(useUserStore(), "user");
const balance = ref(user?.balance_coin || 0);

const counterAnimation = (nextBalance: number) => {
  let startBalance = balance.value;
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

const width = computed(() => {
  if (!tasksComp.value) {
    return "0%";
  }

  const maxTasks = 5; // Максимальное количество заданий
  return Math.min(tasksComp.value.length, maxTasks) * 20 + "%"; // Умножаем на 20% для каждого задания
});

const left = computed(() => {
  if (!tasksComp.value) {
    return "0%";
  }
  const maxTasks = 5; // Максимальное количество заданий
  return Math.min(tasksComp.value.length, maxTasks) * 20 + "%"; // Умножаем на 20% для каждого задания
});

try {
  const id = $telegramInitData?.user?.id;
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
  counterAnimation(response.data.balance_coin);
} catch (e) {
  console.error(e);
}
</script>

<template>
  <div v-if="tasksComp" class="wrapper">
    <div class="title">
      Базовые задания
      <div class="value">{{ balance }}</div>
    </div>

    <div class="range">
      <div class="gradient" :style="{ width }"></div>
      <div class="coin" :style="{ left }">
        <NuxtImg src="/image/bin/coin.png" width="28" height="28" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.wrapper
  margin-bottom: 20px
.title
  display: flex
  align-items: center
  justify-content: space-between
  font-family: 'Montserrat', sans-serif
  font-size: 14px
  font-weight: 500
  color: black
  margin-bottom: 10px
.value
  font-size: 16px
  font-weight: bold
  color: white
  background-color: #046EB5
  padding: 4px 8px
  width: fit-content
  border-radius: 30px
  font-family: 'Montserrat', sans-serif
.range
  width: 100%
  height: 6px
  background-color: #020817
  border-radius: 40px
  position: relative
.gradient
  height: 100%
  background: linear-gradient(90deg, #0098F1 0%, #2DEDD7 100%)
  position: absolute
  left: 0
  top: 0
  z-index: 2
  border-radius: 40px
.coin
  position: absolute
  z-index: 3
  top: 50%
  transform: translateY(-50%) translateX(-50%)
</style>
