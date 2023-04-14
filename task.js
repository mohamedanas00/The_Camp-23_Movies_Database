// module Express
//module databse
const express = require("express");
const mysql = require("mysql");

//return interface
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "movies_database"
})
app.get('/cinema/movies', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
        }
        console.log("conection ✅");
        conection.query('SELECT * from thecamp_cinema', (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                res.status(500).send(err);
                console.log(err);
            }
        })
    })
})

app.post('/cinema/movies', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
        }
        const params = req.body;
        conection.query('INSERT INTO thecamp_cinema SET ?', params, (err, rows) => {
            if (!err) {
                res.send(`Movie with Name : ${[params.movie_name]}has been added`);
            } else {
                console.log(err);
            }
        })
    })
})
//work in port 5000
app.listen(5000, () => {
    console.log("ServerRunning on localhost:5000✅ ....");
})
