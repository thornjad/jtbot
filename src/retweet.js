const Twit = require('twit');
const uniqueRandArray = require('unique-random-array');
const strings = require('./strings');
const config = require('./config');
const isReply = require('./helpers/isReply');

const bot = new Twit(config.keys);

const queryString = uniqueRandArray(strings.queryString);
const queryStringSubQuery = uniqueRandArray(strings.queryStringSubQuery);
const resultType = uniqueRandArray(strings.resultType);
const responseString = uniqueRandArray(strings.responseString);

const retweet = () => {
  const query = queryString();
  var paramResultType = resultType();
  var params = {
      q: query + paramBlockedStrings(),
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
          console.log('Rewteeted!', ' Query String: ' + query);
        }

        if (err) {
          console.log('Retweet ERROR! Duplication maybe...: ', err, ' Query String: ' + query);
        }
      });
    } catch (e) {
      console.log('retweetId ERROR! ', e.message, ' Query String: ' + query);
      return;
    }
  });
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
