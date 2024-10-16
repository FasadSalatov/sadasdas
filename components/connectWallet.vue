<template>
  <div class="wrapper-ton">
    <div class="v-container">
      <button @click="connectToWallet">Подключите ваш кошелек</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useNuxtApp } from "nuxt/app";
import { useUserStore } from "~/store/userStore";
import { BACK_URL } from "~/utils/api/apiConfig";

const { user, setUser } = useUserStore();
const { $tonConnectUI, $telegramInitData } = useNuxtApp();

const toast = useToast();
const id = $telegramInitData?.user?.id;

async function connectToWallet() {
  try {
    const connectedWallet = await $tonConnectUI.connectWallet();

    await axios.post(`${BACK_URL}/user/update-wallet`, {
      user_id: id,
      wallet: connectedWallet.account.address,
    });

    const response = await axios.get(`${BACK_URL}/user/${id}`);
    setUser(response.data);
  } catch (e) {
    toast.add({
      title: "Произошла ошибка при подключении",
    });
  }
}
</script>

<style lang="sass">
.wrapper-ton
    text-align: center
    color: #000000
    position: absolute
    z-index: 20
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    background: rgba(255, 255, 255, 0.6)
    height: 100vh
    width: 100vw
    display: flex
    flex-direction: column
    justify-content: center
    button
        background-color: #046EB5
        color: #fff
        padding: 10px 20px
        border-radius: 5px
</style>