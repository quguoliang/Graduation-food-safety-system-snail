<template>
	<div class="artical-editor">
		<Input size="large" class="a-input" placeholder="输入文章标题..." v-model="articalTitle">
			<Poptip v-model="poptip" slot="append" placement="bottom-end" width="270">
				<span>发布</span>
				<div class="api" slot="content">
					<div class="slot-title">发布文章</div>
					<SearchFilter v-model="selectTag" :datas="tag" prop="tag" title="标签"></SearchFilter>
					<div class="aritcl-publish">
						<Button type="primary" @click="confirmPublish">确认发布</Button>
					</div>
				</div>
			</Poptip>
		</Input>
		<mavon-editor v-model="articalContent" />
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import apiArtical from '@/provider/api/artical';
export default {
	name: 'articalEditor',
	data() {
		return {
			articalTitle: '',
			articalContent: '',
			poptip: false,
			tag: [
				{ key: 1, title: '安全' },
				{ key: 2, title: '健康' },
				{ key: 3, title: '绿色' },
				{ key: 4, title: '消费' },
				{ key: 5, title: '养生' },
				{ key: 6, title: '运输' },
				{ key: 7, title: '维权' },
				{ key: 8, title: '举报' },
			],
			selectTag: {
				tag: null,
			},
		};
	},
	computed: {
		...mapState({
			telphone: state => state.user.telphone,
			username: state => state.user.username,
			articalId: state => state.artical.articalId,
		}),
	},

	async mounted() {
		if (this.articalId !== '') {
			let obj = await apiArtical.getArticalInfo(this.articalId);
			if (obj.code === 1) {
				this.articalTitle = obj.data[0].title;
				this.articalContent = obj.data[0].content;
				this.selectTag.tag = this.tag.filter(item => {
					if (item.title === obj.data[0].tag) {
						return item;
					}
				})[0].key;
			}
		}
	},
	methods: {
		...mapActions(['ADD_ARTICAL', 'SET_ARTICALID', 'MODIFY_ARTICAL', 'GET_ARTICALLIST']),
		async confirmPublish() {
			this.poptip = false;
			let aritclTag = [];
			if (this.articalTitle === '') {
				this.$Message.warning('请添加您要发布的文章标题！');
			} else if (this.articalContent === '') {
				this.$Message.warning('请添加您要发布的文章内容！');
			} else if (this.selectTag.tag === null) {
				this.$Message.warning('请选择文章标签!');
			} else {
				aritclTag = this.tag.filter(item => {
					if (this.selectTag.tag === item.key) {
						return item;
					}
				});
				let articalInfo = {
					title: this.articalTitle,
					content: this.articalContent,
					tag: aritclTag[0].title,
					authorname: this.username,
					authortelphone: this.telphone,
				};
				if (this.articalId === '') {
					let articalObj = await this.ADD_ARTICAL(articalInfo);
					if (articalObj.code === 1) {
						this.$Message.success('文章发布成功！可在文章列表进行查看！');
						this.articalTitle = '';
						this.articalContent = '';
						this.selectTag.tag = null;
					} else {
						this.$Message.success('文章发布失败！请重新发布！');
					}
				} else {
					let articalObj = await this.MODIFY_ARTICAL(articalInfo);
					if (articalObj.code === 1) {
						this.$Message.success('文章修改成功！可在文章列表进行查看！');
						this.SET_ARTICALID('');
						this.GET_ARTICALLIST();
						this.articalTitle = '';
						this.articalContent = '';
						this.selectTag.tag = null;
					} else {
						this.$Message.success('文章修改失败！请重新发布！');
					}
				}
			}
		},
		async getArticalInfo() {
			let obj = await apiArtical.getArticalInfo(this.articalId);
			if (obj.code === 1) {
				this.articalTitle = obj.data[0].articalTitle;
				this.articalContent = obj.data[0].articalContent;
				this.selectTag.tag = this.tag.filter(item => {
					if (item.title === obj.data[0].tag) {
						return item;
					}
				}).key;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.a-input {
	width: 100%;
	height: 65px;
	border: 1px solid #d7d9da;
	box-shadow: 1px 1px 1px #d7d9da;
	margin-bottom: 5px;
}
.slot-title {
	height: 60px;
	line-height: 60px;
	text-align: left;
	font-size: 18px;
	font-weight: 700;
	color: hsla(218, 9%, 51%, 0.8);
	padding-left: 10px;
}
.aritcl-publish {
	padding: 20px;
	border-top: 1px solid #f1f1f1;
}
</style>
<style lang="scss">
.artical-editor {
	.v-note-wrapper {
		min-height: calc(100vh - 190px);
		position: static;
	}
	.ivu-input-large {
		height: 65px;
		color: #000 !important;
		font-size: 26px;
		border: none;
	}
}
.ivu-input-group-append,
.ivu-input-group-prepend {
	width: 150px;
	background-color: #2d8cf0;
	user-select: none;
}
.ivu-input-group-large .ivu-input,
.ivu-input-group-large > .ivu-input-group-append,
.ivu-input-group-large > .ivu-input-group-prepend {
	font-size: 18px;
	color: #fff;
}
.ivu-poptip-body {
	color: hsla(218, 9%, 51%, 0.8);
}
.picker-item {
	&:first-child {
		display: none;
	}
}
.search-picker-title {
	display: none;
}
.search-picker-item-group {
	display: flex;
	flex-wrap: wrap;
}
.ivu-input-group-append .ivu-btn,
.ivu-input-group-prepend .ivu-btn {
	background-color: #2d8cf0;
	color: #fff;
	&:hover {
		background-color: #63abf7;
	}
}
</style>
