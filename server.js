'use strict';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ...
require('dotenv').config({
  silent: true
});

const app = express();
const port = process.env.PORT || 8080;

const latestSearchSchema = new Schema({
  term: String,
  when: String
});

const LatestSearch = mongoose.model('LatestSearch', latestSearchSchema);

const mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/img-sal';
mongoose.connect(mongoURI);

app.set('views', path.join(_dirname, + 'views'));
app.set('view engine', 'pug');

// ...

app.listen(port, function(req, res) {
  console.log('App listening on port ' + port);
});
