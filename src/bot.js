const config = require('./config');
const retweet = require('./retweet');

const retweetFrequencyInMinutes = 45;

// main function -- retweet cool tweets
retweet();
setInterval(retweet, 3000000 * retweetFrequencyInMinutes);
