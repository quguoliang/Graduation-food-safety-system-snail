const multer = require('koa-multer'); //加载koa-multer模块

//配置
var storage = multer.diskStorage({
    destination: 'public/uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
    filename(ctx, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
})
//加载配置
var upload = multer({
    storage: storage
});
module.exports = upload