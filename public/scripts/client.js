/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweet) {
  const $tweet = $(`<article>
        <header>
          <div class="left-header">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s photo" />
            <span class="name">${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>

        <p>${tweet.content.text}</p>

        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class="footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`);
  return $tweet;
}

const renderTweets = function(tweets) {

  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet)
  }

}

const submitFom = function() {
  const $form = $(`form`);
  $form.on("submit", function(event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val().trim();

    if (!tweetText) {
      alert('Tweet cannot be empty!');
      return;
    }
    if (tweetText.length > 140) {
      alert('Tweet is too long!');
      return;
    }
    $.ajax({
      type: 'POST',
      url: '/api/tweets',
      data: $(this).serialize(),
      success: function() {
        $('#tweet-text').val('');
        $('.counter').text('140');
        loadTweets();
      },
      error: function(err) {
        console.error('Error posting tweet:', err);
      }
    });
  });
}

const loadTweets = function() {

  $('#tweets-container').empty();
  $.get('/api/tweets', function(tweets) {
    renderTweets(tweets);
  });

}

$(document).ready(function() {
  submitFom();
  loadTweets();
});