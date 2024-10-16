
<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "~/store/userStore";

const tasksComp = toRef(useUserStore(), "tasksComp");

// Вычисляемые свойства для ширины и left
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

const value = computed(() => `${tasksComp.value?.length}0,0`);
</script>

<template>
  <div v-if="tasksComp" class="wrapper">
    <div class="title">
      Базовые задания
      <div class="value">{{ value }}</div>
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
