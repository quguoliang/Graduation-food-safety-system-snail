import axios from 'axios';
import Qs from 'qs';
// import store from '@/stores/store';

// 创建axios 实例
const request = axios.create({
	baseURL: '/api', // api的base_url
	timeout: 10000, // 请求超时时间
	transformRequest: [
		function(data) {
			data = Qs.stringify(data);
			return data;
		},
	],
	// headers: {
	// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	// },
	//
});

// 添加请求拦截器
request.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么

		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
request.interceptors.response.use(
	function(response) {
		// 对响应数据做点什么

		return response.data;
	},
	function(error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);
export default request;
