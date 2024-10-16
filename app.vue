<template>
  <div class="main">
    <Preloader v-show="loading" @loadingComplete="handleLoadingComplete" />
    <NuxtLayout v-if="!loading && isAuth">
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useNuxtApp } from "nuxt/app";
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/userStore";
import { BACK_URL } from "./utils/api/apiConfig";

const loading = ref(true);
const isAuth = ref(false);
const { $telegramInitData } = useNuxtApp();

const { setUser } = useUserStore();
const user = toRef(useUserStore(), "user");

function handleLoadingComplete() {
  loading.value = false;
}

onMounted(async () => {
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
    // setUser(null);
  }
});
</script>
