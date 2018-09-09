const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const reviewsController = require('./controllers/reviews.js');
const commentsController = require('./controllers/comments.js');
// const moviesController = require('./controllers/movies.js');
const Review = require('./models/review.js');
const Comment = require('./models/comment.js');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));


// Set up Template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// ROUTES
app.use('/', reviewsController);
app.use(commentsController);
// app.use(moviesController);


// Mongoose Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');


// Server
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
