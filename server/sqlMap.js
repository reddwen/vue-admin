module.exports = {
    // 用户
    user: {
        add: 'insert into T_USER(USER_NAME, PHONE, PASSWORD) values (?, ?, ?)',
        login:'select * from T_USER where PHONE = ? AND PASSWORD = ?'
    }
};