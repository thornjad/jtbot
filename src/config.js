require('dotenv').config();

module.exports = {
   consumer_key: process.env.CONSUMER_KEY,
   consumer_secret: process.env.CONSUMER_SECRET,
   access_token: process.env.ACCESS_TOKEN,
   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
   retweet_rate: process.env.TWITTER_RETWEET_RATE,
   search_count: process.env.TWITTER_SEARCH_COUNT
};
