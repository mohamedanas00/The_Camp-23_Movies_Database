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
    database: "movies_database"
})
app.get('/cinema/movies',(req,res)=>{
    pool.getConnection((err,conection)=>{
      if(err){
        console.log(err);
      }  
      console.log("conection ✅");
      conection.query('SELECT * from thecamp_cinema',(err,rows)=>{
        if(!err){
            res.send(rows);
        }else{
            res.status(500).send(err);
            console.log(err);
        }
      })
    })
})
// app.get('/cinema/movies', (req, res) => {
//     try {
//         pool.query('SELECT * thecamp_cinema', function (check, rows) {
//             res.send(rows);
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// })
//work in port 5000
app.listen(5000, () => {
    console.log("ServerRunning on localhost:5000✅ ....");
})
