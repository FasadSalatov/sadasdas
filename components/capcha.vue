<template>
  <div id="app">
    <TeamPopup v-show="modal" :close="onClosePopup" />
    <h3>Введите капчу перед использованием приложения</h3>
    <div class="np-captcha-container">
      <div class="np-captcha" v-if="captcha && captcha.length">
        <div
          v-for="(c, i) in captcha"
          :key="i"
          :style="captchaStyles[i]"
          class="np-captcha-character"
        >
          {{ c }}
        </div>

        <input type="text" class="input" v-model="input" />
        <button @click="checkCaptcha">Проверить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/userStore";
import { BACK_URL, localStoagePrefix } from "~/utils/api/apiConfig";
const { $telegramInitData } = useNuxtApp();

const { setIsCapcha, setUser } = useUserStore();

const { refresh: fetchUser } = useAsyncData("fetchUser", async () => {
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
});
const captchaLength = 5;
const captcha = ref([]);
const input = ref("");
const isCaptchaSolved = ref(
  localStorage.getItem(`${localStoagePrefix}capchaSolved`) === "true"
);
const captchaStyles = ref([]);
const modal = ref(false);

const id = $telegramInitData?.user?.id;

const createCaptcha = () => {
  let tempCaptcha = "";
  for (let i = 0; i < captchaLength; i++) {
    tempCaptcha += getRandomCharacter();
  }
  captcha.value = tempCaptcha.split("");
  captchaStyles.value = captcha.value.map(() => ({
    fontSize: getFontSize() + "px",
    fontWeight: 800,
    transform: "rotate(" + getRotationAngle() + "deg)",
  }));
};

const getRandomCharacter = () => {
  const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomNumber = Math.floor(Math.random() * symbols.length);
  return symbols[randomNumber];
};

const getFontSize = () => {
  const fontVariations = [14, 20, 30, 36, 40];
  return fontVariations[Math.floor(Math.random() * fontVariations.length)];
};

const getRotationAngle = () => {
  const rotationVariations = [5, 10, 20, 25, -5, -10, -20, -25];
  return rotationVariations[
    Math.floor(Math.random() * rotationVariations.length)
  ];
};

const checkCaptcha = async () => {
  if (
    input.value.toLocaleLowerCase() ===
    captcha.value.join("").toLocaleLowerCase()
  ) {
    try {
      await axios.post(`${BACK_URL}/task/captcha`, {
        user_id: id,
      });
    } catch (e) {}
    localStorage.setItem(`${localStoagePrefix}capchaSolved`, "true");
    isCaptchaSolved.value = true;
    modal.value = true;
    fetchUser();
    // navigateTo("/airdrop");
  } else {
    createCaptcha();
  }
};

const onClosePopup = () => {
  setIsCapcha(true);
};

onMounted(() => {
  createCaptcha();
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  position: absolute;
  z-index: 100;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(255, 255, 255, 0.6);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#app h3 {
  font-size: 18px;
  font-weight: 700;
  padding: 0 24px;
  font-family: "Montserrat", sans-serif;
}
.np-captcha-container {
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.np-captcha {
  font-size: 24px;
}
.np-button {
  padding: 6px 10px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 16px;
}
.np-captcha-character {
  display: inline-block;
  letter-spacing: 14px;
}
.input {
  padding: 5px 10px;
  font-size: 16px;
  background: white;
  border-radius: 6px;
}
#app button {
  font-size: 26px;
  padding: 10px 20px;
  border-radius: 12px;
  background: #046eb5;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
