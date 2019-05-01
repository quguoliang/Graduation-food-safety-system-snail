import request from '../request';
export default {
	//登录
	login(param) {
		return request({
			url: '/login',
			method: 'get',
			params: {
				telphone: param.telphone,
				password: param.password,
			},
		});
	},
	//登录
	getValidateCode(param) {
		return request({
			url: '/validatecode',
			method: 'post',
			data: {
				telphone: param,
			},
		});
	},
	//修改密码
	modifyPassword(param) {
		return request({
			url: '/modifypassword',
			method: 'post',
			data: {
				username: param.telphone,
				newPassword: param.confirmPassword,
			},
		});
	},
	//注册
	register(param) {
		return request({
			url: '/register',
			method: 'post',
			data: {
				username: param.telphone,
				password: param.password,
				remark: param.remark,
			},
		});
	},
	//查找用户
	selectUser(param) {
		return request({
			url: '/selectuser',
			method: 'get',
			params: {
				telphone: param,
			},
		});
	},

	//查找全部用户
	allUser() {
		return request({
			url: '/alluser',
			method: 'get',
			params: {},
		});
	},

	//删除用户信息
	deleteUser(_id) {
		return request({
			url: '/deleteuser',
			method: 'get',
			params: {
				_id: _id,
			},
		});
	},

	//修改用户信息
	modifyUserInfo(_id, newUserInfo) {
		return request({
			url: '/modifyuserInfo',
			method: 'post',
			data: {
				_id: _id,
				newUserInfo: newUserInfo,
			},
		});
	},
};
