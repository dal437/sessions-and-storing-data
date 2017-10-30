//app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const models = require('./db');

// Server constants
const PORT = 3000;
const sessionOptions = {
    secret: 'secretWord',
    saveUninitialized: false,
    resave: false,
};

// Configure appi
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));

// Set up routes
app.get('/movies', (req, res) => {
    const d = req.query.director;
    const q = {};
    if (d) {
        q.director = d;
    }
    models.Movie.find(q,
        (err, movies) => res.render('index.hbs', { movies }));
});

app.get('/movies/add', (_, res) => res.render('add.hbs'));
app.post('/movies/add', (req, res) => {
    const title = req.body.title;
    const year = req.body.year;
    const director = req.body.director;

    const movie = new models.Movie({ title, year, director });
    if (req.session.addedMovies) {
        req.session.addedMovies.push(movie.toObject());
    }
    else {
      req.session.addedMovies = [movie.toObject()];
    }
    movie.save(() => res.redirect('/movies'));
});

app.get('/mymovies', (req, res) =>
    res.render('mymovies.hbs', { movies: req.session.addedMovies }));

app.listen(3000);
