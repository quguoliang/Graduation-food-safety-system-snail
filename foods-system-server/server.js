const Koa = require('koa');
const router = require('./router');
const middleware = require('./middleware');
const static = require('koa-static');


const koa = new Koa();
middleware(koa);
router(koa);

koa.use(static(__dirname + '/public'))
koa.listen(2345, () => {
    console.log("The service is already running on port 2345");
});