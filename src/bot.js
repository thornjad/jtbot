// Dependencies
var twit = require('twit')
var uniqueRandArray = require('unique-random-array')
var config = require('./config')
var strings = require('./helpers/strings')

var Twitter = new twit(config)

var retweetFrequencyInMinutes = 5
var favoriteFrequencyInMinutes = 5

var queryString = uniqueRandArray(strings.queryString)
var queryStringSubQuery = uniqueRandArray(strings.queryStringSubQuery)
var resultType = uniqueRandArray(strings.resultType)
var responseString = uniqueRandArray(strings.responseString)

// main bot function
retweet()
favoriteTweet()

setInterval(retweet, 60000 * retweetFrequencyInMinutes)
setInterval(favoriteTweet, 60000 * favoriteFrequencyInMinutes)


var retweet = function() {
    var paramQueryString = queryString()
    paramQueryString += queryStringSubQuery()
    var paramResultType = resultType()
    var params = {
        q: paramQueryString + paramBlockedStrings(),
        result_type: paramResultType, // mixed, recent, popular
        lang: 'en'
    };
    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            try {
                var retweetId = data.statuses[0].id_str
            } catch (e) {
                console.log('retweetId ERROR! ', e.message, ' Query String: ' + paramQueryString)
                return;
            }

            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('RETWEETED!', ' Query String: ' + paramQueryString)
                }

                if (err) {
                    console.log('RETWEET ERROR! Duplication maybe...: ', err, ' Query String: ' + paramQueryString)
                }
            });
        } else {
            console.log('UNKNOWN SEARCH ERROR...')
        }
    });
}


var favoriteTweet = function() {
    var paramQueryString = queryString()
    paramQueryString += queryStringSubQuery()
    var paramResultType = resultType()
    var params = {
        q: paramQueryString + paramBlockedStrings(),
        result_type: paramResultType,
        lang: 'en'
    }

    // find the tweet
    Twitter.get('search/tweets', params, function(err, data) {

        var tweet = data.statuses;
        var randomTweet = getRandomTweet(tweet);

        if (typeof randomTweet != 'undefined') {
            Twitter.post('favorites/create', {
                id: randomTweet.id_str
            }, function(err, response) {
                if (err) {
                    console.log('CANNOT BE FAVORITE... Error: ', err, ' Query String: ' + paramQueryString)
                } else {
                    console.log('FAVORITED... Success!!!', ' Query String: ' + paramQueryString)
                }
            })
        }
    })
}



// STREAM API for interacting with a USER =======
var userStream = Twitter.stream('user')

userStream.on('follow', followed)

function followed(event) {
    console.log('Follow Event now RUNNING')
    var screenName = event.source.screen_name

    var responseString = responseString()
    var find = 'screenName'
    var regex = new RegExp(find, "g")
    responseString = responseString.replace(regex, screenName)

    console.log(responseString)
    tweetToNewFollower(responseString)
}

function tweetToNewFollower(tweetTxt) {
    var tweet = {
        status: tweetTxt
    };

    var tweetUsername = tweetTxt.search(/@jmthorntonwhat/i)

    if (tweetUsername != -1) {
        console.log('Attempted to tweet self! Skipped')
    } else {
        Twitter.post('statuses/update', tweet, function(err, data, response) {
            if (err) {
                console.log('Cannot Reply to Follower. ERROR!: ' + err)
            } else {
                console.log('Reply to follower. SUCCESS!')
            }
        })
    }
}

function getRandomTweet(arr) {
    var index = Math.floor(Math.random() * arr.length)
    return arr[index]
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
