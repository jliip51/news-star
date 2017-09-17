$(document).ready(() => {

  const getUpdatedArticleInfo = response => {
    console.log(response);
    $.ajax({
      type: "GET",
      url: "/"
    }).done(res => {
      console.log(res);
    });
  };

  $.get('/scrape', getUpdatedArticleInfo);

  //binds article id to comment form submit button in modal//
  $('#addComment').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let id = button.data('article')
    let modal = $(this)
    modal.find('#commentSubmit').attr('data-article', id);
  });


  $('#commentSubmit').on('click', function(event) {
    event.preventDefault();
    let id = $(this).data('article');

    let inputs = {
      username: $('#commentUsername').val().trim(),
      body:  $('#commentText').val().trim()
    }
    console.log(inputs);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/article/" + id,
      data: inputs
    }).done(data => {
      $("#commentUsername").val("");
      $("#commentText").val("");
    });
  });

  //binds article id to comment modal//
  $('#viewComments').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let id = button.data('article')
    console.log(id);
    $.ajax({
      type: "GET",
      url: "/article/" + id
    }).done(res => {
      console.log("response from server")
      console.log(res);
      // let commentDiv = $("<div>");
      // commentDiv.addClass("row")
      // commentDiv.append("<p>" + res.comments.body + "</p>");
      // commentDiv.append("<br><p>" +res.comments.username + "</p>");
      // commentDiv.append("<button class='btn btn-outline-danger btn-sm commentDelete' data-commentId=" + res.comments._id + "</button>")
      // commentDiv.append("<hr>");
      //
      // let modal = $("#viewComments");
      // modal.find('#commentBody').empty();
      // modal.find('#commentBody').html(commentDiv);
    });
  });
















});
