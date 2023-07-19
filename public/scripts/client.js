/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  console.log('I am inside the event handler');

  const createTweetElement = (tweetItem) => {
    const $tweetItem = $(`
    <article class="tweet-container">
      <header class="header-tweets">
        <div class="icon-name">
          <img id="tweeter-icon" src="${tweetData.user.avatars}"> 
          <output name="username" class="user">${tweetData.user.name}</output>
        </div>
        <output name="userhandle" class="userhandle">${tweetData.user.handle}</output>
      </header>
      <div class="tweet-label">
        <label><b>${tweetData.content.text}</b></label>
      </div>
      <div>
        <hr>
      </div>
      <footer class="footer-tweets">
        <label class="date-label" for="tweet-date"><b>${tweetData.created_at}</b></label>
        <div class="react-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
    return $tweetItem;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like => k.fn.init[article.tweet-container]
  $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});