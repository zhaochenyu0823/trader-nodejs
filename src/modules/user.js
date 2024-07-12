// server/modules/user.js

require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected(user)');
});


// GET 全件
const getUserAll = (req, res) => {
    const query = "SELECT * FROM user";
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
        //connection.end();
    });
};

// GET userId=xxx
const getUser = (req, res) => {
    const query = "SELECT * FROM user WHERE userId = ?";
    const params = [req.params.userId];
    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(400).json({"error": error.message})
            //throw error;
        }
        res.send(results);
    });
};

// POST
const postUser = (req, res) => {
    console.log(req.body);
    const query = "INSERT INTO user (id, userId, userName, password, _lock, privilege, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [req.body.id, req.body.userId, req.body.userName, req.body.password, req.body._lock, req.body.privilege, req.body.status];
    connection.query(query, params, function(error, results, fields)  {
        if (error) {
            return res.status(500).json({"error": error.message})
            //throw error;
        }
        res.send(results);
    });
};


const putUser = (req, res) => {
    const query = "UPDATE user SET userName = ? WHERE userId = ?";
    const params = [req.body.userName, req.params.userId];
    connection.query(query, params, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
};

const deleteUser = (req, res) => {
    const query = "DELETE FROM user WHERE userId = ?";
    const params = [req.params.userId];
    connection.query(query, params, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
};

module.exports = { getUserAll, getUser, postUser, putUser, deleteUser };

