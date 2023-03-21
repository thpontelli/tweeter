$(document).ready(function() {
  
  $("#tweet-text").on("input", function() {
    let tweet = $(this).val();
    let tweetLength = $(this).val().length;
    let maxChars = 140;
    let tweetCounter = maxChars - tweetLength;

    const $counterElement = $(this).parent().parent().find(".counter");
    console.log($counterElement);
    $counterElement.text(tweetCounter);


    if (tweet.length <= maxChars) {
      //console.log("WITHIN LIMIT", tweetCounter);
      $counterElement.removeClass("limit-exceeded");

      
    } else {
      //console.log("EXCEEDED LIMIT", tweetCounter);
      $counterElement.addClass("limit-exceeded");
      
    }
    //console.log(tweet);
    //console.log(tweet.length);
  }); 

});


