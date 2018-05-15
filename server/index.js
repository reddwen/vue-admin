const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const userApi = require('./api/userApi');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'admin', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        // maxAge: 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

app.use(cookieParser());

// 后端api路由
app.use('/api/user', userApi);


// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');