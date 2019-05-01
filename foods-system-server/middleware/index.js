const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

module.exports = (koa) => {
    koa.use(koaBody({}));
    koa.use(bodyParser());
    koa.use(cors({
        origin: function (ctx) {
            // if (ctx.url === '/cors') {
            return "*"; // 允许来自所有域名请求
            // }
            // return 'http://localhost:2345';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
        allowHeaders: ['Content-Type', 'Authorization', 'Accept']
    }))
}