import request from '../request';
export default {
	//添加商品
	addGoods(param) {
		return request({
			url: '/addgoods',
			method: 'post',
			data: {
				goodsInfo: param,
			},
		});
	},
	//查询全部商品
	selectGoodsList() {
		return request({
			url: '/selectgoods',
			method: 'get',
			params: {},
		});
	},
	//删除商品
	deleteGoods(_id) {
		return request({
			url: '/deletegoods',
			method: 'get',
			params: {
				_id: _id,
			},
		});
	},
	//查找type，用于数据显示
	typeCharts() {
		return request({
			url: '/typecharts',
			method: 'get',
			params: {},
		});
	},
};
