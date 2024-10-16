<script setup lang="ts">
import axios from "axios";
import { useAsyncData, useNuxtApp } from "nuxt/app";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useUserStore } from "~/store/userStore";

import type { TPriveRefferal } from "~/types/type";
import { BACK_URL, BOT_URL } from "~/utils/api/apiConfig";

const { $telegramInitData, $telegramShareURL, $telegramOpenLink } =
  useNuxtApp();

const id = $telegramInitData?.user?.id;

const refUrl = ref(`${BOT_URL}?start=${id}`);
const user = toRef(useUserStore(), "user");
const openUsers = ref<string[]>([]);

const openUserHandle = (id: string) => {
  openUsers.value.push(id);
};
const removeUserHandle = (id: string) => {
  openUsers.value = openUsers.value.filter((item) => item !== id);
};

function clickUserHandle(id: string) {
  if (openUsers.value.includes(id)) {
    removeUserHandle(id);
  } else {
    openUserHandle(id);
  }
}

const onClickCopy = () => {
  navigator.clipboard.writeText(refUrl.value);
};

const onClickShare = () => {
  $telegramShareURL(refUrl.value, "Вступай!");
};

const onClickCommunity = () => {
  $telegramOpenLink("https://t.me/+RN6WrX8WNOswYWMy");
};

const { data } = useAsyncData<TPriveRefferal[] | []>("privateRef", async () => {
  const response = await axios.get(`${BACK_URL}/privat/referrals/${id}`);
  return response.data;
});

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

const clickRefLink = (username: string) => {
  $telegramOpenLink(`https://t.me/${username}`);
};
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

    <div>
      <div class="v-container">
        <div class="frie">
          <p
            style="
              text-align: left;
              width: 100%;
              color: white;
              font-family: Montserrat, sans-serif;
              font-size: 20px;
              font-weight: 700;
              margin-bottom: 10px;
            "
          >
            Пригласи друзей и получи проценты от его дохода
          </p>

          <div class="income-item" v-if="user">
            <NuxtImg
              style="width: 100%"
              src="/image/airdrop/x100.png"
              class="imgin"
            />
            <span
              ><strong>{{ user.balance_coin }}</strong
              >Доход от Airdrop</span
            >

            <button>Вывести</button>
          </div>
          <div class="income-item">
            <NuxtImg
              style="width: 100%"
              src="/image/bin/ton.svg"
              class="imgin"
            />
            <span><strong>0</strong>Кэшбек от FUTURUM</span>

            <button>Вывести</button>
          </div>
        </div>
      </div>
      <div class="v-container">
        <div class="frie2">
          <p
            style="
              width: 100%;
              font-family: Montserrat, sans-serif;
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 10px;
              color: white;
            "
          >
            Ваша реферальная ссылка
          </p>
          <div class="d-flex">
            <button class="button button-copy" @click="onClickCopy">
              {{ refUrl }} <NuxtImg class="img" src="/icon/icon-copy.svg" />
            </button>
            <button class="button" @click="onClickShare">
              Пригласить друзей
              <NuxtImg class="img" src="/icon/icon-export.svg" />
            </button>
          </div>
        </div>
        <div class="frie3">
          <div v-for="refferal in data" :key="refferal.name">
            <!-- <a :href="'t.me/' + refferal.username"> -->
            <div class="income-item3">
              <div
                class="income-item3-inner"
                @click="clickRefLink(refferal.username)"
              >
                <NuxtImg
                  style="width: 100%; border-radius: 100%"
                  :src="refferal.photo"
                  class="imgin"
                />
                <span
                  ><strong>{{ refferal.name }}</strong></span
                >
                <button>+10,0</button>
              </div>
              <div
                class="more-ref"
                :class="{
                  'more-ref-active':
                    openUsers && openUsers.includes(refferal.id),
                }"
                @click="clickUserHandle(refferal.id)"
              ></div>
            </div>

            <div
              class="no-ref"
              v-if="
                openUsers.includes(refferal.id) && refferal.friend.length < 1
              "
            >
              Нет рефералов
            </div>
            <div
              v-show="
                openUsers &&
                refferal.friend.length > 0 &&
                openUsers.includes(refferal.id)
              "
              v-for="friend in refferal.friend"
              :key="friend.id"
              class="income-item3 income-item3-refferal"
              @click="clickRefLink(friend.username)"
            >
              <!-- <a :href="'t.me/' + friend.username"> -->
              <NuxtImg
                style="width: 100%; border-radius: 100%"
                :src="friend.photo"
                class="imgin"
              />
              <span
                ><strong>{{ friend.name }}</strong></span
              >
              <button>+2,0</button>
              <!-- </a> -->
            </div>
            <!-- </a> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <PrivatePromoCode /> -->
    <CommonNavBarPrivat />
  </div>
</template>

<style scoped lang="sass">
.copybtn2
  display: flex
  justify-content: center
  gap: 15px
  align-items: center
  background: rgb(4 110 181)

  border: 1px solid #FFFFFF
  border-radius: 40px
  width: 95% !important
  justify-self: center

.income-item3
  display: flex
  width: 100%
  flex-direction: row
  align-items: center
  margin-top: 10px
  align-content: center
  color: white
  gap: 20px
  padding-bottom: 5px
  border-bottom: 1px solid white
  &-inner
    display: flex
    width: 100%
    gap: 20px
    align-items: center

  &-refferal
    padding-left: 30px

  span
    display: flex
    flex-direction: column
    color: white
  button
    background: rgba(3, 110, 180, 1)
    border-radius: 50px
    width: 25%
    height: 35px
    font-family: 'Montserrat'
    font-style: normal
    font-weight: 700
    font-size: 12px
    line-height: 15px
    color: white
    margin-left: auto

.income-item2
  display: flex
  width: 100%
  flex-direction: column
  justify-content: space-between
  margin-top: 10px
  align-content: center
  color: white
  gap: 6px
  span
    display: flex
    flex-direction: column
    color: white

  button
    background: rgba(3, 110, 180, 1)
    border-radius: 50px
    width: 25%
    height: 35px
    font-family: 'Montserrat'
    font-style: normal
    font-weight: 700
    font-size: 12px
    line-height: 15px
    color: white
.imgin
  width: 50px !important
  height: 50px
  color: white

.income-item
  opacity: 0.6
  display: flex
  width: 100%
  flex-direction: row
  // justify-content: space-between
  margin-top: 10px
  align-items: center
  color: white
  gap: 10px
  span
    display: flex
    flex-direction: column
    color: white

  button
    background: rgba(3, 110, 180, 1)
    border-radius: 50px
    width: 25%
    height: 35px
    font-family: 'Montserrat'
    font-style: normal
    font-weight: 700
    font-size: 12px
    line-height: 15px
    color: white
    margin-left: auto

.copybtn

  display: flex
  justify-content: space-around
  align-items: center
  background: rgb(4 110 181)

  border: 1px solid #FFFFFF
  border-radius: 40px
  width: 95% !important
  justify-self: center

.frie2
  position: relative
  z-index: 1
  background: rgba(2, 8, 23, 0.8)

  border-radius: 16px
  margin-bottom: 10px
  padding: 16px

  &-child
    position: relative

    .modal
      position: absolute
      bottom: 42px
      right: -24px
.frie3
  position: relative
  z-index: 2
  background: rgba(2, 8, 23, 0.8)

  border-radius: 16px
  margin-bottom: 10px
  padding: 16px
  overflow-y: auto
  margin-bottom: 169px
  .no-ref
    text-align: center
    padding: 20px 0
  &-child
    position: relative

    .modal
      position: absolute
      bottom: 42px
      right: -24px

.frie
  position: relative
  z-index: 1
  background: rgba(2, 8, 23, 0.8)

  border-radius: 16px
  margin-bottom: 10px
  padding: 16px

  &-child
    position: relative

    .modal
      position: absolute
      bottom: 42px
      right: -24px
.navbar-inner-button
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.button
  width: 100%
  background-color: var(--color-blue)
  padding: 14px 16px
  border-radius: 50px
  color: var(--color-white)
  font-size: 14px
  font-family: 'Montserrat'
  font-weight: bold
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  gap: 10px

  &-copy
    background-color: var(--color-dark-blue)
    border: 1px solid var(--color-white)
    text-align: left
    display: flex
    align-items: center
    justify-content: space-between
.d-flex
  display: flex
  flex-direction: column
  gap: 10px

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

.more-ref
  width: 0
  height: 0
  border-left: 10px solid transparent
  border-right: 10px solid transparent
  border-bottom: 10px solid var(--color-blue)
  transform: rotate(-90deg)
  transition: all 0.3s
  &-active
    transform: rotate(-180deg)
</style>
