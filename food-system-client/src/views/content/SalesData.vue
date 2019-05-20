<template>
  <div>
    <div class="down-part">
      <Card class="bottom-card">
        <div style="text-align:center">
          <ve-radar :data="chartData"></ve-radar>
          <span>食品安全追溯系统使用率</span>
        </div>
      </Card>
      <Card class="bottom-card">
        <div style="text-align:center">
          <ve-scatter :data="chartData1"></ve-scatter>
          <span>不同标签文章访问情况</span>
        </div>
      </Card>
    </div>

    <div class="down-part">
      <Card class="bottom-card">
        <div style="text-align:center">
          <ve-pie :loading="articalLoading"
                  :settings="chartSettings"
                  :data="articalChartData"></ve-pie>
          <span>系统不同文章标签的文章量</span>
        </div>
      </Card>
      <Card class="bottom-card">
        <div style="text-align:center">
          <ve-line :loading="goodsLoading"
                   :height="'400px'"
                   :data="goodsChartData"></ve-line>
          <span>系统商品数量</span>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import apiArtical from '@/provider/api/artical';
import apiGoods from '@/provider/api/goods';
export default {
	name: 'salesdata',
	data() {
		this.chartSettings = {
			roseType: 'radius',
		};
		return {
			articalChartData: {
				columns: ['tag', 'count'],
				rows: [],
			},
			goodsChartData: {
				columns: ['type', 'count'],
				rows: [],
			},
			chartData: {
				columns: ['食品安全追溯系统', '今天', '一周内', '一个月内'],
				rows: [
					{ 食品安全追溯系统: '食品安全追溯客户端', 今天: 20, 一周内: 150, 一个月内: 876 },
					{ 食品安全追溯系统: '食品安全追溯小程序', 今天: 30, 一周内: 200, 一个月内: 1356 },
				],
			},
			chartData1: {
				columns: ['日期', '安全', '健康', '消费', '绿色', '养生', '运输', '维权', '举报'],
				rows: [
					{ 日期: '今天', 安全: 123, 健康: 33, 消费: 140, 绿色: 43, 养生: 57, 运输: 90, 维权: 134, 举报: 65 },
					{ 日期: '一周内', 安全: 243, 健康: 45, 消费: 235, 绿色: 123, 养生: 160, 运输: 268, 维权: 378, 举报: 342 },
					{ 日期: '一个月内', 安全: 450, 健康: 86, 消费: 356, 绿色: 345, 养生: 634, 运输: 456, 维权: 563, 举报: 566 },
					{ 日期: '一年内', 安全: 675, 健康: 355, 消费: 507, 绿色: 577, 养生: 779, 运输: 745, 维权: 867, 举报: 679 },
				],
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
