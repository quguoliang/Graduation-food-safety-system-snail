<template>
	<div class="down-part">
		<Card class="bottom-card">
			<div style="text-align:center">
				<ve-pie :loading="articalLoading" :data="articalChartData"></ve-pie>
				<span>文章聚合信息展示</span>
			</div>
		</Card>

		<Card class="bottom-card">
			<div style="text-align:center">
				<ve-line :width="'470px'" :height="'400px'" :data="goodsChartData"></ve-line>
				<span>商品聚合信息展示</span>
			</div>
		</Card>
	</div>
</template>
<script>
import apiArtical from '@/provider/api/artical';
import apiGoods from '@/provider/api/goods';
export default {
	name: 'salesdata',
	data() {
		return {
			articalChartData: {
				columns: ['tag', 'count'],
				rows: [],
			},
			goodsChartData: {
				columns: ['type', 'count'],
				rows: [],
			},
			articalLoading: true,
			goodsLoading: true,
		};
	},
	async mounted() {
		let typeList = await apiGoods.typeCharts();
		let tagList = await apiArtical.tagCharts();
		if (typeList.code === 1) {
			this.goodsChartData.rows = typeList.data[0];
			this.goodsLoading = false;
		}
		if (tagList.code === 1) {
			this.articalChartData.rows = tagList.data[0];
			this.articalLoading = false;
		}
	},
};
</script>
<style lang="scss" scoped>
.down-part {
	display: flex;
	justify-content: flex-start;
	padding: 0 10px 30px 0px;
	.bottom-card {
		width: 50%;
		margin-left: 10px;
		&:first-child {
			margin-left: 10px;
		}
		span {
			font-size: 18px;
		}
	}
}
</style>
