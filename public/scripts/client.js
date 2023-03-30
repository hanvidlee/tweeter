/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];


  const createTweetElement = function(tweet) {
    const { user, content, created_at } = tweet;
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
    <p class="posted-message">${content.text}}</p>
    <footer>
      <span class="date-posted">posted ${created_at} days ago</span>
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

    $('.create-tweet').on('submit', function(event) {
      event.preventDefault();
      const input = $('#tweet-text').val();
      if(input.trim() === ""){
        alert("your tweet needs characters")
      } else if (!checkTweetLength(input)){
        alert("too many characters")
      }
      if (checkTweetLength($('.create-tweet textarea').val())) {
        $.ajax({
          url: "/tweets",
          method: "POST",
          data: $("form").serialize()
        }).done(console.log(input));
      }
      });
});

// const $tweet = createTweetElement(tweetData);