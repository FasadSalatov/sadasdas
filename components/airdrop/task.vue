<template>
  <div
    :class="[
      'tasks-child',
      {
        'tasks-child-disabled': isDisabledTask,
      },
    ]"
  >
    <NuxtImg class="modal" :src="modalSrc" v-show="showModal" />
    <div class="tasks-item">
      <div class="tasks-item-icon">
        <NuxtImg :src="iconSrc" />
      </div>
      <div class="tasks-item-container">
        <div class="tasks-item-title">
          <span>{{ title }}</span>
          <span class="tasks-item-tool" @click="toggleTask(1)">
            <NuxtImg
              src="/icon/question-icon.svg"
              width="8"
              height="8"
              class="img"
            />
          </span>
        </div>
        <button @click="click">
          <NuxtImg
            class="img"
            :src="
              isDisabledTask
                ? '/icon/check-task.svg'
                : '/icon/champion-icon.svg'
            "
            width="14"
            height="14"
          />
          {{ !isDisabledTask ? "Выполнить" : "Выполнено" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  click: (() => Promise<void>) | (() => void);
  toggleTask: (index: number) => void;
  modalSrc: string;
  showModal: boolean;
  isDisabledTask: boolean | undefined;
  title: string;
  iconSrc: string;
}>();
</script>

<style lang="sass">
.tasks
  &-child
    position: relative

    .modal
      position: absolute
      bottom: 42px
      right: -22px
      pointer-events: none
      width: 280px
    &-disabled
      pointer-events: none
      .tasks-item-title
        text-decoration: line-through
        text-decoration-color: black
        text-decoration-thickness: 2px

      .tasks-item-icon
        background-color: #19BBBB

      button
        background: #19BBBB !important
  &-item
    display: flex
    width: 100%
    flex-direction: row
    align-items: center
    padding-bottom: 10px
    &-icon
      width: 45px
      height: 45px
      display: flex
      align-items: center
      justify-content: center
      background: #046EB5
      padding: 10px
      border-radius: 12px
      img
        width: 100%

    &-container
      display: flex
      gap: 5px
      flex-direction: column
      width: 100%
      margin-left: 16px
      
    &-title
      display: flex
      flex-direction: row
      justify-content: space-between
      span
        font-size: 14px
        color: #020817
        font-weight: bold

    &-tool
      position: relative
      width: 16px
      height: 16px
      background: #046EB5
      border-radius: 100%
      display: flex
      align-items: center
      justify-content: center
      pointer-events: all
      z-index: 999
      img
        width: 8px
        height: 8px

    button
      background: #1A82FF
      color: white
      font-size: 12px
      font-weight: bold
      display: flex
      width: fit-content
      gap: 8px
      border-radius: 20px
      padding: 6.5px 10px
</style>