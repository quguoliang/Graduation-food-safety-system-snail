const user = require('../service/user.js');
const base = require('../base');

//登录
let login = async (ctx, next) => {
    let telphone = ctx.query.telphone;
    let password = ctx.query.password;
    const data = await user.login(telphone, password);

    if (data === null) {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.success(data)
    }
}
//验证码
let validateCode = async (ctx, next) => {

    let telphone = ctx.request.body.telphone;
    let validateCode = await user.validateCode(telphone);
    if (validateCode !== '') {
        return ctx.response.body = base.success(validateCode)
    } else {
        return ctx.response.body = base.error()
    }
}
//修改密码
let modifyPassword = async (ctx, next) => {

    let newPassword = ctx.request.body.newPassword;
    let username = ctx.request.body.username;

    let obj = await user.modifyPassword(username, newPassword)
    if (obj !== null) {
        return ctx.response.body = base.success(obj)
    } else {
        return ctx.response.body = base.error()
    }

}

//注册
let register = async (ctx, next) => {
    let password = ctx.request.body.password;
    let username = ctx.request.body.username;
    let remark = ctx.request.body.remark;

    let obj = await user.register(username, password, remark);

    if (obj instanceof Object) {
        return ctx.response.body = base.success(obj)
    } else if (obj === '') {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.error()
    }

}
//根据用户名查询用户是否存在，
let selectUser = async (ctx, next) => {
    let telphone = ctx.query.telphone;

    let obj = await user.selectUser(telphone);
    if (obj === null) {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.success(obj)
    }
}

//查询所有用户
let allUser = async (ctx, next) => {
    let userList = await user.allUser();
    if (userList === null) {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.success(userList)
    }
}

//删除用户
let deleteUser = async (ctx, next) => {
    let userObj = await user.deleteUser(ctx.query._id);
    if (userObj === null) {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.success(userObj)
    }
}

//修改用户信息
let modifyUserInfo = async (ctx, next) => {
    let userObj = await user.modifyUserInfo(ctx.request.body._id, ctx.request.body.newUserInfo);
    if (userObj === null) {
        return ctx.response.body = base.error()
    } else {
        return ctx.response.body = base.success(userObj)
    }
}


module.exports = [{
        path: '/api/login',
        type: "GET",
        methods: login
    },
    {
        path: '/api/validatecode',
        type: "POST",
        methods: validateCode
    },
    {
        path: '/api/modifypassword',
        type: "POST",
        methods: modifyPassword
    },
    {
        path: '/api/register',
        type: "POST",
        methods: register
    },
    {
        path: '/api/selectuser',
        type: "GET",
        methods: selectUser
    },
    {
        path: '/api/alluser',
        type: "GET",
        methods: allUser
    },
    {
        path: '/api/deleteuser',
        type: "GET",
        methods: deleteUser
    },
    {
        path: '/api/modifyuserInfo',
        type: "POST",
        methods: modifyUserInfo
    },

]