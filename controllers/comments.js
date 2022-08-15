const Comment = require('../models/comment');

module.exports = (app) => {


    /* 
    app.post('/movies/:movieId/reviews/comments', (req, res) => {
      Comment.create(req.body).then((comment) => {
        console.log(comment)
        res.redirect(`/movies/${req.body.movieId}/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });
    */

    // CREATE Comment  /movies/:movieid/reviews/:reviewId/comments wasn't working
    app.post('/movies/:movieid/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        console.log(comment)
        res.status(200).send({ comment: comment });
      }).catch((err) => {
        res.status(400).send({ err: err })
      })
    })

    /* DELETE
    app.delete('/movies/:movieId/reviews/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
          res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
    */

    app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', (req, res) => {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then(comment => {
        res.status(200).send(comment);
      }).catch((err) => {
        console.log(err.message);
        res.status(400).send(err)
      })
    })

}