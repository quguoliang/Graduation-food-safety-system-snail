const monk = require('monk');
const url = require('./key');
const db = monk(url.mongodbURL);
db.then(() => {
    console.log("mongodb连接成功！");

})
exports.db = db;