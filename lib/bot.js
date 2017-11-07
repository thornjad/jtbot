const retweet = require('./retweet');
const config = require('./config');

const run = () => {
  retweet();
  setInterval(retweet, 3000000 * config.retweet_rate);
};

const test = () => {
  // same as run, but only a single run cycle
  retweet();
};

module.exports = {
  run: run,
  test, test
};