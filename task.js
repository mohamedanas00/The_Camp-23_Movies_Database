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


//work in port 5000
app.listen(5000, () => {
    console.log("ServerRunning on localhost:5000✅ ....");
})