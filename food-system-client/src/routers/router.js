import Vue from 'vue';
import Router from 'vue-router';
import store from '@/stores/modules/user';

// const isDev = process.env.NODE_ENV === 'development';

Vue.use(Router);

function loadView(view) {
	return () => import(`views/content/${view}`);
}
const router = new Router({
	mode: 'history',
	base: '/',
	routes: [
		{
			path: '*',
			name: 'error',
			component: () => import('views/404.vue'),
		},
		{
			path: '/',
			redirect: '/systemhome',
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('views/Login.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('views/Register.vue'),
		},
		{
			path: '/modify',
			name: 'modify',
			component: () => import('views/Modify.vue'),
		},
		{
			path: '/',
			name: 'home',
			component: () => import('views/Index.vue'),
			meta: {
				requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
			},
			children: [
				{
					path: '403',
					name: '403',
					component: loadView('403'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'addmerchandise',
					name: 'addmerchandise',
					component: loadView('AddMerchandise'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'systemhome',
					name: 'systemhome',
					component: loadView('SystemHome'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'articaleditor',
					name: 'articaleditor',
					component: loadView('ArticalEditor'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'personnelmanagement',
					name: 'personnermanagement',
					component: loadView('PersonnelManagement'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
						superManager: true, //添加该字段，表示超级管理员才能进入
					},
				},
				{
					path: 'merchandisemanagement',
					name: 'merchandisemanagement',
					component: loadView('MerchandiseManagement'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'articalmanagement',
					name: 'articalmanagement',
					component: loadView('ArticalManagement'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
				{
					path: 'salesdata',
					name: 'salesdata',
					component: loadView('SalesData'),
					meta: {
						requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
					},
				},
			],
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (store.state.telphone !== '') {
			if (to.meta.superManager) {
				if (store.state.isSuperManager === '1') {
					next();
				} else {
					next('/403');
				}
			} else {
				next();
			}
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath,
				}, // 将跳转的路由path作为参数，登录成功后跳转到该路由
			});
		}
	} else {
		next();
	}
});

export default router;
