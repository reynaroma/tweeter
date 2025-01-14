/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $container = $('.tweet-item-container');
    // empty the container after submission
    $container.empty();
    // iterate through the provided array
    for (const tweetItem of tweets) {
      // create a tweet element for each element in the array
      const $tweetItem = createTweetElement(tweetItem);
      // add the new tweet to the tweet container
      $container.prepend($tweetItem);
    }
    $('.tweet-item-container .date-label').each(function () {
      const timestamp = new Date($(this).attr('datetime'));
      $(this).text(timeago.format(timestamp, 'en_US', { allowFuture: false }));
    });
  };

  const createTweetElement = function (tweet) {
    /* Your code for creating the tweet element */
    const safeText = DOMPurify.sanitize(tweet.content.text);
    // Convert tweetCreatedAt to UTC time string
    const tweetCreatedAt = new Date(tweet.created_at).toUTCString();
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
          <label><b>${safeText}</b></label>
        </div>
        <div>
          <hr>
        </div>
        <footer class="footer-tweets">
          <label class="date-label timeago" datetime="${tweetCreatedAt}" for="tweet-date"><b></b></label>
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

  const loadTweets = function () {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      datatype: 'json'
    }).then((response) => {
      renderTweets(response);
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });

  };

  // add an event listener that listens for the submit event
  $('#create-tweet-id').on('submit', function (event) {

    // prevent the default behaviour of the submit event
    event.preventDefault();

    const tweetText = $(this).find('textarea').val();
    const $errorElement = $('.error-message');
    const $textarea = $('#tweet-text');

    // event listener for textarea if there's an input
    $textarea.on('input', function () {
      $errorElement.slideUp();
    });

    if (tweetText.trim() === '') {
      $errorElement.text('Error: Tweet cannot be empty');
      $errorElement.slideDown();
      return;
    } else if (tweetText.length > 140) {
      $errorElement.text('Error: Tweet cannot exceed 140 characters.');
      $errorElement.slideDown();
      return;
    } else {
      $errorElement.hide();
    }

    // serialize the form data
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      datatype: 'json',
    }).then((response) => {
      $('.counter').text('140');
      $(this)[0].reset();
      loadTweets();
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });
  });

  loadTweets();
});