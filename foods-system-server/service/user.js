const request = require('request')
const crypto = require('crypto')
const db = require('../middleware/monk-mongo/index').db;
const user = db.get('users');
//登录
let login = function (telphone, password) {
    const findUser = user.findOne({
        telphone: telphone,
        password: password
    })
    return findUser

}

//验证码
let validateCode = function (telphone) {
    // 从控制台获取
    let accesskey = '5ca4735787b65f6374f1a0a2'
    let secretkey = 'a8036e49885f478bb6edcdf999f9a19b'
    // 生成随机验证码(字符串)
    let random = ''
    for (let i = 0; i < 6; i++) {
        random += parseInt(Math.random() * 10)
    }
    // // // unix时间戳
    // let curTime = Math.floor(Date.now() / 1000)
    // // 需安装引入crypto模块
    // let hash = crypto.createHash('sha256')
    // hash.update(`secretkey=${secretkey}&random=${random}&time=${curTime}&mobile=${telphone}`)
    // // 手机号非空及格式校验
    // var uphoneRegRule = /^1\d{10}$/;

    // if (telphone && uphoneRegRule.test(telphone)) {
    //     // 请求包体,必须使用双引号
    //     let data = {
    //         "tel": {
    //             "nationcode": "86", // 国家码
    //             "mobile": telphone // 手机号码
    //         },
    //         "signId": "5ca472f787b65f6374f1a089", // 短信签名ID
    //         "templateId": "5a9599b66fcafe461546ba55", // 短信模板ID
    //         "params": [random], // 参数，分别对应上面假定模板的{1}，{2}
    //         "sig": hash.digest("hex").toUpperCase(), // 计算app凭证
    //         "time": curTime, // unix时间戳
    //         "extend": "", // 通道扩展码，可选字段
    //         "ext": "", // 用户的session内容，可选字段
    //         "type": 0, // 0:普通短信 1:营销短信
    //     }
    //     // 需安装引入request模块
    //     request({
    //         url: `https://live.kewail.com/sms/v2/sendsinglesms?accesskey=${accesskey}&random=${random}`,
    //         method: 'POST',
    //         json: data
    //     }, (error, response, body) => {
    //         if (!error && response.statusCode == 200 && body.result === 0) {

    //         } else {

    //         }
    //     })
    // } else {

    // } // 手机号格式验证失败
    return random
}

//修改密码
let modifyPassword = async function (username, newPassword) {
    let userObj = await user.findOne({
        telphone: username
    });
    userObj.password = newPassword;
    let obj = user.findOneAndUpdate({
        telphone: username
    }, userObj)
    return obj
}

//注册
let register = async function (telphone, password, remark) {
    // let selectObj = await user.findOne({
    //     username: username,
    // })
    let selectObj = await selectUser(telphone)

    if (selectObj instanceof Object) {
        return ''
    } else {
        let insertObj = user.insert({
            "telphone": telphone,
            "password": password,
            "isSuperManager": '0',
            "remark": remark,
            "date": Date.parse(new Date()),
            "avatar": "/uploads/primary.jpg",
            "username": ''
        })
        return insertObj
    }
}
//查询用户是否存在
let selectUser = function (telphone) {
    return user.findOne({
        telphone: telphone
    })
}

//查看当前所有用户
let allUser = function () {
    var userList = user.find({})

    return userList
}

//删除用户
let deleteUser = function (_id) {
    return user.remove({
        "_id": _id
    });
}

//修改用户信息
let modifyUserInfo = async function (_id, newUserInfo) {
    let userObj = await user.findOne({
        _id: _id
    });
    userObj.username = newUserInfo.username;
    userObj.isSuperManager = newUserInfo.isSuperManager;
    userObj.remark = newUserInfo.remark;
    userObj.avatar = newUserInfo.avatar;
    if (newUserInfo.password !== '') {
        userObj.password = newUserInfo.password
    }
    let obj = user.findOneAndUpdate({
        _id: _id
    }, userObj)
    return obj
}


module.exports = {
    login: login,
    validateCode: validateCode,
    modifyPassword: modifyPassword,
    register: register,
    selectUser: selectUser,
    allUser: allUser,
    deleteUser: deleteUser,
    modifyUserInfo: modifyUserInfo
}