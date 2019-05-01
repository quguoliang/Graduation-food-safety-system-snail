import apiArtical from '@/provider/api/artical';
import iview from 'iview';

function transform(arr) {
	return arr.map(item => {
		item.content = item.content.substring(0, 80);
		return item;
	});
}
const artical = {
	state: {
		articalList: [],
		articalshowList: [],
		pageSize: 5,
		total: 0,
		current: 1,
		articalId: '',
	},
	mutations: {
		GET_ARTICALLIST: (state, articalList) => {
			state.articalList = articalList;
			state.total = articalList.length;
			state.articalshowList = transform(articalList.slice((state.current - 1) * state.pageSize, state.current * state.pageSize));
		},
		MODIFY_ARTICAL_SHOWLIST: (state, index) => {
			state.articalshowList = transform(state.articalList.slice((index - 1) * state.pageSize, index * state.pageSize));
		},
		GET_ARTICAL_CURRENT: (state, current) => {
			state.current = current;
		},
		ADD_ARTICAL: (state, artical) => {
			state.articalList.push(artical);
		},
		GET_ARTICALID: (state, _id) => {
			state.articalId = _id;
		},
		SET_ARTICALID: (state, status) => {
			state.articalId = status;
		},
	},
	actions: {
		GET_ARTICALLIST: async ({ commit }) => {
			let list = await apiArtical.allArticalList();
			commit('GET_ARTICALLIST', list.data[0]);
		},
		MODIFY_ARTICAL_SHOWLIST: ({ commit }, index) => {
			commit('MODIFY_ARTICAL_SHOWLIST', index);
		},
		GET_ARTICAL_CURRENT: ({ commit }, index) => {
			commit('GET_ARTICAL_CURRENT', index);
		},
		REMOVE_ARTICAL: async ({ commit }, _id) => {
			let obj = await apiArtical.removeArtical(_id);
			return obj;
		},
		ADD_ARTICAL: async ({ commit, state }, articalInfo) => {
			let obj = await apiArtical.articalPublish(articalInfo);
			if (obj.code === 1) {
				commit('ADD_ARTICAL', obj.data[0]);
				commit('MODIFY_ARTICAL_SHOWLIST', state.current);
			}
			return obj;
		},
		GET_ARTICALID: ({ commit }, _id) => {
			commit('GET_ARTICALID', _id);
		},
		MODIFY_ARTICAL: async ({ commit, state }, articalInfo) => {
			let obj = await apiArtical.modifyArticalInfo(state.articalId, articalInfo);
			if (obj.code === 1) {
				commit('SET_ARTICALID', '');
			}
			return obj;
		},
		SET_ARTICALID: ({ commit }, status) => {
			commit('SET_ARTICALID', status);
		},
		SELECT_ARTICAL: async ({ commit }, params) => {
			let articalList = await apiArtical.selectArtical(params.tag, params.data);

			if (articalList.code === 1) {
				commit('GET_ARTICALLIST', articalList.data[0]);
			} else {
				iview.Message.error('按条件查找失败！');
			}
		},
	},
};

export default artical;
