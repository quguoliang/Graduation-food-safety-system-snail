<template>
	<div class="top-left">
		<Card class="left-card">
			<div class="user-info">
				<img class="user-avatar" :src="localhost + avatar" />
				<div class="user-name">
					<span class="span-one">{{ username }}</span>
					<span class="span-two">{{ isSuperManager === '1' ? '超级管理员' : '管理员' }}</span>
				</div>
			</div>
			<div class="remarks">
				当前系统时间:
				<span>{{ nowTime }}</span>
			</div>
		</Card>
		<Card class="left-card">
			<span class="down-title">系统使用情况</span>
			<div style="text-align:left">
				<Progress :percent="23" status="active" stroke-color="rgb(119, 240, 199)"> <span>系统使用量</span></Progress>
				<Progress :percent="30" status="active" stroke-color="rgb(46, 135, 207)"><span>系统注册量</span></Progress>
				<Progress :percent="15" status="active" stroke-color="rgb(41, 101, 151)"> <span>文章编写量</span></Progress>
				<Progress :percent="11" status="active" stroke-color="rgb(51, 71, 185)"><span>文章访问量</span></Progress>
				<Progress :percent="35" status="active" stroke-color="rgb(119, 240, 199)"><span>小程序使用量</span></Progress>

				<div style="text-align:center;font-size:15px;margin-top:10px">系统情况概览</div>
			</div>
		</Card>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: 'topLeftPart',
	data() {
		return {
			// userName: 'Snail丶',
			// userCategory: '超级管理员',
			nowTime: '',
			// lastTime: '2019年02月26日 13:16:39',
		};
	},
	mounted() {
		this.nowTimes();
	},
	computed: {
		...mapState({
			avatar: state => state.user.avatar,
			username: state => state.user.username,
			isSuperManager: state => state.user.isSuperManager,
			localhost: state => state.user.localhost,
		}),
	},
	methods: {
		timeFormate(timeStamp) {
			let year = new Date(timeStamp).getFullYear();
			let month =
				new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
			let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
			let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
			let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
			let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
			this.nowTime = year + '年' + month + '月' + date + '日' + ' ' + hh + ':' + mm + ':' + ss;
		},
		nowTimes() {
			this.timeFormate(new Date());
			setInterval(this.nowTimes, 1000);
			this.clear();
		},
		clear() {
			clearInterval(this.nowTimes);
			this.nowTimes = null;
		},
	},
};
</script>
<style lang="scss" scoped>
.top-left {
	display: inline-block;
	width: 320px;
	.left-card {
		margin: 10px;
		.user-info {
			display: flex;
			text-align: center;
			justify-content: space-between;
			padding-bottom: 15px;
			border-bottom: 2px solid #ccc;
			.user-avatar {
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}
			.user-name {
				flex: 1;
				height: 120px;
				text-align: center;
				padding: 30px 0 0 30px;
				color: rgb(51, 71, 185);
				.span-one {
					display: block;
					font-size: 30px;
					width: 100%;
				}
				.span-two {
					display: block;
					width: 100%;
					color: #9b9b9b;
					font-size: 15px;
				}
			}
		}
		.remarks {
			padding-top: 10px;
			color: #999;
			span {
				margin-left: 10px;
			}
		}
		.down-title {
			display: block;
			text-align: left;
			font-size: 17px;
			margin: 5px 0 10px 0;
			padding-bottom: 15px;
			border-bottom: 2px solid #ccc;
		}
	}
}
</style>
