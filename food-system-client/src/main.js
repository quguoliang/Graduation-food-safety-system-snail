import Vue from 'vue';
import App from './App.vue';
import router from './routers/router';
import store from './stores/store';
import Message from '@/components/message/message.js';
import '@/icons';
import filters from '@/utils/filters';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VCharts from 'v-charts';
import 'v-charts/lib/style.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import SearchFilter from '@/components/search-filter';
import VueQriously from 'vue-qriously';
import mapBoxGl from 'mapbox-gl';
import mapboxLanguage from '@mapbox/mapbox-gl-language';
import mapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import mapboxDirections from '@mapbox/mapbox-gl-directions';

Vue.prototype.mapBox = mapBoxGl;
Vue.prototype.mapboxLanguage = mapboxLanguage;
Vue.prototype.mapboxGeocoder = mapboxGeocoder;
// Vue.prototype.mapboxDirections = mapboxDirections;

Vue.component('SearchFilter', SearchFilter);

Vue.config.productionTip = false;
Vue.prototype.$message = Message.install;

Vue.use(VueQriously);
Vue.use(iView);
Vue.use(VCharts);
Vue.use(mavonEditor);

for (let key in filters) {
	if (!filters.hasOwnProperty(key)) {
		continue;
	}
	Vue.fileter(filters[key]);
}
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
