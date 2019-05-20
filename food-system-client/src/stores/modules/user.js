import apiUser from '@/provider/api/user';
import router from '@/routers/router';
import iview from 'iview';
const user = {
	state: {
		_id: '',
		telphone: '',
		username: '',
		isSuperManager: '',
		avatar: '/uploads/primary.jpg',
		validateCode: '',
		remark: '',
		localhost: 'http://47.107.150.235:2346',
	},

	mutations: {
		SET_SUPERMANAGER: (state, isSuperManager) => {
			state.isSuperManager = isSuperManager;
		},
		SET_USERNAME: (state, userInfo) => {
			state._id = userInfo._id;
			state.telphone = userInfo.telphone;
			state.avatar = userInfo.avatar;
			state.username = userInfo.username;
			state.remark = userInfo.remark;
		},
		SET_VALIDATECODE: (state, validateCode) => {
			state.validateCode = validateCode;
		},
	},

	actions: {
		// 登录
		LOGIN: async ({ commit, state }, userInfo) => {
			const userList = await apiUser.login(userInfo);
			if (userList.data.length !== 0) {
				commit('SET_USERNAME', userList.data[0]);
				commit('SET_SUPERMANAGER', userList.data[0].isSuperManager);
				if (userInfo.verificationCode === state.validateCode) {
					router.replace({
						name: 'systemhome',
					});
				} else {
					iview.Message.error('验证码错误！');
				}
			} else {
				iview.Message.error('用户名或者密码错误！');
			}
		},
		//短信验证码
		SET_VALIDATECODE: async ({ commit }, telphone) => {
			let data = await apiUser.getValidateCode(telphone);
			commit('SET_VALIDATECODE', data.data[0]);
		},

		//注册
		REGISTER: async ({ commit }, userInfo) => {
			const obj = await apiUser.register(userInfo);
			if (obj.data.length !== 0) {
				iview.Message.success('注册成功！即将跳转到首页');
				commit('SET_USERNAME', obj.data[0]);
				setTimeout(() => {
					router.replace({
						name: 'systemhome',
					});
				}, 2000);
			} else {
				iview.Message.error('注册失败，该账号已经注册！');
			}
		},
		EXIT: async ({ commit }, userInfo) => {
			commit('SET_USERNAME', userInfo);
		},
		MODIFY_USER_INFO: async ({ commit, state }, userInfo) => {
			let obj = await apiUser.modifyUserInfo(state._id, userInfo);
			if (obj.code === 1) {
				commit('SET_USERNAME', obj.data[0]);
			}
			return obj;
		},
	},
};

export default user;
