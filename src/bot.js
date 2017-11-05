const retweet = require('./retweet');
const config = require('./config');

const run = (): void => {
  retweet();
  setInterval(retweet, 3000000 * config.retweet_rate);
}
