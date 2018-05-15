var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var crypto = require('crypto');     //加密模块
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function (res, ret) {
    if ( ret.status === 'fail') {
        res.json({
            code: 0,
            msg: ret.msg
        });
    } else if (ret.status === 'success') {
        res.json({
            code: 1,
            msg: ret.msg,
            data: ret.data
        });
    }else{

    }
};
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);

    // conn.query(sql, [params.username, params.password], function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     if (result) {
    //         jsonWrite(res, result);
    //     }
    // })
});
router.post('/login', (req, res) => {
    var sql = $sql.user.login;
    var params = req.body;
    conn.query(sql, [params.phone, params.password], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.length <= 0 ) {
            var obj = {
                status: 'fail',
                msg:'登录失败！手机号或密码不正确！'
            }
            jsonWrite(res, obj);
        }else{
            delete result[0].PASSWORD;
            var obj = {
                status:'success',
                msg: '登录成功!',
                data:result[0]
            }
            
            req.session.sign = true;
            console.log(req.session);
            jsonWrite(res, obj);
        }
    })
});
router.post('/', (req, res) => {
    if (req.session.sign == true) {//检查用户是否已经登录
        console.log(req.session);//打印session的值
        res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
    } else {//否则展示index页面
        res.end('还没登陆！');
    }
});
module.exports = router;