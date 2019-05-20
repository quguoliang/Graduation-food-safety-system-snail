const request = require("request");
const crypto = require("crypto");
const db = require("../middleware/monk-mongo/index").db;
const user = db.get("users");
var http = require("http");
var querystring = require("querystring");
//登录
let login = function(telphone, password) {
    const findUser = user.findOne({
        telphone: telphone,
        password: password
    });
    return findUser;
};

//验证码
let validateCode = function(telphone) {
    console.log("====================================");
    console.log(telphone);
    console.log("====================================");
    var md5 = crypto.createHash("md5");
    let random = "";
    for (let i = 0; i < 6; i++) {
        random += parseInt(Math.random() * 10);
    }
    var smsapi = "api.smsbao.com";
    // 短信平台账号
    var user = "qubaba";
    // 短信平台密码
    var password = "admin";
    // 要发送的短信内容
    var content = `【桔子科技】:您的验证码为${random}，5分钟内有效，请勿泄漏给他人！`;
    // 要发送短信的手机号码
    var phone = "18531452110";

    send_sms(smsapi, user, password, content, phone);

    function send_sms(smsapi, user, password, content, phone) {
        var pass = md5.update(password).digest("hex");
        var data = {
            u: user,
            p: pass,
            m: phone,
            c: content
        };
        var content = querystring.stringify(data);
        var sendmsg = ""; //创建空字符串，用来存放收到的数据
        var options = {
            hostname: smsapi,
            path: "/sms?" + content,
            method: "GET"
        };
        //创建请求
        var req = http.request(options, function(res) {
            res.setEncoding("utf-8");
            res.on("data", function(result) {
                statusStr(result);
            });
            res.on("end", function() {});
        });
        req.on("error", function(err) {
            console.error(err);
        });
        req.end();
    }

    function statusStr(result) {
        switch (result) {
            case "0":
                console.log("短信发送成功");
                break;
            case "-1":
                console.log("参数不全");
                break;
            case "-2":
                console.log(
                    "服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！"
                );
                break;
            case "30":
                console.log("密码错误");
                break;
            case "40":
                console.log("账户不存在");
                break;
            case "41":
                console.log("余额不足");
                break;
            case "42":
                console.log("账户已过期");
                break;
            case "43":
                console.log("IP地址限制");
                break;
            case "50":
                console.log("内容含有敏感字");
                break;
        }
    }

    return random;
};
validateCode();
//修改密码
let modifyPassword = async function(username, newPassword) {
    let userObj = await user.findOne({
        telphone: username
    });
    userObj.password = newPassword;
    let obj = user.findOneAndUpdate(
        {
            telphone: username
        },
        userObj
    );
    return obj;
};

//注册
let register = async function(telphone, password, remark) {
    // let selectObj = await user.findOne({
    //     username: username,
    // })
    let selectObj = await selectUser(telphone);

    if (selectObj instanceof Object) {
        return "";
    } else {
        let insertObj = user.insert({
            telphone: telphone,
            password: password,
            isSuperManager: "0",
            remark: remark,
            date: Date.parse(new Date()),
            avatar: "/uploads/primary.jpg",
            username: ""
        });
        return insertObj;
    }
};
//查询用户是否存在
let selectUser = function(telphone) {
    return user.findOne({
        telphone: telphone
    });
};

//查看当前所有用户
let allUser = function() {
    var userList = user.find({});

    return userList;
};

//删除用户
let deleteUser = function(_id) {
    return user.remove({
        _id: _id
    });
};

//修改用户信息
let modifyUserInfo = async function(_id, newUserInfo) {
    let userObj = await user.findOne({
        _id: _id
    });
    userObj.username = newUserInfo.username;
    userObj.isSuperManager = newUserInfo.isSuperManager;
    userObj.remark = newUserInfo.remark;
    userObj.avatar = newUserInfo.avatar;
    if (newUserInfo.password !== "") {
        userObj.password = newUserInfo.password;
    }
    let obj = user.findOneAndUpdate(
        {
            _id: _id
        },
        userObj
    );
    return obj;
};

module.exports = {
    login: login,
    validateCode: validateCode,
    modifyPassword: modifyPassword,
    register: register,
    selectUser: selectUser,
    allUser: allUser,
    deleteUser: deleteUser,
    modifyUserInfo: modifyUserInfo
};
