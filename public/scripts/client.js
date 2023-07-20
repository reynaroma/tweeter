/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  console.log('I am inside the event handler');

  // const createTweetElement = function(tweet) {
  //   /* Your code for creating the tweet element */
  //   // ...
  //   let $tweet = $(`
  //     <article class="tweet-container">
  //       <header class="header-tweets">
  //         <div class="icon-name">
  //           <img id="tweeter-icon" src="${tweetData.user.avatars}"> 
  //           <output name="username" class="user">${tweetData.user.name}</output>
  //         </div>
  //         <output name="userhandle" class="userhandle">${tweetData.user.handle}</output>
  //       </header>
  //       <div class="tweet-label">
  //         <label><b>${tweetData.content.text}</b></label>
  //       </div>
  //       <div>
  //         <hr>
  //       </div>
  //       <footer class="footer-tweets">
  //         <label class="date-label" for="tweet-date"><b>${tweetData.created_at}</b></label>
  //         <div class="react-icons">
  //           <i class="fa-solid fa-flag"></i>
  //           <i class="fa-solid fa-retweet"></i>
  //           <i class="fa-solid fa-heart"></i>
  //         </div>
  //       </footer>
  //     </article>
  //   `);
  //   return $tweet;
  // };

  // // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // };

  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like => k.fn.init[article.tweet-container]
  // $('.tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  // Fake data taken from initial-tweets.json
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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $container = $('.tweet-item-container');
    // iterate through the provided array
    for (const tweetItem of tweets) {
      // create a tweet element for each element in the array
      const $tweetItem = createTweetElement(tweetItem);
      // add the new tweet to the tweet container
      $container.prepend($tweetItem);
    }
  };

  const createTweetElement = function (tweet) {
    /* Your code for creating the tweet element */
    // ...
    let $tweet = $(`
      <article class="tweet-container">
        <header class="header-tweets">
          <div class="icon-name">
            <img id="tweeter-icon" src="${tweet.user.avatars}"> 
            <output name="username" class="user">${tweet.user.name}</output>
          </div>
          <output name="userhandle" class="userhandle">${tweet.user.handle}</output>
        </header>
        <div class="tweet-label">
          <label><b>${tweet.content.text}</b></label>
        </div>
        <div>
          <hr>
        </div>
        <footer class="footer-tweets">
          <label class="date-label" for="tweet-date"><b>${tweet.created_at}</b></label>
          <div class="react-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // add an event listener that listens for the submit event
  $('#create-tweet-id').on('submit', function (event) {
    alert('Handler for submit called.');
    // prevent the default behaviour of the submit event
    event.preventDefault();
    // serialize the form data
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      datatype: 'json',
    }).then((response) => {
      console.log('Success:', response);
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });
  });

  const loadTweets = function () {
    alert('You are in the GET request');
    $('.button-tweet').click('click', function() {
      console.log('Button clicked, performing ajax call GET REQUEST...');
      $.ajax({
        method: 'GET',
        url: '/tweets',
        datatype: 'json'
      }).then((response) => {
        renderTweets(response);
        console.log(response);
      }).catch((error) => {
        console.error('Error:', error.status, error.responseText);
      });
    });
  };
  loadTweets();
});