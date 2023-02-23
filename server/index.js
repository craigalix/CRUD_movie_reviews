const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDdata',
});
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.delete("/api/delete/:movieName", (req,res)=>{
    console.log("DELETE BACKEND")

    const name = req.params.movieName;
    console.log(name);
    const sqlDelete =
        "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err,result)=>{
        console.log(err);
        console.log(result.data);
        res.send(result);
    })
})

app.get('/api/get', (req,res)=>{
    console.log("GET BACKEND")

    const sqlGet = "SELECT * FROM movie_reviews";

    db.query(sqlGet, (err,result)=>{
        console.log(err);
        console.log(result.data);
        res.send(result);
    })
})

app.put("/api/update", (req, res)=> {
    console.log("Update");
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    console.log(movieName);
    console.log(movieReview);

    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [movieReview,movieName], (err,result)=>{
        console.log(err);
        console.log(result);
    })
})

app.post("/api/insert", (req, res)=> {
    console.log("BACKEND")
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName,movieReview], (err,result)=>{
        console.log(err);
        console.log(result);
    })
})

// // When people ask for www.***/ will activate below
// app.get('/', (req,res) => {
//     // use VALUES to declare for (params,...)
//     const sqlInsert = 
//     "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'Not Bad, Trippy');";

//     db.query(sqlInsert, (error,result) => {
//         res.send(error);
//     })
// });

app.listen(3420, () => {
    console.log("Running on port 3420");
});