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
//GET FOR TABLE thecamp_cinema
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
//EXtra
//return all movies recorded in the database with its reviews
app.get('/cinema', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
        }
        console.log("conection ✅");
        conection.query('SELECT thecamp_cinema .*, thecamp_movies_ratings . movie_review , thecamp_movies_ratings.date FROM  thecamp_cinema LEFT JOIN  thecamp_movies_ratings ON thecamp_movies_ratings.movie_id = thecamp_cinema.Id', (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                res.status(500).send(err);
                console.log(err);
            }
        })
    })
})
//----
//ADD FOR TABLE thecamp_cinema
app.post('/cinema/movies', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
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
//POST FOR TABLE thecamp_movies_ratings
app.post('/cinema/movies/ratings', (req, res) => {
    pool.getConnection((err, conection) => {
        if (err) {
            console.log(err);
        }
        const params = req.body;
        conection.query('INSERT INTO thecamp_movies_ratings SET ?', params, (err, rows) => {
            if (!err) {
                res.send(`Movie_review For movieId: ${[params.movie_id]} has been added`);
            } else {
                console.log(err);
            }
        })
    })
})
//UPDATE FOR TABLE thecamp_cinema
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
//DELETE FOR TABLE thecamp_cinema
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
