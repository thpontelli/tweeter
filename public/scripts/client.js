/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".error").hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
 
  const daysAgo = function(date) {
    const now = Math.floor(new Date().getTime())
    return Math.round((now - date) / (24 * 3600));
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    $('.tweet-container').empty();
    for (let tweet of tweets.reverse()) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      $('.tweet-container').append(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweetObject) {
    const daysPosted = daysAgo(tweetObject.created_at);
    const $tweet = $(`<article class="tweet-article">
    <header class="tweet-header">
    <div>
    <p><img class="image" src="${tweetObject.user.avatars}"/> ${tweetObject.user.name}</p>
    </div>
    <div>
    <p>${tweetObject.user.handle}</p>
    </div>
    </header>
    <div class="tweet-body">
    <p>${escape(tweetObject.content.text)}</p>
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
    <br>
    `);
    return $tweet
  };
  
  const loadTweet = () => {
    $.ajax({
      url: "/tweets",
      action: "GET"
    })
    .then((res) => {
      
      renderTweets(res);
      
    })
  }
  $('form').on("submit", (event) => {
    event.preventDefault();
    const data = $("form").serialize();
    const $text = $("#tweet-text").val();
    if ($text.length > 140) {
      $(".error").text("Please, keep short, there is a limit of 140 characters");
      $(".error").slideDown("slow").delay(1500).slideUp("slow");
      //alert("Please, keep short, there is a limit of 140 characters")
    }else if (!$text){
      $(".error").text("If you want to Tweet, you need to write something!");
      $(".error").slideDown("slow").delay(1500).slideUp("slow");
      //alert("If you want to Tweet, you need to write something!")
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data
      })
     .then(() => {
       loadTweet()
      })
      
      $("#form-id").trigger("reset");
    }
  })
  loadTweet();

});




