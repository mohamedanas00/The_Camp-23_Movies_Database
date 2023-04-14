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
                res.send(`Movie with Name : ${[params.movie_name]} has been added`);
            } else {
                console.log(err);
            }
        })
    })
})

app.put('/cinema/movies', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
        }
        const { Id, movie_name, movie_length, movie_director } = req.body;
        conection.query('UPDATE thecamp_cinema SET movie_name=?,movie_length=?,movie_director=? WHERE id = ?', [movie_name, movie_length, movie_director, Id], (err, rows) => {
            if (!err) {
                res.send(`Movie with ID : ${[Id]} has been Updated`);
            } else {
                console.log(err);
            }
        })
    })
})

app.delete('/cinema/movies/:id', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) throw err;
        console.log("conection ✅");
        conection.query('Delete from thecamp_cinema WHERE Id =?', [req.params.id], (err, rows) => {
            if (!err) {
                res.send(`Movie with ID : ${[req.params.id]} has been removed`);
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
