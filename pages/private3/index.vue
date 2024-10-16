<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
const { $telegramInitData, $telegramShareURL, $telegramOpenLink } =
  useNuxtApp();
// Массив с URL изображений для переключения
const backgrounds = [
  "image/airdrop/mc1.jpg",
  "image/airdrop/mc2.jpg",
  "image/airdrop/mc3.jpg",
];
const currentBackgroundIndex = ref(0);
let intervalId: any | undefined;
const id = $telegramInitData?.user?.username;
// Функция для переключения изображений
function switchBackground() {
  currentBackgroundIndex.value =
    (currentBackgroundIndex.value + 1) % backgrounds.length;
}

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
          <svg
            width="329"
            height="34"
            viewBox="0 0 329 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.6643 11.3903C18.5979 11.26 21.2689 9.85194 22.4247 8.24648C23.9853 6.07853 24.1002 4.08789 23.9522 1C23.0336 1.44107 21.4002 3.54389 17.3583 3.56681L0 3.59736L0.0298548 11.4566C1.28171 11.6046 16.3478 11.5258 16.6639 11.3903H16.6643ZM15.9772 12.8437C15.837 12.6568 16.1069 12.6966 15.5266 12.6833L0.000817941 12.7215L0.0159498 20.555C0.838798 20.6809 8.489 20.6093 8.92578 20.4501C10.7903 20.2145 13.2429 18.8104 13.9185 17.9995C14.5099 17.2898 14.9209 16.7736 15.3683 15.7463C15.7478 14.875 15.9756 13.8791 15.9772 12.8437ZM0.764365 26.0099C0.855975 28.0998 2.70575 29.7463 4.94527 29.6655C7.08214 29.5883 8.8632 27.7681 8.73479 25.5467C8.61169 23.421 6.78645 21.6699 4.48027 21.8284C2.30864 21.9775 0.664986 23.7318 0.764774 26.0095L0.764365 26.0099Z"
              fill="white"
            />
            <path
              d="M42.1493 18.5702H34.9493V25.8342C33.0293 25.8342 31.0773 25.8342 29.1253 25.8342V3.43423C33.7013 3.43423 38.5013 3.43423 43.0773 3.43423C43.0773 5.32223 43.0773 6.63423 43.0773 8.55423H34.9493V13.4502H42.1493C42.1493 15.3702 42.1493 16.5862 42.1493 18.5702ZM56.1723 21.0022C57.8363 21.0022 59.5643 20.1062 59.5643 18.2822V3.43423C61.3883 3.43423 63.2443 3.43423 65.0363 3.43423V18.3782C65.0363 23.3062 60.7803 26.1542 56.1723 26.1542C51.5963 26.1542 47.2763 23.3062 47.2763 18.3782V3.43423C49.0683 3.43423 50.9563 3.43423 52.7483 3.43423V18.2822C52.7483 20.1062 54.5083 21.0022 56.1723 21.0022ZM73.8901 8.55423H68.3861C68.3861 6.82623 68.3861 5.13023 68.3861 3.43423H85.0261C85.0261 5.13023 85.0261 6.82623 85.0261 8.55423H79.5541V25.8342C77.6661 25.8342 75.7781 25.8342 73.8901 25.8342V8.55423ZM97.2348 21.0022C98.8988 21.0022 100.627 20.1062 100.627 18.2822V3.43423C102.451 3.43423 104.307 3.43423 106.099 3.43423V18.3782C106.099 23.3062 101.843 26.1542 97.2348 26.1542C92.6588 26.1542 88.3388 23.3062 88.3388 18.3782V3.43423C90.1308 3.43423 92.0188 3.43423 93.8108 3.43423V18.2822C93.8108 20.1062 95.5708 21.0022 97.2348 21.0022ZM126.185 17.8982L130.569 25.0022V25.8342H124.169L120.329 19.2422H117.353V25.8342C115.433 25.8342 113.481 25.8342 111.625 25.8342C111.625 18.3782 111.625 10.9222 111.625 3.43423C114.857 3.43423 118.185 3.43423 121.449 3.43423C130.249 3.46623 131.849 14.0582 126.185 17.8982ZM121.449 14.1542C124.553 14.1542 124.713 8.58623 121.449 8.55423C120.105 8.52223 118.697 8.55423 117.353 8.55423C117.353 10.3782 117.353 12.3622 117.353 14.1542H121.449ZM142.704 21.0022C144.368 21.0022 146.096 20.1062 146.096 18.2822V3.43423C147.92 3.43423 149.776 3.43423 151.568 3.43423V18.3782C151.568 23.3062 147.312 26.1542 142.704 26.1542C138.128 26.1542 133.808 23.3062 133.808 18.3782V3.43423C135.6 3.43423 137.488 3.43423 139.28 3.43423V18.2822C139.28 20.1062 141.04 21.0022 142.704 21.0022ZM167.973 13.0982L176.901 3.37023H178.949V25.8342C176.997 25.8342 175.045 25.8342 173.093 25.8342V15.8502L168.325 20.8422H167.685L162.949 15.8502V25.8342C160.997 25.8342 159.045 25.8342 157.093 25.8342V3.37023H159.205L167.973 13.0982ZM199.197 25.8342C197.277 25.8342 195.357 25.8342 193.469 25.8342C193.469 18.3782 193.469 10.9222 193.469 3.43423C196.701 3.43423 200.029 3.43423 203.325 3.43423C214.045 3.46623 214.045 20.1062 203.325 20.1062H199.197V25.8342ZM203.293 14.9542C206.429 14.9542 206.621 8.58623 203.293 8.55423C201.949 8.52223 200.509 8.55423 199.197 8.55423C199.197 10.3782 199.197 13.1302 199.197 14.9542H203.293ZM230.216 17.8982L234.6 25.0022V25.8342H228.2L224.36 19.2422H221.384V25.8342C219.464 25.8342 217.512 25.8342 215.656 25.8342C215.656 18.3782 215.656 10.9222 215.656 3.43423C218.888 3.43423 222.216 3.43423 225.48 3.43423C234.28 3.46623 235.88 14.0582 230.216 17.8982ZM225.48 14.1542C228.584 14.1542 228.744 8.58623 225.48 8.55423C224.136 8.52223 222.728 8.55423 221.384 8.55423C221.384 10.3782 221.384 12.3622 221.384 14.1542H225.48ZM244.719 20.8102H247.567V25.8342H236.207V20.8102H239.055V8.42623H236.431V3.43423H247.343V8.42623H244.719V20.8102ZM255.167 3.43423L260.415 16.1062H260.575L265.695 3.43423H271.199V4.29823L261.695 26.0902H259.263L249.663 4.29823V3.43423H255.167ZM286.74 25.8342L285.428 23.0182H276.596L275.284 25.8342H269.684V25.0022L279.764 3.14623H282.228L292.34 25.0022V25.8342H286.74ZM283.572 18.1222L280.98 12.2342L278.452 18.1222H283.572ZM297.078 8.55423H291.574C291.574 6.82623 291.574 5.13023 291.574 3.43423H308.214C308.214 5.13023 308.214 6.82623 308.214 8.55423H302.742V25.8342C300.854 25.8342 298.966 25.8342 297.078 25.8342V8.55423ZM325.734 3.43423C325.734 5.09823 325.734 6.82623 325.734 8.55423C322.406 8.55423 320.742 8.55423 317.446 8.55423V11.7222H325.062C325.062 13.4182 325.062 15.1142 325.062 16.8102H317.446C317.446 18.1222 317.446 19.4022 317.446 20.7462C320.742 20.7462 322.662 20.7462 326.022 20.7462C326.022 22.4102 326.022 24.1382 326.022 25.8342C320.774 25.8342 316.934 25.8342 311.75 25.8342C311.75 18.3462 311.75 10.8582 311.75 3.43423C316.934 3.43423 320.486 3.43423 325.734 3.43423Z"
              fill="white"
            />
          </svg>
        </p>
        <p
          style="
            text-align: left;
            width: 100%;
            color: white;
            font-family: Montserrat, sans-serif;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 10px;
          "
        >
          Привет, ! Если ты читаешь этот текст, значит, ты избранный и тебе
          доступны особые условия!
          <br /><br />
          1. Двухуровневая реферальная система, предназначенная для получения
          дополнительных токенов от рефералов: аккаунты, которые приглашены
          тобой напрямую, приносят тебе 10 токенов, а аккаунты, которые приходят
          по рекомендации твоих подписчиков, приносят дополнительные 2 токена с
          каждого аккаунта.
          <br />
          <br />
          2. Пассивный доход от активности рефералов на цифровом маркетплейсе: в
          процессе выполнения заданий рефералами, они регистрируются на
          платформе FUTURUM и указывают свои криптокошельки. На основании этих
          данных ты будешь получать процент от комиссии платформы со всех сделок
          твоих партнёров ПОЖИЗНЕННО! Комиссия платформы FUTURUM от всех
          финансовых операций составляет от 1 до 8% от суммы операции. ✅ Если
          твой реферал купил актив, ты зарабатываешь 25% от суммы комиссии
          платформы. ✅ Если твой реферал выложил актив на продажу и продал его,
          ты также зарабатываешь 25% от суммы комиссии платформы. <br /><br />
          ❗️И всё это происходит пожизненно до тех пор, пока твой реферал
          пользуется указанным в профиле кошельком и своим Telegram-аккаунтом. А
          весь заработок от рефералов будет прозрачно отображаться в разделе
          "Команда" на двух балансах: 1. Баланс в токенах Х100 — доход от
          AirDrop 2. Баланс в USDT — доход от платформы FUTURUM
          <br /><br />
          Приглашай друзей и зарабатывай вместе с FUTURUM<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
              />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>Document</title>
            </head>
            <body></body>
          </html>
        </p>
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
  justify-content: space-between
  align-items: center
  margin-top: 10px
  align-content: center
  color: white
  gap: 6px
  padding-bottom: 5px
  border-bottom: 1px solid white
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
  margin-right: -70px
  height: 50px
  color: white
.income-item
  display: flex
  width: 100%
  flex-direction: row
  justify-content: space-between
  margin-top: 10px
  align-content: center
  color: white
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
  position: absolute
  left: 15px
  right: 15px
  top: 35vh
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
  position: absolute
  left: 15px
  right: 15px
  top: 52vh
  z-index: 1
  background: rgba(2, 8, 23, 0.8)

  border-radius: 16px
  margin-bottom: 10px
  padding: 16px
  height: 25vh
  overflow-y: auto
  &-child
    position: relative

    .modal
      position: absolute
      bottom: 42px
      right: -24px

.frie
  position: absolute
  left: 15px
  right: 15px
  top: 10vh
  z-index: 1
  background: rgba(2, 8, 23, 0.8)
  height: 70vh
  overflow-y: auto
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
</style>
