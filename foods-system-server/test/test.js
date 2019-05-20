// const db = require("../middleware/monk-mongo/index").db;
// const User = db.get("users");
// const should = require("should");

// describe("测试用例 ", function() {
//     before(function(done) {
//         User.insert(
//             {
//                 "username": "admin"
//             },
//             done
//         );
//     });

//     after(function(done) {
//         User.remove(
//             {
//                 "username": "admin"
//             },
//             done
//         );
//     });

//     it('当找到 username="admin"的时候，返回一个对象', function(done) {
//         User.find(
//             {
//                 "username": "admin"
//             },
//             function(err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 user.should.be.an.Object();
//                 user.name.should.equal("admin");
//                 done();
//             }
//         );
//     });
// });
// var assert = require("assert");
// describe("Array", function() {
//     describe("#indexOf()", function() {
//         it("should return -1 when the value is not present", function() {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });
// describe("Connection", function() {
//     var db = new Connection(),
//         tobi = new User("tobi"),
//         loki = new User("loki"),
//         jane = new User("jane");

//     beforeEach(function(done) {
//         db.clear(function(err) {
//             if (err) return done(err);
//             db.save([tobi, loki, jane], done);
//         });
//     });

//     describe("#find()", function() {
//         it("respond with matching records", function(done) {
//             db.find({ type: "User" }, function(err, res) {
//                 if (err) return done(err);
//                 res.should.have.length(3);
//                 done();
//             });
//         });
//     });
// });
var koa = require("koa");
var request = require("supertest");

describe("Http test.", function() {
    it("Koa http", function(done) {
        var app = new koa();
        app.use(async function(ctx, next) {
            ctx.status = 200;
            ctx.body = "Hello";
            await next();
        });
        return request(app.listen())
            .get("/")
            .expect(200)
            .expect("Hello")
            .end(function() {
                done();
            });
    });
});
