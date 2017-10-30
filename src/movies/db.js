// db.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const MONGO_URI = 'mongodb://localhost/hw05';

//my schema goes here!
const MovieSchema = new Schema({
  title: String,
  year: Number,
  director: String,
});

const Movie = mongoose.model('Movie', Movie Schema);

mongoose.connect(MONGO_URI);

module.exports = {
  Movie,
};
