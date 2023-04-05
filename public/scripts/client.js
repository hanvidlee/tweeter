/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const safe = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  const time = timeago.format(created_at, "en_US");
  let $tweet = $('<article>');
  // ...
  let $tweetContent = `<article class="posted-tweets">
  <header class="posted-header">
    <div>
      <img class="posted-avatar" src="${user.avatars}">
      <p class="user">${user.name}</p>
    </div>
    <p class="handle">${user.handle}</p>
  </header>
  <p class="posted-message">${safe(content.text)}</p>
  <footer>
    <span class="date-posted">${time}</span>
    <div class="icons">
      <i class="fa-solid fa-flag" id="flag"></i>
      <i class="fa-solid fa-heart"id="heart"></i>
      <i class="fa-solid fa-retweet" id="retweet"></i>
    </div>
  </footer>
</article>`;
  $tweet = $tweet.append($tweetContent);
  return $tweet;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((tweet) => {
    let tempTweet = createTweetElement(tweet);
    $('.posted-section').prepend(tempTweet);
  });
};

function checkTweetLength(input) {
  const maxLength = 140;
  return input.length <= maxLength;
}

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  }).done(renderTweets);
};

$(document).ready(function() {

  loadTweets();

  $('.create-tweet').on('submit', function(event) {
    event.preventDefault();
    const input = $('#tweet-text').val();
    if (input.trim() === "") {
      $("#error-message").text("Your tweet needs characters").slideDown();
    } else if (!checkTweetLength(input)) {
      $("#error-message").text("Too many characters").slideDown();
    }
    if (checkTweetLength($('.create-tweet textarea').val())) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("form").serialize()
      }).then(function() {
        $('#tweet-text').val("");
        $('.counter').val(140);
        $('.posted-section').empty();
        $("#error-message").slideUp();
        loadTweets();
      });
    }
  });
});