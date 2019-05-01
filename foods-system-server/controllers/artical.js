const artical = require('../service/artical.js');
const base = require('../base');

//发布文章
let articalPublish = async (ctx, next) => {
    let articalObj = await artical.articalPublish(ctx.request.body.articalInfo);

    if (articalObj !== null) {
        return ctx.response.body = base.success(articalObj)
    } else {
        return ctx.response.body = base.error()
    }
}

//获取全部文章
let allArtical = async (ctx, netx) => {
    let articalList = await artical.allArtical();
    if (articalList !== null) {
        return ctx.response.body = base.success(articalList)
    } else {
        return ctx.response.body = base.error()
    }
}

//获取文章信息
let getArticalInfo = async (ctx, netx) => {
    let articalObj = await artical.getArticalInfo(ctx.query._id);
    if (articalObj !== null) {
        return ctx.response.body = base.success(articalObj)
    } else {
        return ctx.response.body = base.error()
    }
}

//修改文章信息
let modifyArticalInfo = async (ctx, next) => {
    let articalObj = artical.modifyArticalInfo(ctx.request.body._id, ctx.request.body.articalInfo)
    if (articalObj !== null) {
        return ctx.response.body = base.success(articalObj)
    } else {
        return ctx.response.body = base.error()
    }
}
//根据条件进行查询文章
let selectArtical = async (ctx, next) => {
    let tag = ctx.request.body.tag;
    if (tag === undefined) {
        tag = []
    }
    let articalList = await artical.selectArtical(tag, ctx.request.body.data)
    if (articalList !== null) {
        return ctx.response.body = base.success(articalList)
    } else {
        return ctx.response.body = base.error()
    }
}

//删除文章
let removeArtical = async (ctx, next) => {
    let ss = await artical.removeArtical(ctx.query._id);

    if (ss !== null) {
        return ctx.response.body = base.success(ss)
    } else {
        return ctx.response.body = base.error()
    }
}

//文章图表
let tagCharts = async (ctx, next) => {
    let tagList = await artical.tagCharts();
    if (tagList !== null) {
        return ctx.response.body = base.success(tagList)
    } else {
        return ctx.response.body = base.error()
    }
}

//根据 文章名和标签进行搜索
let searchArticalMp = async (ctx, next) => {
    let objList = await artical.searchArticalMp(ctx.query.tag);

    if (objList !== null) {
        return ctx.response.body = base.success(objList)
    } else {
        return ctx.response.body = base.error()
    }
}
module.exports = [{
        path: '/api/articalpublish',
        type: 'POST',
        methods: articalPublish
    },
    {
        path: '/api/allartical',
        type: 'GET',
        methods: allArtical
    },
    {
        path: '/api/getarticalinfo',
        type: 'GET',
        methods: getArticalInfo
    },
    {
        path: '/api/modifyarticalinfo',
        type: 'POST',
        methods: modifyArticalInfo
    },
    {
        path: '/api/selectartical',
        type: 'POST',
        methods: selectArtical
    },
    {
        path: '/api/removeartical',
        type: 'GET',
        methods: removeArtical
    },
    {
        path: '/api/tagcharts',
        type: 'GET',
        methods: tagCharts
    },
    {
        path: '/api/searcharticalmp',
        type: 'GET',
        methods: searchArticalMp
    },

]