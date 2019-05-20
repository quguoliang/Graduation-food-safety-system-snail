const db = require("../middleware/monk-mongo/index").db;
const goods = db.get("goods");

//添加商品
let addGoods = function(goodsObj) {
    let insertObj = goods.insert({
        goodsname: goodsObj.goodsname,
        type: goodsObj.type,
        price: goodsObj.price,
        factory: goodsObj.factory,
        date: goodsObj.date,
        time: goodsObj.time,
        remark: goodsObj.remark,
        place: goodsObj.place,
        telphone: goodsObj.telphone
    });
    return insertObj;
};

//查询全部商品
let selectGoods = function() {
    return goods.find({});
};

//删除商品
let deleteGoods = function(_id) {
    return goods.remove({
        _id: _id
    });
};
//根据商品类型查询数据，用户于信息展示
let goodsType = async function() {
    let typeList = [];
    let list = [
        "酒水类",
        "肉制品",
        "水产品",
        "调味品",
        "粮食制品",
        "水果蔬菜类",
        "其他"
    ];
    for (let i = 0; i < list.length; i++) {
        typeList.push({
            type: list[i],
            count: await goods.count({
                type: list[i]
            })
        });
    }

    return typeList;
};

//根据商品id查询商品
let selectGoodsInfo = function(_id) {
    return goods.findOne({
        _id: _id
    });
};

module.exports = {
    addGoods: addGoods,
    selectGoods: selectGoods,
    deleteGoods: deleteGoods,
    goodsType: goodsType,
    selectGoodsInfo: selectGoodsInfo
};
