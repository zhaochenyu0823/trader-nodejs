// server/modules/userManage.js

require("dotenv").config();
const mysql = require("mysql2");
//const { DB_SETTING } = require("../config/config").db_setting;
const db_setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });


// connection.on('error', function(err) {
//       console.log("##ERROR!!");
//       console.log("CODE:" + err.code);
//       console.log("SQLMESSAGE:" + err.sqlMessage);
//       //throw err;
// });


// ユーザ管理情報 条件検索 (KEY:traderCode, userId)
const selectUserManageByKey = (req, res) => {
    const connection = mysql.createConnection(db_setting);
    connection.connect();
 
    const query = "SELECT * FROM user_manage WHERE trader_code = ? and user_id = ?";
    console.log(req.query);
    const params = [req.query.traderCode,req.query.userId];
    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({"error": error.message})
            //throw error;
        }
        res.send(results);
        connection.end()
    });
};

// ユーザ管理情報 登録
const insertUserManage = (req, res) => {
    console.log("## BODY"+req.body);
    const query = "INSERT INTO user_manage " 
     + "(trader_code,user_id,user_name,authority,status,max_rows,regist_user) "
     + "VALUES (?, ?, ?, ?, ?, ?, ?)";
    console.log("## query"+query);
    const params = [
        req.body.traderCode
        ,req.body.userId
        ,req.body.userName
        ,req.body.authority
        ,req.body.status
        ,req.body.maxRows
        ,req.body.registUser // Tableの更新者のNOT NULLを治す
    ];
    connection.query(query, params, function(error, results, fields)  {
        if (error) {
            var messages="";
            if(error.code=='ER_DUP_ENTRY') messages="ユーザ情報は既に登録済みです";
            return res.status(500).json({"error": error.message,"Message":messages})
        }
        res.send(results);
    });
};

// ユーザ機能情報 登録
const insertUserFunc = (req, res) => {
    console.log("## BODY"+req.body);
    const query = "INSERT INTO user_func " 
    + "(trader_code,user_id,function_div,function_one,use_mnu,regist_user) "
    + "VALUES (?, ?, ?, ?, ?, ?)";
    console.log("## query"+query);
    const params = [
        req.body.traderCode
        ,req.body.userId
        ,req.body.functionDiv
        ,req.body.functionOne
        ,req.body.userMnu
        ,req.body.registUser
    ];
    connection.query(query, params, function(error, results, fields)  {
        if (error) {
            var messages="";
            if(error.code=='ER_DUP_ENTRY') messages="ユーザ情報は既に登録済みです";
            return res.status(500).json({"error": error.message,"Message":messages})
        }
        res.send(results);
    });
};

module.exports = { selectUserManageByKey, insertUserManage, insertUserFunc };

