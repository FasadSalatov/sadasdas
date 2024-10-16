<template>
  <div class="popupTeam">
    <h3>Поздравляем!</h3>
    <p>
      Пройдя капчу, ты выполнил первое задание и можешь забирать свои токены Х100.
      Хочешь получить больше? Переходи в раздел "AirDrop"
    </p>
    <button @click="close">Понятно</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  close: () => void;
}>();
</script>

<style lang="sass">
.popupTeam
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  z-index: 200
  background: white
  width: 80%
  border: 1px solid #1A82FF
  background-color: rgba(255, 255, 255, 0.8)
  color: white
  display: flex
  flex-direction: column
  gap: 20px
  padding: 35px 15px
  border-radius: 12px

  h3
    color: white
    font-weight: 700
    font-size: 26px
    color: black

  p
    color: white
    font-size: 16px
    font-weight: 500
    color: black
  button
    font-size: 26px
    padding: 10px 20px
    // border: 1px solid black
    border-radius: 12px
    background: #046EB5
    color: white
    margin: 0 auto
</style>