import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import artical from './modules/artical';
import user from './modules/user';
import goods from './modules/goods';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		app,
		artical,
		user,
		goods,
	},
	getters,
});
