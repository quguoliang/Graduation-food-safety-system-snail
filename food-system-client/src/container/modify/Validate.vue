<template>
	<div>
		<FormItem>
			<Input size="large" v-model="formValidate.name" placeholder="手机号"></Input>
		</FormItem>
		<FormItem>
			<div class="send">
				<Input class="sendInput" size="large" v-model="verificationCode" placeholder="短信验证码" style="width: 270px" />
				<span class="sendCode" @click="sendMessage"
					>{{ getMessageCode }}<span v-if="typeof this.getMessageCode === 'number'">s</span></span
				>
			</div>
		</FormItem>
	</div>
</template>

<script>
export default {
	name: '',
	components: {},
	props: ['verificationCode', 'getMessageCode'],
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
