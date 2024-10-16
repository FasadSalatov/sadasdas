<script setup lang="ts">
import axios from "axios";
import { navigateTo, useAsyncData, useNuxtApp } from "nuxt/app";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "~/store/userStore";
import type { ITask } from "~/types/type";
import { BACK_URL, localStoagePrefix } from "~/utils/api/apiConfig";

const { $telegramInitData, $telegramOpenLink, $tonConnectUI } = useNuxtApp();
const { setTasksComp, setTasksError, setUser } = useUserStore();

const tasksComp = toRef(useUserStore(), "tasksComp");
const user = toRef(useUserStore(), "user");
const toast = useToast();

const openModalIndex = ref<number | null>(null);
const popupModalVerifyMail = ref(false);
const popupModalRegister = ref(false);
const mailInput = ref("");
const usernameInput = ref("");
const passwordInput = ref("");
const passwordAgainInput = ref("");
const registerStep = ref<"username" | "password">("username");

const id = $telegramInitData?.user?.id;

const { refresh: fetchUser } = useAsyncData("fetchUser", async () => {
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
});

const { data, refresh } = useAsyncData<ITask[]>("fetchTasks", async () => {
  const response = await axios.get(`${BACK_URL}/task/${id}`);

  setTasksComp(response.data);
  return response.data;
});

const openPopup = () => {
  popupModalVerifyMail.value = true;
};

const closePopup = () => {
  popupModalVerifyMail.value = false;
  popupModalRegister.value = false;
};

const toggleTask = (index: number) => {
  openModalIndex.value = openModalIndex.value === index ? null : index;
};

const taskStatus = computed(() => {
  if (tasksComp.value) {
    return [...tasksComp.value];
  }
  // return [...tasksComp];
});

const checkChannel = async () => {
  // Сначала обновляем данные
  await refresh();

  // Проверяем, выполнена ли задача с id = 2 (задача по подписке на канал)
  if (data.value?.some((task) => task.id == 2)) {
    return; // Если задача уже выполнена, выходим
  }

  try {
    // Пытаемся проверить подписку на сервере
    await axios.post(`${BACK_URL}/task/check-channel`, {
      user_id: id,
    });

    // Если проверка успешна, обновляем данные и выходим
    await refresh();
    await fetchUser();
  } catch (e) {
    // Если подписка не подтверждена, то открываем ссылку на Telegram-канал
    $telegramOpenLink("https://t.me/FuturumX100");

    // Сохраняем состояние в localStorage
    localStorage.setItem(`${localStoagePrefix}checkChannel`, "sended");

    // Показываем сообщение об ошибке
    toast.add({ title: "Вы не подписались на канал!" });
  }
};


const checkReg = async () => {
  // refresh();

  await refresh();
  await fetchUser();
  await setTimeout(() => {}, 1);

  if (data.value?.some((task) => task.id == 4)) return;

  popupModalRegister.value = true;

  // if (localStorage.getItem("checkChannel") !== "sended") {
  //   // $telegramOpenLink("https://futurum.city/");
  //   // localStorage.setItem("checkChannel", "sended");
  //   // return;
  // }

  // if (localStorage.getItem("checkChannel") === "sended") {
  //   try {
  //     await axios.post(`${BACK_URL}/task/done-reg`, {
  //       user_id: id,
  //     });
  //     await refresh();
  //   } catch (e) {
  //     toast.add({ title: "Вы не зарегистрировались!" });
  //   }
  // }
};

const handleRegister = async () => {
  if (registerStep.value === "username" && usernameInput.value.length < 4) {
    toast.add({ title: "Логин должен быть больше 4 символов" });
    return;
  }

  if (registerStep.value === "username" && usernameInput.value.length > 4) {
    registerStep.value = "password";

    toast.add({
      title: "Пароль должен быть больше 4 символов",
    });
    return;
  }
  if (
    registerStep.value === "password" &&
    passwordInput.value.length > 4 &&
    passwordAgainInput.value === passwordInput.value
  ) {
    try {
      await axios.post(`${BACK_URL}/task/done-reg`, {
        user_id: id,
        login: usernameInput.value,
        pass: passwordInput.value,
      });
    } catch (e) {
      toast.add({ title: "Логин уже занят" });
    }

    await refresh();
    await fetchUser();

    popupModalRegister.value = false;
    toast.add({ title: "Вы зарегистрированы!" });
    return;
  }

  if (registerStep.value === "password" && passwordInput.value.length < 4) {
    toast.add({ title: "Пароль должен быть больше 4 символов" });
    return;
  }
  if (
    registerStep.value === "password" &&
    passwordInput.value !== passwordAgainInput.value
  ) {
    toast.add({ title: "Пароли не совпадают" });
    return;
  }
};

const checkVerify = async () => {
  await refresh();
  await fetchUser();
  await setTimeout(() => {}, 1);

  if (data.value?.some((task) => task.id == 1)) return;

  if (localStorage.getItem(`${localStoagePrefix}checkVerify`) !== "sended") {
    openPopup();
    localStorage.setItem(`${localStoagePrefix}checkVerify`, "sended");
    return;
  }

  if (localStorage.getItem(`${localStoagePrefix}checkVerify`) === "sended") {
    openPopup();
    // try {
    //   // await axios.post(`${BACK_URL}/task/check-chat`, {
    //   //   user_id: id,
    //   // });
    //   refresh();
    // } catch (e) {
    //   toast.add({ title: "Вы не подтвердили свою почту!" });
    // }
  }
};
const checkChat = async () => {
  refresh();
  if (data.value?.some((task) => task.id == 3)) return;

  try {
    await axios.post(`${BACK_URL}/task/check-chat`, {
      user_id: id,
    });
    await refresh();
    await fetchUser();
  } catch (e) {
    $telegramOpenLink("https://t.me/Futurum_Community");
    toast.add({ title: "Вы не написали в чат" });
  }
};
const checkInvite = async () => {
  navigateTo("/team");
};

const submitEmail = async () => {
  if (mailInput.value.length > 0 && mailInput.value.includes("@")) {
    try {
      await axios.post(`${BACK_URL}/task/send-mail`, {
        user_id: id,
        mail: mailInput.value,
      });
      //   console.log(response.data, id, inputValue.value);

      closePopup();
      await fetchUser();
    } catch (e) {
      toast.add({ title: "Почта уже использована, проверьте еще раз" });
    }
  }
};

// const checkMountTask = async () => {
//   try {
//     const respCheckChanngel = await axios.post(
//       `${BACK_URL}/task/check-channel`,
//       {
//         user_id: id,
//       }
//     );
//     console.log(respCheckChanngel.data);
//   } catch (e) {
//     // console.log(e);
//   }

//   try {
//     const checkChat = await axios.post(`${BACK_URL}/task/check-chat`, {
//       user_id: id,
//     });
//     console.log(checkChat.data);
//   } catch (e) {
//     // console.log(e);
//   }

//   try {
//     const checkReg = await axios.post(`${BACK_URL}/task/done-reg`, {
//       user_id: id,
//     });
//     console.log(checkReg.data);
//   } catch (e) {
//     // console.log(e);
//   }

//   refresh();
// };

const connectWallet = async () => {
  try {
    const connectedWallet = await $tonConnectUI.connectWallet();

    await axios.post(`${BACK_URL}/user/update-wallet`, {
      user_id: id,
      wallet: connectedWallet.account.address,
    });

    await fetchUser();
  } catch (e) {
    toast.add({
      title: "Произошла ошибка при подключении",
    });
  }
};

const handleClickOutside = (event: TouchEvent) => {
  const target = event.target as HTMLElement;
  if (popupModalVerifyMail.value && !target.closest(".popup")) {
    popupModalVerifyMail.value = false;
  }
  if (popupModalRegister.value && !target.closest(".popup")) {
    popupModalRegister.value = false;
  }

  if (openModalIndex.value !== null && !target.closest(".tasks-item-tool")) {
    openModalIndex.value = null;
  }
};

onMounted(async () => {
  document.addEventListener("touchstart", handleClickOutside);
  const response = await axios.get(`${BACK_URL}/user/${id}`);
  setUser(response.data);
});

onBeforeUnmount(() => {
  document.removeEventListener("touchstart", handleClickOutside);
});

// onMounted(async () => {
//   // checkMountTask();
//   const response = await axios.get(`${BACK_URL}/user/${id}`);
//   setUser(response.data);
// });
</script>

<template>
  <div class="wrapper-v">
    <div class="popup" v-if="popupModalVerifyMail">
      <h4>Введите вашу почту</h4>
      <button @click="closePopup" class="close">X</button>
      <input type="text" v-model="mailInput" placeholder="Введите вашу почту" />
      <button @click="submitEmail">Отправить</button>
    </div>

    <div class="popup" v-if="popupModalRegister">
      <div class="flex">
        <h4>Регистрация</h4>
        <button @click="closePopup" class="close">X</button>
      </div>
      <input
        type="text"
        v-model="usernameInput"
        placeholder="Введите ваш логин"
        v-if="registerStep === 'username'"
      />
      <input
        type="password"
        v-model="passwordInput"
        placeholder="Введите ваш пароль"
        v-if="registerStep === 'password'"
      />
      <input
        type="password"
        v-model="passwordAgainInput"
        placeholder="Введите ваш пароль еще раз"
        v-if="registerStep === 'password'"
      />
      <button @click="handleRegister">Далее</button>
    </div>

    <div class="v-container" v-if="taskStatus">
      <div class="tasks">
        <AirdropRange />

        <!-- Task 1 -->
        <AirdropTask
          :click="checkChannel"
          :toggleTask="() => toggleTask(0)"
          modalSrc="/image/airdrop/Frame8.png"
          :showModal="openModalIndex === 0"
          :isDisabledTask="taskStatus?.some((task) => task.id == 2)"
          title="Подпишись на официальный канал"
          iconSrc="/icon/telegram-icon.svg"
        />

        <!-- Task 2 -->
        <AirdropTask
          :click="checkReg"
          :toggleTask="() => toggleTask(1)"
          modalSrc="/image/airdrop/Frame9.png"
          :showModal="openModalIndex === 1"
          :isDisabledTask="taskStatus?.some((task) => task.id == 4)"
          title="Создай логин и пароль для FUTURUM"
          iconSrc="/icon/web-icon.svg"
        />

        <!-- Task 3 -->
        <AirdropTask
          :click="checkVerify"
          :toggleTask="() => toggleTask(2)"
          modalSrc="/image/airdrop/Frame10.png"
          :showModal="openModalIndex === 2"
          :isDisabledTask="taskStatus?.some((task) => task.id == 1)"
          title="Верифицируй почту"
          iconSrc="/icon/verift-icon.svg"
        />

        <!-- Task 4 -->
        <AirdropTask
          :click="checkChat"
          :toggleTask="() => toggleTask(3)"
          modalSrc="/image/airdrop/Frame11.png"
          :showModal="openModalIndex === 3"
          :isDisabledTask="taskStatus?.some((task) => task.id == 3)"
          title="Представься в чате"
          iconSrc="/icon/verift-icon.svg"
        />
      </div>
    </div>

    <div class="v-container">
      <div class="tasks">
        <!-- Task 5 -->
        <AirdropTask
          :click="checkInvite"
          :toggleTask="() => toggleTask(4)"
          modalSrc="/image/airdrop/Frame10.png"
          :showModal="openModalIndex === 4"
          :isDisabledTask="false"
          title="Пригласи друга"
          iconSrc="/icon/friend-icon.svg"
        />

        <!-- Task 6 -->
        <AirdropTask
          :click="() => {}"
          :toggleTask="() => toggleTask(5)"
          modalSrc="/image/airdrop/Frame10.png"
          :showModal="openModalIndex === 5"
          :isDisabledTask="true"
          title="Пройди капчу"
          iconSrc="/icon/capcha-icon.svg"
        />

        <!-- Task 7 -->
        <AirdropTask
          :click="connectWallet"
          :toggleTask="() => toggleTask(6)"
          modalSrc="/image/airdrop/Frame10.png"
          :showModal="openModalIndex === 6"
          :isDisabledTask="!!user?.wallet"
          title="Подключить кошелек"
          iconSrc="/icon/wallet-icon.svg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.tasks
  position: relative
  z-index: 1
  background-color: var(--color-white-60)
  border-radius: 16px
  margin-bottom: 10px
  padding: 16px

div
  position: relative
  z-index: 1
  top: 0

  img
    width: 100%

.popup
  position: fixed
  left: 50%
  top: 37%
  transform: translate(-50%, -50%)
  z-index: 2
  border: 1px solid #1A82FF
  background-color: rgba(255, 255, 255, 0.8)
  width: 80%
  height: fit-content
  text-align: center
  border-radius: 24px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 16px
  padding: 30px 10px
  font-family: 'Montserrat', sans-serif
  color: black
  .flex
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
  h4
    color: white
    font-family: 'Montserrat', sans-serif
    font-size: 18px
    font-weight: bold
    color: black
  input
    border: 1px solid #046EB5
    border-radius: 10px
    padding: 0 10px
    font-family: 'Montserrat', sans-serif
    background: white
    color: white
    font-weight: bold
    font-size: 18px
    color: black
    width: 80%
  button
    padding: 10px 20px
    border-radius: 10px
    border: 1px solid #046EB5
    color: white
    background: #046EB5
    font-weight: bold

  .close
    color: #656565
    padding: 0 !important
    background: none !important
    border: none
    position: absolute
    right: 17px
    top: 13px

.wrapper-v
  max-height: 63vh
  overflow: scroll
</style>
