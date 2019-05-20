<template>
  <div class="loginPage">
    <img class="logoImg"
         src="../assets/images/logo-little.png"
         alt="" />

    <div class="login">
      <div class="loginContent">
        <div class="title">
          <span>用户登录</span>
        </div>
        <Form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="0">
          <FormItem>
            <Input size="large"
                   v-model.trim="formValidate.telphone"
                   placeholder="手机号"></Input>
          </FormItem>
          <FormItem>
            <Input size="large"
                   v-model="formValidate.password"
                   :type="changeType"
                   :icon="changeIcon"
                   @on-click="changeIconState"
                   placeholder="密码"></Input>
          </FormItem>
          <FormItem>
            <div class="send">
              <Input class="sendInput"
                     size="large"
                     v-model="formValidate.verificationCode"
                     placeholder="短信验证码"
                     style="width: 270px" />
              <span class="sendCode"
                    @click="sendMessage">{{ getMessageCode }}<span v-if="typeof this.getMessageCode === 'number'">s</span></span>
            </div>
          </FormItem>
          <FormItem>
            <Button @click="login"
                    size="large"
                    type="info"
                    long>登 录</Button>
          </FormItem>
        </Form>
        <div class="bottom">
          <span @click="missPassword">忘记密码？</span>
          <span @click="register">立即注册>></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
	name: 'login',
	components: {},

	data() {
		return {
			iconFlag: false,
			getMessageCode: '发送验证码',
			formValidate: {
				telphone: '',
				password: '',
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
		changeIcon() {
			return this.iconFlag ? 'md-eye' : 'md-eye-off';
		},
		changeType() {
			return this.iconFlag ? 'text' : 'password';
		},
	},
	methods: {
		...mapActions(['LOGIN', 'SET_VALIDATECODE']),
		changeIconState() {
			this.iconFlag = !this.iconFlag;
		},
		sendMessage() {
			if (this.getMessageCode === '发送验证码') {
				clearInterval(this.timer);
				var telphoneTest = /^1\d{10}$/;
				if (telphoneTest.test(this.formValidate.telphone) && this.formValidate.password !== '') {
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
					this.$Message.warning('请先输入用户名和密码！');
				}
			}
		},
		missPassword() {
			this.$router.replace({ name: 'modify' });
		},
		register() {
			this.$router.replace({ name: 'register' });
		},
		login() {
			if (this.formValidate.telphone !== '' && this.formValidate.password !== '' && this.formValidate.verificationCode !== '') {
				this.LOGIN(this.formValidate);
			} else {
				this.$Message.error('用户信息不能为空！');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.loginPage {
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
	.login {
		width: 420px;
		height: 380px;
		margin: 0 auto;
		margin-top: 45vh;
		background-color: #fff;
		transform: translateY(-50%);
		.loginContent {
			width: 80%;
			height: 100px;
			margin: 0 auto;
			.title {
				width: 100%;
				font-size: 26px;
				font-weight: 500;
				text-align: left;
				padding-top: 26px;
				margin-bottom: 30px;
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
				display: flex;
				user-select: none;
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
</style>
<style lang="scss">
.login-content {
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
</style>
