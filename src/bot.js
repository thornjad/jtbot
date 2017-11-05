const retweet = require('./retweet');
const config = require('./config');

// main function -- retweet cool tweets
retweet();
setInterval(retweet, 3000000 * config.retweet_rate);
