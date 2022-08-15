const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
require('dotenv').config()

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.use(express.static('public'));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);
const admin = require('./controllers/admin')(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
})

module.exports = app;