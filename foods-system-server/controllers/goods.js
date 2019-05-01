const goods = require('../service/goods.js');
const base = require('../base');


//上传图片
let upload = async (ctx, next) => {
    ctx.body = JSON.stringify({
        filePath: ctx.req.file.path.substring(6)
    })
}
//添加商品
let addGoods = async (ctx, next) => {
    let goodsObj = await goods.addGoods(ctx.request.body.goodsInfo);

    if (goodsObj !== null) {
        return ctx.response.body = base.success(goodsObj)
    } else {
        return ctx.response.body = base.error()
    }
}

//商品列表查询
let selectGoods = async (ctx, next) => {
    let goodsList = await goods.selectGoods();

    if (goodsList !== null) {
        return ctx.response.body = base.success(goodsList)
    } else {
        return ctx.response.body = base.error()
    }
}

//删除商品
let deleteGoods = async (ctx, next) => {

    let goodsObj = await goods.deleteGoods(ctx.query._id);

    if (goodsObj !== null) {
        return ctx.response.body = base.success(goodsObj)
    } else {
        return ctx.response.body = base.error()
    }
}
//根据商品类型查看信息，用于图表展示
let typeCharts = async (ctx, next) => {

    let goodsList = await goods.goodsType();

    if (goodsList !== null) {
        return ctx.response.body = base.success(goodsList)
    } else {
        return ctx.response.body = base.error()
    }
}

//根据商品id查询商品
let selectGoodsInfo = async (ctx, next) => {

    let obj = await goods.selectGoodsInfo(ctx.query._id);

    if (obj !== null) {
        return ctx.response.body = base.success(obj)
    } else {
        return ctx.response.body = base.error()
    }
}


module.exports = [{
        path: '/api/upload',
        type: "UPLOAD",
        methods: upload
    },
    {
        path: '/api/addgoods',
        type: "POST",
        methods: addGoods
    },
    {
        path: '/api/selectgoods',
        type: "GET",
        methods: selectGoods
    },
    {
        path: '/api/deletegoods',
        type: "GET",
        methods: deleteGoods
    },
    {
        path: '/api/typecharts',
        type: "GET",
        methods: typeCharts
    },
    {
        path: '/api/selectgoodsinfo',
        type: "GET",
        methods: selectGoodsInfo
    },
]