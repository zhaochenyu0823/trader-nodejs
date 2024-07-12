// server/app.js

require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const user = require("./modules/user");
const action = require("./modules/mysqlAction");

const express = require("express");
const app = express();
//const app = express.Router();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST
app.get("/user", user.getUserAll);
app.get("/user/:userId", user.getUser);
app.post("/user", user.postUser);
app.put("/user/:userId", user.putUser);
app.delete("/user/:userId", user.deleteUser);

app.get("/userManage", action.selectUserManageByKey);
app.post("/userManage", action.insertUserManage);
app.delete("/userManage", action.deleteUserManage);


module.exports = app;