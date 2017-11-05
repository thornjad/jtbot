require('dotenv').config();

module.exports = {
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = {
  keys: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  },
  config: {
    queryString: process.env.QUERY_STRING,
    resultType: process.env.RESULT_TYPE,
    language: process.env.TWITTER_LANG,
    username: process.env.TWITTER_USERNAME,
    retweet: process.env.TWITTER_RETWEET_RATE * 1000 * 60,
    like: process.env.TWITTER_LIKE_RATE * 1000 * 60,
    quote: process.env.TWITTER_QUOTE_RATE * 1000 * 60,
    searchCount: process.env.TWITTER_SEARCH_COUNT,
    randomReply: process.env.RANDOM_REPLY
  }
}
