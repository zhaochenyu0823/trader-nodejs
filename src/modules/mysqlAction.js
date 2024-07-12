
require("dotenv").config();
//const mysql = require("mysql2");
const mysql = require('mysql2/promise');
const{
    CognitoIdentityProviderClient
    ,AdminCreateUserCommand
    ,AdminDeleteUserCommand
}=require('@aws-sdk/client-cognito-identity-provider');

//const { DB_SETTING } = require("../config/config").db_setting;
const db_setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

// ユーザ管理情報 条件検索 (KEY:traderCode, userId)
async function selectUserManageByKey (req, res) {    
    
    let connection;
    try{
        // DB接続
        connection = await mysql.createConnection(db_setting);

        const query = "SELECT * FROM user_manage WHERE trader_code = ? and user_id = ?";
        const params = [req.query.traderCode,req.query.userId];
        // Queryの実行
        const [results, fields] = await connection.query(query,params);
        if(results.length < 1){
            var messages="ユーザ情報は存在しません。";
            res.status(500).json({"error": 'ER_NO_EXSITS',"Message":messages})
        } else {
            console.log(results.length);
            res.send(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({"error": err.message})
    } finally {
        connection.end();
        return
    }
};

// ユーザ情報 登録
async function insertUserManage (req, res) {   

    let connection;
    try{
        // DB接続
        connection = await mysql.createConnection(db_setting);

        // トランザクション開始
        await connection.beginTransaction();

        // USER_MANAGEテーブル登録
        const query_mng = "INSERT INTO user_manage " 
        + "(trader_code,user_id,user_name,authority,status,max_rows,regist_user) "
        + "VALUES (?, ?, ?, ?, ?, ?, ?)";
        const params_mng = [
           req.body.traderCode
           ,req.body.userId
           ,req.body.userName
           ,req.body.authority
           ,req.body.status
           ,req.body.maxRows
           ,req.body.registUser // Tableの更新者のNOT NULLを治す
        ];
        const [results_mng] = await connection.query(query_mng,params_mng);

        // USER_FUNCテーブル登録
        const query_func = "INSERT INTO user_func " 
        + "(trader_code,user_id,function_div,function_one,use_mnu,regist_user) "
        + "VALUES (?, ?, ?, ?, ?, ?)";
        const params_func = [
           req.body.traderCode
           ,req.body.userId
           ,req.body.functionDiv
           ,req.body.functionOne
           ,req.body.userMnu
           ,req.body.registUser
        ];
        const [results] = await connection.query(query_func,params_func);

        // UserPoolに情報を登録する
        
        const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({});
        const userAttributes = [
            { "Name": "email", "Value": req.body.mail },
        ]
        const input = {
            UserPoolId: process.env.USERPOOL,
            Username: req.body.userId,
            UserAttributes: userAttributes,
        };          
          console.log(`Attempting to create user: ${req.body.userId}`);
          await cognitoIdentityProviderClient.send(new AdminCreateUserCommand(input));

          // トランザクション commit
        await connection.commit();
        res.status(200).json({"status": "success"})
    } catch (err) {
        // Rollback
        await connection.rollback();
        var messages="";
        if(err.code=='ER_DUP_ENTRY'|| err.__type=='UsernameExistsException') messages="ユーザ情報は既に登録済みです";
        res.status(500).json({"status": "error","error": err.message,"Message":messages})
    } finally {
        connection.end();
        return
    };
};

// ユーザ情報 削除
async function deleteUserManage (req, res) {   

    let connection;
    try{
        // DB接続
        connection = await mysql.createConnection(db_setting);

        // トランザクション開始
        await connection.beginTransaction();

        // USER_MANAGEテーブル削除
        const query_mng = "DELETE FROM user_manage " 
        + "WHERE trader_code=? AND user_id=? ";

        const params = [req.query.traderCode,req.query.userId];
        const [results_mng] = await connection.query(query_mng,params);

        // USER_FUNCテーブル削除
        const query_func = "DELETE FROM user_func " 
        + "WHERE trader_code=? AND user_id=? ";
        + "VALUES (?, ?, ?, ?, ?, ?)";
        const [results_func] = await connection.query(query_func,params);

        // UserPoolのユーザデータ削除
        const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({});
        const input = {
            UserPoolId: process.env.USERPOOL,
            Username: req.query.userId,
        };          
          console.log(`Attempting to delete user: ${req.body.userId}`);
          await cognitoIdentityProviderClient.send(new AdminDeleteUserCommand(input));

          // トランザクション commit
        await connection.commit();
        res.status(200).json({"status": "success"})
    } catch (err) {
        // Rollback
        await connection.rollback();
        var messages="";
        //if(err.code=='ER_DUP_ENTRY'|| err.__type=='UsernameExistsException') messages="ユーザ情報は既に登録済みです";
        res.status(500).json({"status": "error","error": err.message,"Message":messages})
    } finally {
        connection.end();
        return
    };
};

module.exports = { selectUserManageByKey, insertUserManage, deleteUserManage };

