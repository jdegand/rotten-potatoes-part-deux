module.exports = function (app) {
    
    const Review = require('../models/review');
    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb(process.env.API_KEY_V3)

    app.get('/movies', (req, res) => {
        moviedb.upcomingMovies().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

    /*
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
          moviedb.movieVideos({ id: req.params.id }).then(video => {
            //console.log(video)
            movie.trailer_youtube_id = video.results[0].key;
            //console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);
      
            res.render('movies-show', { movie: movie });
          }).catch(console.error);
        }).catch(console.error);
    });
    */

    // SHOW
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            moviedb.movieVideos({ id: req.params.id }).then(video => {
                movie.trailer_youtube_id = video.results[0].key;
                //console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);
                // FIND THIS MOVIE'S REVIEWS
                Review.find({ movieId: req.params.id }).lean().then(reviews => {
                    // THEN RENDER THE MOVIES-SHOW TEMPLATE
                    res.render('movies-show', { movie: movie, reviews: reviews });
                }).catch(console.error);
            }).catch(console.error);
        }).catch(console.error);
    })
    

}