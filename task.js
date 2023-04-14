// module Express
//module databse
const express = require("express");
const mysql = require("mysql");

//return interface
const app = express();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "Movies Database"
})

