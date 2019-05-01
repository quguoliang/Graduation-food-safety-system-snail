<template>
	<div class="merchandise-management">
		<Table :loading="loading" :columns="columns10" height="620" :data="showList"></Table>
		<Modal class="qr-modal" v-model="modal" width="350">
			<qriously class="qr-code" :value="value" :size="size" :backgroundAlpha="backgroundAlpha" />
		</Modal>
		<Page class="page" :page-size="pageSize" :total="total" @on-change="handlePageChange" />
	</div>
</template>

<script>
import expandRow from '@/components/table-expand';
import { mapActions, mapState } from 'vuex';
export default {
	name: 'merchandisemanagement',
	components: { expandRow },
	data() {
		return {
			// 可以自定义，必填项。
			value: '',
			// 二维码大小 默认 100
			size: 300,
			// 背景透明度，默认透明 0
			backgroundAlpha: 1,
			modal: false,
			columns10: [
				{
					type: 'expand',
					width: 50,
					render: (h, params) => {
						return h(expandRow, {
							props: {
								row: params.row,
							},
						});
					},
				},
				{
					title: '商品名称',
					key: 'goodsname',
					align: 'center',
				},
				{
					title: '厂家',
					key: 'factory',
					align: 'center',
				},
				{
					title: '类别',
					key: 'type',
					align: 'center',
				},
				{
					title: '操作',
					key: 'operation',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'primary',
										size: 'small',
									},
									style: {
										marginRight: '5px',
									},
									on: {
										click: () => {
											this.generateQR(params.index);
										},
									},
								},
								'生成二维码'
							),
							h(
								'Button',
								{
									props: {
										type: 'error',
										size: 'small',
									},
									on: {
										click: () => {
											this.goodsRemove(params.index);
										},
									},
								},
								'删除'
							),
						]);
					},
				},
			],
			loading: true,
		};
	},
	computed: {
		...mapState({
			current: state => state.goods.current,
			showList: state => state.goods.goodsShowList,
			total: state => state.goods.total,
			pageSize: state => state.goods.pageSize,
		}),
	},
	mounted() {
		this.getGoodsList();
		setTimeout(() => {
			this.handlePageChange(1);
		}, 10);
	},
	methods: {
		...mapActions(['GET_GOODSLIST', 'GET_GOODS_CURRENT', 'MODIFY_GOODS_SHOWLIST', 'REMOVE_GOODS', 'MODIFY_GOODSLIST']),
		generateQR(index) {
			this.modal = true;
			this.value = this.showList[index]._id;
		},
		getGoodsList() {
			this.GET_GOODSLIST();
			this.loading = false;
		},
		handlePageChange(index) {
			this.MODIFY_GOODS_SHOWLIST(index);
			this.GET_GOODS_CURRENT(index);
		},
		async goodsRemove(index) {
			let list = await this.REMOVE_GOODS(index);
			if (list.code === 1) {
				this.GET_GOODSLIST();
				this.$Message.success('商品删除成功！');
			} else {
				this.$Message.error('商品删除失败！');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.merchandise-management {
	.page {
		text-align: right;
		margin: 10px 0 10px 0;
	}
	// .table-height {
	// 	height: calc(100vh - 760px);
	// }
}
</style>
<style lang="scss">
.ivu-modal-close {
	top: 0px;
	right: 0px;
}
.ivu-modal-body {
	padding: 25px;
}

.qr-modal .ivu-modal-footer {
	display: none;
	border: none;
	padding: 0;
}
</style>
