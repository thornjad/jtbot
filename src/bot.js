const Twit = require('twit');
const uniqueRandArray = require('unique-random-array');
const config = require('./config');
const strings = require('./strings');

const bot = new Twit(config);

const retweetFrequencyInMinutes = 45;
const favoriteFrequencyInMinutes = 45;

const queryString = uniqueRandArray(strings.queryString);
const queryStringSubQuery = uniqueRandArray(strings.queryStringSubQuery);
const resultType = uniqueRandArray(strings.resultType);
const responseString = uniqueRandArray(strings.responseString);

// main bot function
retweet();

setInterval(retweet, 3000000 * retweetFrequencyInMinutes);
setInterval(favoriteTweet, 3000000 * favoriteFrequencyInMinutes);


function retweet() {
  var paramQueryString = queryString();
  paramQueryString += ' ' + queryStringSubQuery();
  var paramResultType = resultType();
  var params = {
      q: paramQueryString + paramBlockedStrings(),
      result_type: paramResultType, // mixed, recent, popular
      lang: 'en'
  };
  bot.get('search/tweets', params, function(err, data) {

    if (err) return callback(err);

    var tweets = data.statuses;
    var randomTweet = getRandomTweet(tweets);

    try {
      var retweetId = data.statuses[0].id_str;
      bot.post('statuses/retweet/:id', {
        id: randomTweet.id_str
      }, function(err, response) {
        if (response) {
          console.log('Rewteeted!', ' Query String: ' + paramQueryString);
        }

        if (err) {
          console.log('Retweet ERROR! Duplication maybe...: ', err, ' Query String: ' + paramQueryString);
        }
      });
    } catch (e) {
      console.log('retweetId ERROR! ', e.message, ' Query String: ' + paramQueryString);
      return;
    }
  });
}

var userStream = bot.stream('user');

userStream.on('follow', followed);

function followed(event) {
    console.log('Follow Event now RUNNING');
    var screenName = event.source.screen_name;

    var responseString = responseString();
    var find = 'screenName';
    var regex = new RegExp(find, "g");
    responseString = responseString.replace(regex, screenName);

    console.log(responseString);
    tweetToNewFollower(responseString);
}

function tweetToNewFollower(tweetTxt) {
    var tweet = {
        status: tweetTxt
    };

    var tweetUsername = tweetTxt.search(/@jmthorntonwhat/i);

    if (tweetUsername != -1) {
        console.log('Attempted to tweet self! Skipped');
    } else {
        bot.post('statuses/update', tweet, function(err, data, response) {
            if (err) {
                console.log('Cannot Reply to Follower. ERROR!: ' + err);
            } else {
                console.log('Reply to follower. SUCCESS!');
            }
        })
    }
}

function getRandomTweet(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function paramBlockedStrings() {
    var allBlockedStrings = '',
        arr = strings.blockedStrings,
        i, n
    for (i = 0, n = arr.length; i < n; i++) {
        allBlockedStrings += ' -' + arr[i];
    }
    return allBlockedStrings;
}
