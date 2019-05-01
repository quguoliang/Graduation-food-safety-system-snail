import request from '../request';
export default {
	//文章发布
	articalPublish(param) {
		return request({
			url: '/articalpublish',
			method: 'post',
			data: {
				articalInfo: param,
			},
		});
	},

	//获取文章全部文章列表
	allArticalList() {
		return request({
			url: '/allartical',
			method: 'get',
			params: {},
		});
	},

	//删除文章
	removeArtical(_id) {
		return request({
			url: '/removeartical',
			method: 'get',
			params: {
				_id: _id,
			},
		});
	},

	//获取文章信息
	getArticalInfo(_id) {
		return request({
			url: '/getarticalinfo',
			method: 'get',
			params: {
				_id: _id,
			},
		});
	},

	//修改文章信息
	modifyArticalInfo(_id, articalInfo) {
		return request({
			url: '/modifyarticalinfo',
			method: 'post',
			data: {
				_id: _id,
				articalInfo: articalInfo,
			},
		});
	},
	//根据条件进行查找文章
	selectArtical(tag, data) {
		return request({
			url: '/selectartical',
			method: 'post',
			data: {
				tag: tag,
				data: data,
			},
		});
	},

	//查找标签，用于数据显示
	tagCharts() {
		return request({
			url: '/tagcharts',
			method: 'get',
			params: {},
		});
	},
};
