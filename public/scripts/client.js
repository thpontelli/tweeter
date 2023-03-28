/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1679687034042
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1679773434042
    }
  ]

  const daysAgo = function(date) {
    const now = Math.floor(new Date().getTime())
    console.log(now);
    return Math.round((now - date) / (24 * 3600));
  };


  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of data) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      $('.tweet-container').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweetObject) {
    console.log("createdAT", tweetObject.created_at);
    const daysPosted = daysAgo(tweetObject.created_at);
    const $tweet = $(`<article>
    <header class="tweet-header">
    <div>
    <p><img class="image" src="${tweetObject.user.avatars}"/> ${tweetObject.user.name}</p>
    </div>
    <div>
    <p>${tweetObject.user.handle}</p>
    </div>
    </header>
    <div class="tweet-body">
    <p>${tweetObject.content.text}</p>
    </div>
    <footer class="tweet-footer">
    <p>${daysPosted} days ago</p>
    <div>
    <i class="icons fa-solid fa-flag"></i>
    <i class="icons fa-solid fa-retweet"></i> 
    <i class="icons fa-solid fa-heart"></i>
    </div>
    </footer>
    </article>
    `);
    return $tweet
  };
  
renderTweets(data);

});

