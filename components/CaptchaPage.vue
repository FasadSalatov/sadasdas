<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['captchaPassed']);

const captchaInput = ref('');
const errorMessage = ref('');

function onSubmit() {
	if (captchaInput.value === 'ASXDR') {
		handleCaptchaSuccess();
	} else {
		handleCaptchaError('Неверный ввод капчи. Попробуйте снова.');
	}
}

function handleCaptchaSuccess() {
	console.log('Капча пройдена успешно.');
	emit('captchaPassed');
}

function handleCaptchaError(error: string) {
	errorMessage.value = error;
}
</script>

<template>
	<div class="captcha-container">
		<form @submit.prevent="onSubmit">
			<label for="captcha-input">Введите капчу:</label>
			<input
					type="text"
					id="captcha-input"
					v-model="captchaInput"
					placeholder="Введите текст капчи"
					required
			/>
			<button type="submit">Отправить</button>
		</form>
		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
	</div>
</template>
