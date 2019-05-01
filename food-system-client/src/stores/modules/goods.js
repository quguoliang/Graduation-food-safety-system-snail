import apiGoods from '@/provider/api/goods';
const user = {
	state: {
		goodsList: [],
		goodsShowList: [],
		pageSize: 11,
		total: 0,
		current: 1,
	},

	mutations: {
		GET_GOODSLIST: (state, goodsList) => {
			state.goodsList = goodsList;
			state.total = goodsList.length;
			state.goodsShowList = goodsList.slice((state.current - 1) * state.pageSize, state.current * state.pageSize);
		},
		GET_GOODS_CURRENT: (state, current) => {
			state.current = current;
		},
		MODIFY_GOODS_SHOWLIST: (state, index) => {
			state.goodsShowList = state.goodsList.slice((index - 1) * state.pageSize, index * state.pageSize);
		},
		REMOVE_GOODS: (state, index) => {
			state.goodsShowList = state.goodsList.slice((index - 1) * state.pageSize, index * state.pageSize);
		},
		MODIFY_GOODSLIST: (state, index) => {
			state.goodsList = state.goodsList.splice((index - 1) * state.pageSize + index, 1);
			state.total -= 1;
		},
		ADD_GOODS: (state, goods) => {
			state.goodsList.push(goods);
		},
	},

	actions: {
		GET_GOODSLIST: async ({ commit }, status) => {
			let list = await apiGoods.selectGoodsList();
			commit('GET_GOODSLIST', list.data[0]);
		},
		GET_GOODS_CURRENT: ({ commit }, status) => {
			commit('GET_GOODS_CURRENT', status);
		},
		MODIFY_GOODS_SHOWLIST: ({ commit }, index) => {
			commit('MODIFY_GOODS_SHOWLIST', index);
		},
		MODIFY_GOODSLIST: ({ commit }, index) => {
			commit('MODIFY_GOODSLIST', index);
		},
		REMOVE_GOODS: async ({ commit, state }, index) => {
			let _id = state.goodsShowList[index]._id;
			let list = await apiGoods.deleteGoods(_id);
			// commit('GET_GOODS_CURRENT', status);
			return list;
		},
		ADD_GOODS: async ({ commit, state }, goodsInfo) => {
			let goods = await apiGoods.addGoods(goodsInfo);
			if (goods.code === 1) {
				commit('ADD_GOODS', goods.data[0]);
				commit('MODIFY_GOODS_SHOWLIST', state.current);
			}
			return goods;
		},
	},
};

export default user;
