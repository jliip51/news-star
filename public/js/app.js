$(document).ready(() => {

  const getUpdatedArticleInfo = response => {
    console.log(response);
    $.ajax({type: "GET", url: "/"}).done(res => {
    });
  };

  $.get('/scrape', getUpdatedArticleInfo);

  //binds article id to comment form submit button in modal//
  $(document).on('click', '#addCommentModal', function() {
    const id = $(this).data('article');
    $('#articleIdField').data('article', id);
    $('#addComment').modal('show');
  });

  //Sends AJAX post to server to add comment//
  $('#commentSubmit').on('click', function(event) {
    event.preventDefault();
    const id= $('#articleIdField').data('article');
    const username = $('#commentUsername').val().trim();
    const body = $('#commentText').val().trim();

    if (username === "" || body === "") {
      $('#alert').append('<p>All fields must be fill out to complete comment submission');
    } else {
    const inputs = {
      username: username,
      body: body
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/article/" + id,
      data: inputs
    }).done(data => {
      $("#commentUsername").val("");
      $("#commentText").val("");
      $("#alert").empty();
      $("#addComment").modal('hide');
    }).fail(error => {
      console.log(error);
    });
  }
  });

  const renderComments = id => {
    console.log(id);
    $.ajax({
      type: "GET",
      url: "/article/" + id
    }).done(res => {
      console.log(res);
      const commentsArray = res[0].comments;

      $('#viewComments').find('#commentsBody').empty();

      commentsArray.forEach(comment => {

        let commentDiv = $("<div>");
        commentDiv.addClass("commentRow");
        commentDiv.append("<p class='commentTitle'>" + comment.body + "</p>");
        commentDiv.append("<button class='btn btn-outline-primary btn-sm commentDelete' data-articleId='" + res[0]._id + "' data-commentId='" + comment._id + "'>Delete</button>");
        commentDiv.append("<p class='commentBy'>Posted By: " + comment.username + "</p>");
        commentDiv.append('<hr>')

        $('#viewComments').find('#commentsBody').append(commentDiv);
      });
    }).fail(error => {
      console.log(error);
    });
  };

  //binds article id to comment modal//
  $(document).on('click', '#viewCommentModal', function() {
    const id = $(this).data('article');
    $("#viewComments").modal('show');
    renderComments(id);
  });

  $(document).on('click', '.commentDelete', function() {

    const commentId = $(this).data('commentid');
    const articleId = $(this).data('articleid');

    $.ajax({
      type: "PUT",
      url: "/comment/remove",
      data: {
        commentId: commentId,
        articleId: articleId
      }
    }).done(res => {
      console.log(res);
      renderComments(articleId);
    });
  });

});
