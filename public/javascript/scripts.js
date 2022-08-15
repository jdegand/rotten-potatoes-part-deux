function deleteComment() {
  document.querySelectorAll('.delete-comment').forEach((commentElement) => {
      commentElement.addEventListener('click', (e) => {
          console.log("click!")
          let commentId = e.target.getAttribute('data-comment-id')
          let reviewId = e.target.getAttribute('data-comment-reviewId')
          let movieId = e.target.getAttribute('data-comment-movieId')
          // Same code used to add click handlers, except we call delete here
          axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
              .then(response => {
                  console.log(response)
                  comment = document.getElementById(commentId)
                  comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
              })
              .catch(error => {
                  console.log(error)
                  alert('There was an error deleting this comment.')
              });
      })
  })
}

// Only run this if we find the new-comment element
if (document.getElementById('new-comment')) {

    // listen for a form submit event
    document.getElementById("new-comment").addEventListener("submit", e => {
        // prevent the default form behavior
        e.preventDefault();
  
        // serialize the form data into an object
        let comment = {};
        const inputs = document.getElementsByClassName('form-control');
        for (var i = 0; i < inputs.length; i++) {
          comment[inputs[i].name] = inputs[i].value;
        }

        console.log(comment)

        const movieId = comment.movieId;
        axios.post(`/movies/${movieId}/reviews/comments`, comment)
          .then(function (response) {
            // wait for the success response from the server
            console.log("response: ", response);
            // remove the information from the form
            document.getElementById('new-comment').reset();
            // display the data as a new comment on the page
            document.getElementById('comments').insertAdjacentHTML('afterbegin',
            `<div class="card" id="${response.data.comment._id}">
               <div class="card-block">
                 <h4 class="card-title">${response.data.comment.title}</h4>
                 <p class="card-text">${response.data.comment.content}</p>
                 <button class="btn btn-link delete-comment" data-comment-id="${response.data.comment._id}" data-comment-reviewId="${response.data.comment.reviewId}" data-comment-movieId="${movieId}">Delete</button>
               </div>
             </div>`
            );
            deleteComment();
        })

    });

}

// Still need to call deleteComment for all other comments on the page when we load a review
if (document.querySelectorAll('.delete-comment')) {
  deleteComment();
}

if (document.querySelectorAll('.delete-review')) {
  document.querySelectorAll('.delete-review').forEach((reviewElement) => {
      reviewElement.addEventListener('click', (e) => {
          console.log("click!")
          let reviewId = e.target.getAttribute('data-review-id')

          axios.delete(`/admin/reviews/${reviewId}`)
              .then(response => {
                  console.log("response: ",response);
                  review = document.getElementById(reviewId)
                  review.parentNode.removeChild(review); // OR review.style.display = 'none';
              }).catch((err) => {
                  console.log(err)
                  alert('There was an error deleting this review.')
              })
      })
  })
}


/* cant delete newly added comments without refresh 

if (document.querySelectorAll('.delete-comment')) {
    // Add a click event listener for each comment
    document.querySelectorAll('.delete-comment').forEach((commentElement) => {
        commentElement.addEventListener('click', (e) => {
            console.log("click!")
            // Store all of the attributes into variables
            let commentId = e.target.getAttribute('data-comment-id')
            let reviewId = e.target.getAttribute('data-comment-reviewId')
            let movieId = e.target.getAttribute('data-comment-movieId')

            axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
            .then(response => {
                console.log(response)
                comment = document.getElementById(commentId)
                comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
            })
            .catch(error => {
                console.log(error)
                alert('There was an error deleting this comment.')
            });
        })
    })
}

*/