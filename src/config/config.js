
require("dotenv").config();

module.exports = {
    db_setting : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
};

// Connection Pool
// https://coconala.com/blogs/1044257/389427
// const pool = mysql.createPool({
//     connectionLimit: 10, // プールに保持するコネクションの最大数
//     host: 'example.org', // データベースのホスト名
//     user: 'yourusername', // データベースのユーザー名
//     password: 'yourpassword', // データベースのパスワード
//     database: 'yourdatabase' // データベース名
//   });