const db = require('../middleware/monk-mongo/index').db;
const User = db.get('users');
const should = require('should');

describe('测试用例 ', function () {

    before(function (done) {
        User.insert({
            username: 'admin'
        }, done);
    });

    after(function (done) {
        User.remove({
            username: 'admin'
        }, done);
    })

    it('当找到 username="admin"的时候，返回一个对象', function (done) {
        User.find({
            username: 'admin'
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            user.should.be.an.Object();
            user.name.should.equal('admin');
            done();
        });
    });
});