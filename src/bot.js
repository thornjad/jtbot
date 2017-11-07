const retweet = require('./retweet');
const config = require('./config');

const run = (): void => {
  retweet();
  setInterval(retweet, 3000000 * config.retweet_rate);
}

const test = (): void => {
  // same as run, but only a single run cycle
  retweet();
}

module.exports = {
  run: run,
  test, test
}
