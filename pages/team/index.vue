<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { BACK_URL, BOT_URL, localStoagePrefix } from "~/utils/api/apiConfig";

import { useNuxtApp } from "nuxt/app";
import { useUserStore } from "~/store/userStore";

const { setRefferals, setUser } = useUserStore();

const refferals = toRef(useUserStore(), "refferals");
const modal = ref(false);

const { $telegramInitData, $telegramShareURL, $telegramOpenLink } =
  useNuxtApp();

const id = $telegramInitData?.user?.id;

const refUrl = ref(`${BOT_URL}?start=${id}`);

const onClickCopy = () => {
  navigator.clipboard.writeText(refUrl.value);
};

const onClickShare = () => {
  $telegramShareURL(refUrl.value);
};

const { refresh: fetchUser } = useAsyncData("fetchUser", async () => {
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
});

const sendDataOnMount = async () => {
  try {
    const reponse = await axios.get(
      `${BACK_URL}/user/referrals/${$telegramInitData?.user?.id}`
    );
    setRefferals(reponse.data);
  } catch (e) {
    console.log(e);
  }
};
const onClickClaim = async (id: string) => {
  try {
    await axios.post(`${BACK_URL}/user/claim-ref`, {
      user_id: $telegramInitData?.user?.id,
      referral_id: id,
    });

    const reponse = await axios.get(
      `${BACK_URL}/user/referrals/${$telegramInitData?.user?.id}`
    );
    setRefferals(reponse.data);
    fetchUser();
  } catch (e) {
    console.log(e);
  }
};
const onClosePopup = () => {
  modal.value = true;
  localStorage.setItem(`${localStoagePrefix}reffModal`, "true");
};

const clickRefferal = (username: string) => {
  $telegramOpenLink(`https://t.me/${username}`);
};

onMounted(() => {
  sendDataOnMount();
  modal.value = !!localStorage.getItem(`${localStoagePrefix}reffModal`);
});
</script>

<template>
  <div>
    <CommonBackButton />
    <CommonHeader />
    <CommonBalance />
    <CommonBackgroundImage image-url="image/airdrop/bg.png" />
    <!--    <TeamPopup v-show="!modal" :close="onClosePopup" />-->
    <div class="v-container">
      <div class="tasks">
        <p
          style="
            width: 100%;
            font-family: Montserrat, sans-serif;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
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
    </div>
    <div class="v-container">
      <div class="tasks">
        <p
          style="
            text-align: center;
            width: 100%;
            font-family: Montserrat, sans-serif;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
          "
          v-show="refferals?.length == 0"
        >
          Пока нет друзей.
        </p>

        <div
          v-for="refferal in refferals"
          :key="refferal.user_id"
          class="tasks-item"
          :class="{ 'tasks-item-active': refferal.is_claim }"
        >
          <!-- <a :href="'t.me/' + refferal.username"> -->
          <div
            @click="clickRefferal(refferal.username)"
            class="tasks-item-inner"
          >
            <NuxtImg :src="refferal.photo_url" class="tasks-item-img" />
            <span class="tasks-item-name">{{ refferal.name }}</span>

            <div
              v-if="refferal.claim_coin === null"
              class="tasks-item-coin tasks-item-coin-disabled"
            >
              0
            </div>

            <div class="tasks-item-coin" v-if="refferal.claim_coin >= 1">
              +{{ refferal.claim_coin }}
            </div>
          </div>
          <button
            class="tasks-item-button"
            @click="onClickClaim(refferal.user_id)"
            v-show="refferal.is_claim"
          >
            Собрать
          </button>
          <!-- </a> -->
        </div>
      </div>
    </div>
    <CommonNavBar />
  </div>
</template>

<style scoped lang="sass">
.tasks-item-coin

  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  font-size: 16px
  line-height: 20px

.tasks
  position: relative
  z-index: 1
  background-color: var(--color-white-60)
  border-radius: 16px
  margin-bottom: 10px
  padding: 16px

  &-item
    display: flex
    width: 100%
    flex-direction: row
        // justify-content: space-between
    align-items: center
    padding-bottom: 10px
    border-bottom: 1px solid #0208171F
    max-height: 330px
    overflow: scroll
    &-inner
      display: flex
      width: 100%
      align-items: center
    &-active
      button
        position: relative
        z-index: 2
      .tasks-item-coin
        width: 60px
        position: relative
        z-index: 1
        left: 18px
    &-name
      color: #181D1E
      font-size: 14px
      font-weight: bold
      margin-left: 15px
    &-img
      width: 45px
      height: 45px
      border-radius: 100%
    &-coin
      margin-left: auto
      background: #19BBBB
      color: #ffffff
      padding: 5px 10px
      border-radius: 8px
      font-size: 16px
      font-weight: bold
      &-disabled
        background: #B1B7C4
    &-button
      font-size: 16px
      font-weight: bold
      padding: 6px 12px
      border-radius: 30px
      background: var(--color-blue)
      color: #ffffff

    &-child
      position: relative

      .modal
        position: absolute
        bottom: 42px
        right: -24px
.img
  width: 25px
.button
  width: 100%
  background-color: var(--color-blue)
  padding: 14px 16px
  border-radius: 50px
  display: flex
  justify-content: space-evenly
  align-items: center
  color: var(--color-white)
  font-size: 14px
  font-family: 'Montserrat'
  font-weight: bold
  cursor: pointer

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
</style>
