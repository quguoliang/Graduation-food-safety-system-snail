<template>
	<div class="system-title">
		<div class="title-left">
			<img class="img" src="../../assets/images/logo-white.png" alt="" />
			<span>食品安全追溯系统</span>
		</div>
		<div class="title-avatar">
			<!-- <svg-icon iconName="setUp"></svg-icon> -->
			<Avatar :src="localhost + avatar" />
			<span class="username" @click="handleInfo">
				{{ username }}
				<Icon type="md-arrow-dropdown" :class="rotateInfo" />
			</span>
		</div>
		<transition name="fade">
			<div v-show="dropFlag" class="drop-down">
				<div class="drop-item" @click="userInfo">个人信息</div>
				<div class="drop-item" @click="exit">退出系统</div>
			</div>
		</transition>
		<Drawer title="个人信息" width="512" :closable="false" v-model="drawerInfo">
			<div class="info-avatar">
				<img @click="modifyUserInfo" class="user-avatar" :src="localhost + avatar" />
			</div>
			<div class="user-username">{{ username === '' ? '暂无' : username }}</div>
			<div class="user-type">{{ isSuperManager === '1' ? '超级管理员' : '管理员' }}</div>
			<div class="user-remark">{{ remark }}</div>
		</Drawer>
		<Drawer title="修改个人信息" :closable="false" v-model="drawerModify" width="300">
			<div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
				<template v-if="item.status === 'finished'">
					<img style="margin:0 auto" :src="item.url" />
					<!-- <div class="demo-upload-list-cover">
						<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
						<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
					</div> -->
				</template>
				<template v-else>
					<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
				</template>
			</div>
			<Upload
				class="upload-avatar"
				v-if="uploadFlag"
				ref="upload"
				:show-upload-list="false"
				:default-file-list="defaultList"
				:on-success="handleSuccess"
				:format="['jpg', 'jpeg', 'png']"
				:max-size="2048"
				:on-format-error="handleFormatError"
				:on-exceeded-size="handleMaxSize"
				:before-upload="handleBeforeUpload"
				multiple
				type="drag"
				action="/api/upload"
				style="display: inline-block;width:58px;"
			>
				<div style="width: 58px;height:58px;line-height: 58px;">
					<Icon type="ios-camera" size="20"></Icon>
				</div>
			</Upload>
			<Form :model="formInfo" :label-width="60">
				<FormItem label="系统账户">
					<Input disabled v-model="formInfo.telphone"></Input>
				</FormItem>
				<FormItem label="用户名">
					<Input v-model="formInfo.username" placeholder="请输入你的用户名..."></Input>
				</FormItem>
				<FormItem label="新密码">
					<Input v-model="formInfo.password" placeholder="请输入你的新密码..."></Input>
				</FormItem>
				<FormItem label="个性签名">
					<Input type="textarea" v-model="formInfo.remark" placeholder="请输入你的个性信息..."></Input>
				</FormItem>
				<FormItem>
					<Button style="margin-left:50px" type="success" @click="confirmModify">确认修改</Button>
				</FormItem>
			</Form>
		</Drawer>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			userInfoFlag: false,
			dropFlag: false,
			drawerInfo: false,
			drawerModify: false,
			defaultList: [],
			imgName: '',
			visible: false,
			uploadList: [],
			uploadFlag: true,
			formInfo: { telphone: '', avatar: '', username: '', remark: '', password: '', isSuperManager: '' },
		};
	},
	computed: {
		...mapState({
			telphone: state => state.user.telphone,
			avatar: state => state.user.avatar,
			username: state => state.user.username,
			isSuperManager: state => state.user.isSuperManager,
			remark: state => state.user.remark,
			_id: state => state.user._id,
			localhost: state => state.user.localhost,
		}),
		rotateInfo() {
			return ['menu-icon', this.userInfoFlag ? 'user-icon' : ''];
		},
	},
	mounted() {
		this.uploadList = this.$refs.upload.fileList;
		this.formInfo = {
			telphone: this.telphone,
			avatar: this.avatar,
			username: this.username,
			remark: this.remark,
			isSuperManager: this.isSuperManager,
			password: '',
		};
	},
	beforeUpdated() {},
	methods: {
		...mapActions(['EXIT', 'MODIFY_USER_INFO']),
		handleInfo() {
			this.userInfoFlag = !this.userInfoFlag;
			this.dropFlag = !this.dropFlag;
		},
		userInfo() {
			this.drawerInfo = true;
			this.userInfoFlag = !this.userInfoFlag;
			this.dropFlag = !this.dropFlag;
		},
		modifyUserInfo() {
			this.drawerModify = true;
		},
		exit() {
			this.$router.replace({ name: 'login' });
			this.EXIT({
				telphone: '',
				username: '',
				avatar: '',
			});
		},

		handleView(name) {
			this.imgName = name;
			this.visible = true;
		},
		handleRemove(file) {
			const fileList = this.$refs.upload.fileList;
			this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
		handleSuccess(res, file) {
			// this.defaultList.push({ name: file.name, url: 'http://localhost:2345' + res.filePath });

			file.url = this.localhost + res.filePath;
			this.formInfo.avatar = res.filePath;
			this.uploadFlag = false;
			file.name = file.name + res.filePath;
		},
		handleFormatError(file) {
			this.$Notice.warning({
				title: '图片格式错误',
				desc: '图片 ' + file.name + ' 错误，请选择PNG或者JPG格式.',
			});
		},
		handleMaxSize(file) {
			this.$Notice.warning({
				title: '图片大小限制',
				desc: '当前图片 ' + file.name + ' 太大，图片大小不能超过2M',
			});
		},
		handleBeforeUpload() {
			const check = this.uploadList.length < 1;
			if (!check) {
				this.$Notice.warning({
					title: '只能上传一张照片.',
				});
			}
			return check;
		},
		async confirmModify() {
			let obj = await this.MODIFY_USER_INFO(this.formInfo);

			if (obj.code === 1) {
				this.$Message.success('修改成功！');
				this.formInfo = { telphone: '', avatar: '', username: '', remark: '', password: '', isSuperManager: '' };
				this.drawerModify = false;
			} else {
				this.$Message.error('修改失败！');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.system-title {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 60px;
	line-height: 60px;
	color: #fff;
	background-color: #242f41;
	font-size: 20px;
	user-select: none;
	.title-left {
		width: 350px;
		height: 60px;
		span {
			margin-left: 30px;
			float: left;
		}
	}
	img {
		width: 100px;
		height: 70px;
		margin-left: 20px;
		float: left;
	}
	span {
		margin-left: 30px;
	}
	.title-avatar {
		.avatar {
			margin: 0 3px 0 20px;
		}
		.username {
			display: inline-block;
			font-size: 16px;
			margin: 5px 40px 0 3px;
			cursor: pointer;
		}
	}
	.usericon {
		transform: rotateZ(180deg);
	}
}
.menu-icon {
	transition: all 0.3s;
}
.user-icon {
	transform: rotate(-180deg);
}
.drop-down {
	position: absolute;
	right: 0;
	top: 60px;
	width: 120px;
	height: 90px;
	border: 1px solid #515d77;
	background-color: #525a6e;
	transition: 1s;
	color: #c8ccd1;
	z-index: 1000;
	font-size: 16px;
	.drop-item {
		width: 100%;
		height: 45px;
		line-height: 45px;
		border-bottom: 1px solid #363e4f;
		&:last-child {
			border-bottom: none;
		}
		&:hover {
			color: #fff;
			background-color: #363e4f;
			cursor: pointer;
		}
	}
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
.info-avatar {
	text-align: center;
	.user-avatar {
		width: 150px;
		height: 150px;
		border-radius: 50%;
	}
}
.user-username {
	text-align: center;
	font-size: 30px;
}
.user-type {
	text-align: center;
	font-size: 25px;
	color: #aeaeae;
	margin-top: 10px;
}
.user-remark {
	text-align: center;
	font-size: 16px;
	margin-top: 15px;
}

.demo-upload-list {
	// display: inline-block;
	width: 60px;
	height: 60px;
	text-align: center;
	line-height: 60px;
	border: 1px solid transparent;
	border-radius: 4px;
	overflow: hidden;
	background: #fff;
	position: relative;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
	margin-right: 4px;
	margin: 0 auto;
	margin-bottom: 20px;
}
.demo-upload-list img {
	width: 100%;
	height: 100%;
}
.demo-upload-list-cover {
	display: none;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
	display: block;
}
.demo-upload-list-cover i {
	color: #fff;
	font-size: 20px;
	cursor: pointer;
	margin: 0 2px;
}
.upload-avatar {
	margin-left: 50%;
	transform: translate(-50%);
	margin-bottom: 10px;
}
</style>
<style lang="scss"></style>
