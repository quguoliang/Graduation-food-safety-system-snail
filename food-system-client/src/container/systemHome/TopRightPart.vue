<template>
	<div class="top-right">
		<div class="top">
			<Card class="top-card">
				<div class="icon-style" style="background:#348eed">
					<svg-icon iconName="people" iconClass="icon-class"></svg-icon>
				</div>
				<div class="data-style">
					<span class="span-one">{{ userTotal }}</span>
					<span class="span-two"><strong>系统用户量</strong></span>
				</div>
			</Card>
			<Card class="top-card">
				<div class="icon-style" style="background:#69D376">
					<svg-icon iconName="message" iconClass="icon-class"></svg-icon>
				</div>
				<div class="data-style">
					<span class="span-one">{{ articalTotal }}</span>
					<span class="span-two"><strong>推文数量</strong></span>
				</div>
			</Card>
			<Card class="top-card">
				<div class="icon-style" style="background:#EF5F49">
					<svg-icon iconName="goods" iconClass="icon-class"></svg-icon>
				</div>
				<div class="data-style">
					<span class="span-one">{{ goodsTotal }}</span>
					<span class="span-two"><strong>商品数量</strong></span>
				</div>
			</Card>
		</div>
		<div class="down-card">
			<Card>
				<div class="down-title">
					<span>历史推文</span>
					<span class="title-add" @click="addArtical">添加</span>
				</div>
				<div class="down-list">
					<div class="article-list" v-for="(item, index) in articalList.slice(-7)" :key="item._id">
						<!-- <Checkbox v-model="item.ispublish"></Checkbox> -->
						<span :class="item.ispublish === '1' ? '' : 'delete-artical'">{{ item.title }}</span>
						<div class="operate">
							<svg-icon iconName="modify" iconClass="operate-icon" @click.native="modifyArtical(index)"></svg-icon>
							<svg-icon iconName="delete" iconClass="operate-icon" @click.native="removeArtical(index)"></svg-icon>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import apiUser from '@/provider/api/user';
export default {
	name: 'topRightPart',
	data() {
		return { userTotal: 0 };
	},
	computed: {
		...mapState({
			articalList: state => state.artical.articalList,
			goodsTotal: state => state.goods.total,
			articalTotal: state => state.artical.total,
		}),
	},
	async mounted() {
		this.GET_ARTICALLIST();
		this.GET_GOODSLIST();
		let list = await apiUser.allUser();
		this.userTotal = list.data[0].length;
	},
	methods: {
		...mapActions(['GET_ARTICALLIST', 'GET_ARTICALID', 'REMOVE_ARTICAL', 'GET_GOODSLIST']),
		handleSelectAll(status) {
			this.$refs.selection.selectAll(status);
		},
		modifyArtical(index) {
			this.GET_ARTICALID(this.articalList.slice(-7)[index]._id);
			this.$router.push({
				name: 'articaleditor',
			});
		},
		addArtical() {
			this.$router.push({ name: 'articaleditor' });
		},
		async removeArtical(index) {
			let obj = await this.REMOVE_ARTICAL(this.articalList.slice(-7)[index]._id);
			if (obj.code === 1) {
				this.$Message.success('删除成功！');
				this.GET_ARTICALLIST();
			} else {
				this.$Message.error('删除失败！');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.top-right {
	flex: 1;
	padding: 10px;
	.top {
		height: 100px;
		display: flex;
		justify-content: space-between;
		.top-card {
			flex: 1;
			display: flex;
			margin-left: 20px;
			&:first-child {
				margin-left: 0;
			}
			.icon-style {
				display: inline-block;
				width: 100px;
				height: 99px;
				text-align: center;
				color: #fff;
				.icon-class {
					width: 55px;
					height: 55px;
					margin-top: 25px;
				}
			}
			.data-style {
				display: inline-block;
				flex: 1;
				text-align: center;
				padding-left: 10px;
				span {
					display: block;
				}
				.span-one {
					font-size: 30px;
					font-weight: 700;
					color: #348eed;
				}
				.span-two {
					color: #999;
				}
			}
		}
	}
	.down-card {
		margin-top: 10px;
		height: 381px;
		.down-title {
			display: block;
			text-align: left;
			font-size: 17px;
			margin: 5px 0 10px 0;
			padding-bottom: 15px;
			border-bottom: 2px solid #ccc;
			.title-add {
				float: right;
				font-size: 14px;
				font-weight: 500;
				color: #3e94e9;
				cursor: pointer;
				margin: 3px 5px 0 0;
				&:hover {
					color: rgb(125, 183, 240);
				}
			}
		}
		.down-list {
			height: calc(100% - 57px);
			overflow-y: scroll;
			.article-list {
				padding: 10px 0 5px 0px;
				border-bottom: 1px solid #ebeef5;
				&:hover {
					background-color: rgb(247, 247, 247);
					transition: 0.5s;
				}
				input {
					width: 14px;
					height: 14px;
				}
				span {
					color: #727477;
					font-weight: 450;
					margin-left: 20px;
				}
				.delete-artical {
					color: rgb(221, 219, 219);
					text-decoration: line-through;
				}
				.operate {
					display: inline-block;
					float: right;
					color: rgb(201, 196, 196);
					margin-right: 5px;
					.operate-icon {
						margin-left: 5px;
						cursor: pointer;
						&:hover {
							color: #666;
							transition: 0.5s;
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
.top-card {
	.ivu-card-body {
		padding: 0;
	}
}
.down-card {
	.ivu-card-body {
		height: 406px;
	}
}
</style>
