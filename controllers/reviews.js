const Review = require('../models/review');
const Comment = require('../models/comment')

module.exports = function(app) {
    app.get('/', (req, res) => {
        Review.find()
          .then(reviews => {
    
            var database=[];
            for(var i=0;i<reviews.length;i++)
            {
                database[i]=reviews[i].toObject();
            }
    
            res.render('reviews-index', { reviews: database });
          })
          .catch(err => {
            console.log(err);
          })
    })
    
    //NEW /reviews/new 
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        //res.render('reviews-new', {title: "New Review"});
        res.render('reviews-new', { movieId: req.params.movieId }) 
    })
    
    /*
        app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
    
          console.log(review);
          res.redirect(`/reviews/${review._id}`)
        }).catch((err) => {
          console.log(err.message);
        })
    })

    */

    // CREATE
    app.post('/movies/:movieId/reviews', (req, res) => {
      Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/movies/${review.movieId}`); // Redirect to movies/:id
      }).catch((err) => {
          console.log(err.message);
      })
    })

      // SHOW /reviews/:id 
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      review = review.toObject();
      Comment.find({ reviewId: req.params.id }).then(comments => {
        comments.reverse(); // add timestamps to the model & sort by updatedAt to replace
        var database=[];
        for(var i=0;i<comments.length;i++)
        {
            database[i]=comments[i].toObject();
        }
      
        res.render('reviews-show', { review: review, comments: database })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });

  /*
    app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      review = review.toObject();
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values

        var database=[];
        for(var i=0;i<comments.length;i++)
        {
            database[i]=comments[i].toObject();
        }
      
        res.render('reviews-show', { review: review, comments: database })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });
  */

    //EDIT
    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, function(err, review) {
        review = review.toObject();
        res.render('reviews-edit', {review: review, title: "Edit Review"});
      })
    })
    
    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          //res.redirect(`/reviews/${review._id}`)
          res.redirect(`/movies/${review.movieId}/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })
    
    // DELETE
    app.delete('/movies/:movieId/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        //res.redirect('/');
        res.redirect(`/movies/${review.movieId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
};