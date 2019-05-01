<template>
	<div class="artical">
		<div class="title">文章列表</div>
		<div class="search">
			<div class="search-tag">
				<SearchFilter v-model="params" :datas="dicts.tag" prop="tag" multiple title="标签"></SearchFilter>
				<SearchFilter v-model="params" :datas="dicts.data" prop="data" title="时间"></SearchFilter>
			</div>
		</div>
		<div class="artical-info" v-for="(item, index) in articalshowList" :key="index">
			<div class="artical-title" @click="editorArtical(index)">{{ item.title }}</div>
			<div class="artical-label">
				<Tag color="success">{{ item.tag }}</Tag>
			</div>
			<div class="artical-content">{{ item.content }}</div>
		</div>

		<Page class="page" :page-size="pageSize" :total="total" @on-change="handlePageChange" />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'articalManagement',
	components: {},
	data() {
		return {
			dicts: {
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
				data: [{ key: '001', title: '一周内' }, { key: '002', title: '一个月内' }, { key: '003', title: '一年内' }],
			},

			params: {
				tag: [],
				data: null,
			},
		};
	},
	watch: {
		params: {
			handler(newVal) {
				this.SELECT_ARTICAL(newVal);
			},
			deep: true,
		},
	},
	computed: {
		...mapState({
			articalshowList: state => state.artical.articalshowList,
			articalList: state => state.artical.articalList,
			pageSize: state => state.artical.pageSize,
			total: state => state.artical.total,
			current: state => state.artical.current,
		}),
	},
	mounted() {
		this.getArticalList();
		this.handlePageChange(1);
	},
	methods: {
		...mapActions(['GET_ARTICALLIST', 'MODIFY_ARTICAL_SHOWLIST', 'GET_ARTICAL_CURRENT', 'GET_ARTICALID', 'SELECT_ARTICAL']),
		async getArticalList() {
			this.GET_ARTICALLIST();
		},
		handlePageChange(index) {
			this.GET_ARTICAL_CURRENT(index);
			this.MODIFY_ARTICAL_SHOWLIST(index);
		},
		editorArtical(index) {
			this.GET_ARTICALID(this.articalshowList[index]._id);
			this.$router.push({
				name: 'articaleditor',
			});
		},
	},
};
</script>

<style lang="scss" scoped>
$line-color: #eeeeee;
.artical {
	background-color: #fff;
	.title {
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		padding-left: 20px;
		border-bottom: 1px solid $line-color;
	}
	.search {
		border-bottom: 1px solid $line-color;
		.search-tag {
			padding: 20px 0 0 20px;
		}
	}
	.artical-info {
		height: 130px;
		padding: 15px 0 15px 20px;
		border-bottom: 1px solid $line-color;
		&:hover {
			transition: 0.5s;
			background-color: #f9f9f9;
		}
		.artical-title {
			font-size: 15px;
			font-weight: 700;
			&:hover {
				color: #555;
				transition: 0.5s;
				text-decoration: underline;
				cursor: pointer;
			}
		}
		.artical-label {
			margin: 5px 0 5px 0;
		}
	}
}
.page {
	text-align: right;
	margin: 10px 0 10px 0;
}
</style>
<style lang="scss">
.search-tag {
	.picker-item {
		&:first-child {
			display: inline-block;
		}
	}
}
</style>
