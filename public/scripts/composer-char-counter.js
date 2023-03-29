$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let charactersLength = $(this).val().length;
    let remainingChacters = 140 - charactersLength;
    if (remainingChacters < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black");
    }
    $('.counter').text(remainingChacters);
  });
});