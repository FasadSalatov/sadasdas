<template>
  <div class="main">
    <div v-if="isDesktop" class="qr-centered">
      <p>Please launch the application from a mobile device</p>
      <QRCode :value="dynamicLink" :size="250" />
    </div>
    <div v-else>
      <Preloader v-show="loading" @loadingComplete="handleLoadingComplete" />
      <NuxtLayout v-if="!loading && isAuth">
        <NuxtPage />
      </NuxtLayout>
    </div>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useNuxtApp } from "nuxt/app";
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/userStore";
import { BACK_URL } from "./utils/api/apiConfig";
import QRCode from '@chenfengyuan/vue-qrcode'; // Импорт компонента для генерации QR-кода

const loading = ref(true);
const isAuth = ref(false);
const isDesktop = ref(false);
const dynamicLink = ref('https://example.com/qr-code-url'); // Динамическая ссылка для QR-кода

const { $telegramInitData } = useNuxtApp();
const { setUser } = useUserStore();
const user = toRef(useUserStore(), "user");

function handleLoadingComplete() {
  loading.value = false;
}

function checkPlatform() {
  const userAgent = navigator.userAgent;
  isDesktop.value = /Windows|Macintosh/i.test(userAgent) && !/Android|iPhone|iPad|iPod/i.test(userAgent);
}

onMounted(async () => {
  checkPlatform();

  if (isDesktop.value) {
    loading.value = false;
    return;
  }

  try {
    const id = $telegramInitData?.user?.id;
    if (!id) {
      isAuth.value = false;
    }

    const response = await axios.get(`${BACK_URL}/user/${id}`);
    setUser(response.data);

    isAuth.value = true;
  } catch (error) {
    console.log(error);

    loading.value = true;
    isAuth.value = false;
  }
});
</script>

<style scoped>
.main {
  text-align: center;
}
.qr-centered {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.qr-centered p {
  font-size: 26px;
  margin-bottom: 20px;
  color: white;
}

.qr-centered img {
  width: 90%;
  height: 90%;
}
</style>
