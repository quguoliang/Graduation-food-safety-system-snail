const db = require('../middleware/monk-mongo/index').db;
const artical = db.get('artical');

//上传文章
let articalPublish = function (articalInfo) {

    let articalObj = artical.insert({
        "title": articalInfo.title,
        "tag": articalInfo.tag,
        "content": articalInfo.content,
        "date": new Date().getTime(),
        "authorname": articalInfo.authorname,
        "authortelphone": articalInfo.authortelphone,
        "ispublish": '1'
    })
    return articalObj
}

//获取全部文章列表
let allArtical = function () {
    return artical.find({})
}

//获取文章信息
let getArticalInfo = function (_id) {
    let articalObj = artical.findOne({
        _id: _id
    })
    return articalObj
}
//修改文章信息
let modifyArticalInfo = function (_id, articalInfo) {
    let obj = {
        "title": articalInfo.title,
        "tag": articalInfo.tag,
        "content": articalInfo.content,
        "date": new Date().getTime(),
        "authorname": articalInfo.authorname,
        "authortelphone": articalInfo.authortelphone,
        "ispublish": '1'
    }
    let articalObj = artical.findOneAndUpdate({
        "_id": _id
    }, obj)
    return articalObj
}
//根据条件进行查找文章
let selectArtical = async function (tag, data) {
    const tagList = [{
            key: 1,
            title: '安全'
        },
        {
            key: 2,
            title: '健康'
        },
        {
            key: 3,
            title: '绿色'
        },
        {
            key: 4,
            title: '消费'
        },
        {
            key: 5,
            title: '养生'
        },
        {
            key: 6,
            title: '运输'
        },
        {
            key: 7,
            title: '维权'
        },
        {
            key: 8,
            title: '举报'
        },
    ];
    let list = [];

    if (tag !== undefined && tag.length === 0) {
        list = ['安全', '健康', '绿色', '消费', '养生', '运输', '维权', '举报']
    } else {
        list = [];
        list = tagList.map(item => {
            for (let i = 0; i < tag.length; i++) {
                if (item.key == tag[i]) {
                    return item.title
                }

            }
        });
    }

    let date = '';
    if (data === '001') {
        date = new Date().getTime() - 86400 * 7 * 1000;
    } else if (data === '002') {
        date = new Date().getTime() - 86400 * 30 * 1000;
    } else if (data === '003') {
        date = new Date().getTime() - 86400 * 365 * 1000;
    } else {
        date = new Date().getTime() - 86400 * 36500 * 1000;
    }

    let artlist = await artical.find({
        $and: [{
            'tag': {
                "$in": list
            }
        }, {
            'date': {
                '$gte': date
            }
        }]

    })
    return artlist
}

//删除文章
let removeArtical = function (_id) {
    return artical.remove({
        "_id": _id
    })
}

//按照标签返回数组对象，用于图表展示
let tagCharts = async function () {
    let tagList = [];
    let list = ['安全', '健康', '绿色', '消费', '养生', '运输', '维权', '举报']
    for (let i = 0; i < list.length; i++) {
        tagList.push({
            tag: list[i],
            count: await artical.count({
                "tag": list[i]
            })
        })
    }

    return tagList
}

//根据标签和标题查询文章
let searchArticalMp = async function (tag) {
    let artlist = await artical.find({
        $or: [{
            'tag': tag

        }, {
            'title': new RegExp(tag)

        }]

    })


    return artlist
}

module.exports = {
    articalPublish: articalPublish,
    allArtical: allArtical,
    getArticalInfo: getArticalInfo,
    modifyArticalInfo: modifyArticalInfo,
    selectArtical: selectArtical,
    removeArtical: removeArtical,
    tagCharts: tagCharts,
    searchArticalMp: searchArticalMp
}