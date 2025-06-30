/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(`<article>
        <header>
          <div class="left-header">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s photo" />
            <span class="name">${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>

        <p>${escapeText(tweet.content.text)}</p>

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
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

const submitForm = function() {
  const $form = $('form');
  const $errorBox = $('.tweet-error');
  const $errorText = $('.tweet-error__text');
  const $textarea = $('#tweet-text');
  const $counter = $('.counter');

  const showError = msg => $errorText.text(msg) && $errorBox.slideDown();
  const hideError = () => $errorBox.slideUp();

  // Hide on input
  $textarea.on('input', hideError);

  $form.on('submit', function(event) {
    event.preventDefault();

    hideError();

    const text = $textarea.val().trim();

    if (text.length === 0) {
      return showError('❌ Your tweet cannot be empty.');
    }
    if (text.length > 140) {
      return showError('❌ Your tweet is too long (max 140).');
    }

    $.post('/api/tweets', $form.serialize())
      .done(() => {
        $textarea.val('');
        $counter.text('140');
        loadTweets();
      })
      .fail(() => showError('⚠️ Could not post.'));
  });

  hideError();
};



const loadTweets = function() {

  $.get('/api/tweets', function(tweets) {
    renderTweets(tweets);
  });

}

$(document).ready(function() {
  submitForm();
  loadTweets();
});