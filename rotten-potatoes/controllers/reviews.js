const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');


app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id)
    .then(review => {
      Comment.find({ reviewId: req.params.id })
        .then(comments => {
          console.log(comments);
          // Respond with the template with both values
          res.render('reviews/reviews-show', { review: review, comments: comments })
        })

  }).catch((err) => {
    console.log(`Error: ${err.message}`);
  })
});


// CREATE
app.get('/review/new', (req, res) => {
  res.render('reviews/reviews-new', {});
});


app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review.rating);
    res.redirect(`reviews/${review._id}`); //Redirect to reviews/:id
  }).catch((err) => {
    console.log(`Error: ${err.message}`);
  });
});



// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    res.render('reviews/reviews-edit', {review: review});
  })
});

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// Delete
app.delete('/reviews/:id', (req, res) => {
  console.log('DELETE review');
  Review.findByIdAndRemove(req.params.id)
    .then((review) => {
      res.redirect('/');
    }).catch((err) => {
    console.log(`Error: ${err.message}`);
  })
});

module.exports = app;
