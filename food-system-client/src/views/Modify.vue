<template>
	<div class="modifyPage">
		<img class="logoImg" src="../assets/images/logo-little.png" alt="" />
		<!-- <div class="topTitle"></div> -->
		<div class="modify">
			<div class="modifyContent">
				<div class="title">
					<span>修改密码</span>
				</div>
				<div class="step">
					<Steps :current="current">
						<Step title="短信验证" icon="ios-chatboxes-outline"></Step>
						<Step title="修改密码" icon="ios-lock-outline"></Step>
						<Step title="修改成功" icon="ios-checkmark-circle-outline"></Step>
					</Steps>
				</div>
				<Form v-if="current !== 2" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
					<FormItem v-if="current === 0">
						<Input size="large" v-model="formValidate.telphone" placeholder="手机号"></Input>
					</FormItem>
					<FormItem v-if="current === 0">
						<div class="send">
							<Input
								class="sendInput"
								size="large"
								v-model="formValidate.verificationCode"
								placeholder="短信验证码"
								style="width: 270px"
							/>
							<span class="sendCode" @click="sendMessage"
								>{{ getMessageCode }}<span v-if="typeof this.getMessageCode === 'number'">s</span></span
							>
						</div>
					</FormItem>
					<FormItem v-if="current === 1">
						<Input
							size="large"
							v-model="formValidate.password"
							:type="changeType"
							:icon="changeIcon"
							@on-click="changeIconState"
							placeholder="新密码"
						></Input>
					</FormItem>
					<FormItem v-if="current === 1">
						<Input
							size="large"
							v-model="formValidate.confirmPassword"
							:type="changeTypeConfirm"
							:icon="changeIconConfirm"
							@on-click="changeIconStateConfirm"
							@on-blur="judgePassword"
							placeholder="确认密码"
						></Input>
					</FormItem>
					<FormItem>
						<Button size="large" type="info" @click="nextStep" long>下一步</Button>
					</FormItem>
				</Form>

				<div class="modify-success" v-if="current === 2">
					<Icon size="100" color="#2DB6F5" type="md-checkmark-circle-outline" />
					<div class="success-info">修改成功！正在跳转登录页面...</div>
				</div>
				<div class="bottom"><span @click="returnStep"> <<返回上一步</span> <span @click="login">立即登录>> </span></div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import apiUser from '@/provider/api/user';
export default {
	name: 'modify',
	data() {
		return {
			current: 0,
			iconFlag: false,
			iconFlagConfrim: false,
			getMessageCode: '发送验证码',
			formValidate: {
				telphone: '',
				password: '',
				confirmPassword: '',
				verificationCode: '',
			},
			ruleValidate: {
				name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
				password: [{ required: true, message: 'The password cannot be empty', trigger: 'blur' }],
				verificationCode: [{ required: true, message: 'The verificationCode cannot be empty', trigger: 'blur' }],
			},
		};
	},
	computed: {
		...mapState({
			validateCode: state => state.user.validateCode,
		}),
		changeIcon() {
			return this.iconFlag ? 'md-eye' : 'md-eye-off';
		},
		changeType() {
			return this.iconFlag ? 'text' : 'password';
		},
		changeIconConfirm() {
			return this.iconFlagConfrim ? 'md-eye' : 'md-eye-off';
		},
		changeTypeConfirm() {
			return this.iconFlagConfrim ? 'text' : 'password';
		},
	},
	watch: {
		current(newVal) {
			if (newVal === 2) {
				setTimeout(() => {
					this.$router.replace({ name: 'login' });
				}, 2000);
			}
		},
	},
	methods: {
		...mapActions(['SET_VALIDATECODE']),
		judgePassword() {
			if (this.formValidate.confirmPassword !== this.formValidate.password) {
				this.$Message.error('两次输入的密码不一致');
				return;
			}
		},
		changeIconState() {
			this.iconFlag = !this.iconFlag;
		},
		changeIconStateConfirm() {
			this.iconFlagConfrim = !this.iconFlagConfrim;
		},
		sendMessage() {
			if (this.getMessageCode === '发送验证码') {
				var telphoneTest = /^1\d{10}$/;
				clearInterval(this.timer);
				if (telphoneTest.test(this.formValidate.telphone)) {
					this.SET_VALIDATECODE(this.formValidate.telphone);
					this.getMessageCode = 60;
					this.$Message.success('验证码发送成功，请注意查看！');
					this.timer = setInterval(() => {
						if (this.getMessageCode > 1) {
							this.getMessageCode -= 1;
						} else {
							this.getMessageCode = '发送验证码';
						}
					}, 1000);
				} else {
					this.$Message.warning('请先输入手机号！');
				}
			}
		},
		async nextStep() {
			if (this.current >= 2) {
				this.current = 2;
			} else if (this.current === 0) {
				if (this.formValidate.telphone !== '') {
					if (this.validateCode === this.formValidate.verificationCode && this.formValidate.verificationCode !== '') {
						let isUser = await apiUser.selectUser(this.formValidate.telphone);
						if (isUser.code === 1) {
							this.current += 1;
						} else {
							this.$Message.error('用户不存在！');
						}
					} else {
						this.$Message.error('验证码不正确！');
					}
				} else {
					this.$Message.error('手机号不能为空！');
				}
			} else if (this.current === 1) {
				if (this.formValidate.telphone !== '' && this.formValidate.confirmPassword !== '' && this.formValidate.password !== '') {
					if (this.formValidate.password === this.formValidate.confirmPassword) {
						apiUser.modifyPassword(this.formValidate);
						this.current += 1;
					} else {
						this.$Message.error('两次输入的密码不一致！');
					}
				} else {
					this.$Message.error('新密码不能为空！');
				}
			} else {
				this.current = this.current;
			}
		},
		returnStep() {
			if (this.current === 2) {
				this.current = 2;
			} else {
				if (this.current <= 0) {
					this.current = 0;
				} else {
					this.current -= 1;
				}
			}
		},
		login() {
			this.$router.replace({ name: 'login' });
		},
	},
};
</script>
<style lang="scss" scoped>
.modifyPage {
	width: 100%;
	height: 100vh;
	border: 1px solid #fff;
	background-image: url('../assets/images/login-bg.jpeg');
	background-position: center;
	background-size: 100% 100%;
	.logoImg {
		position: absolute;
		top: 0;
		left: 30px;
		width: 100px;
		height: 90px;
		z-index: 100;
	}
	.modify {
		width: 420px;
		height: 380px;
		margin: 0 auto;
		margin-top: 45vh;
		background-color: #fff;
		transform: translateY(-50%);
		.modifyContent {
			width: 80%;
			height: 80px;
			margin: 0 auto;
			.title {
				width: 100%;
				font-size: 26px;
				font-weight: 500;
				text-align: left;
				padding-top: 26px;
				margin-bottom: 30px;
			}
			.step {
				height: 60px;
			}
			.send {
				display: flex;
				justify-content: flex-start;
				.sendInput {
					display: inline-block;
				}
				.sendCode {
					display: inline-block;
					width: 100px;
					cursor: pointer;
					background-color: #fafafa;
					border: 1px solid #dcdee2;
					border-left: none;
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
					user-select: none;
				}
			}
			.bottom {
				width: 100%;
				height: 43px;
				line-height: 43px;
				user-select: none;
				display: flex;
				justify-content: space-between;
				background-image: radial-gradient(50% 100%, rgba(225, 231, 235, 0.78) 0, hsla(0, 0%, 100%, 0) 100%);
				span {
					font-size: 13px;
					font-weight: 400;
					color: rgb(136, 133, 133);
					cursor: pointer;
					&:hover {
						color: #000;
						transition: 1s;
					}
				}
			}
		}
	}
}
.modify-success {
	height: 180px;
	.success-info {
		padding-top: 20px;
		font-size: 16px;
	}
}
</style>
<style lang="scss">
.modify-content {
	.ivu-input-icon {
		cursor: pointer;
	}
}
.sendInput {
	.ivu-input-large {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}
}
.ivu-steps .ivu-steps-custom .ivu-steps-title {
	margin-top: 4px;
}
</style>
