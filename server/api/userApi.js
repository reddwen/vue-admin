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
    if (typeof ret === 'undefined') {
        res.json({
            code: '0',
            msg: '操作失败'
        });
    } else {
        var obj = {
            code: '1',
            data: ret
        }
        res.json(ret);
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
module.exports = router;