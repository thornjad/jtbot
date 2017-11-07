const Twit = require('twit');
const uniqueRandArray = require('unique-random-array');
const strings = require('./strings');
const config = require('./config');
const isReply = require('./helpers/isReply');

const bot = new Twit(config);

const queryString = uniqueRandArray(strings.queryString);
const resultType = uniqueRandArray(strings.resultType);

const retweet = () => {
  const query = queryString();

  bot.get('search/tweets', // api
  { // params
    q: query + getBlockedStrings(),
    result_type: resultType(), // mixed, recent, popular,
    filter: 'safe',
    lang: 'en',
    count: config.search_count
  }, (err, data, response) => {
    // callback
    try {
      if (err) {
        console.error(`ERR: Cannot search ${query}`);
        console.error(err);
      }

      if (data.statuses.length < 1) {
        console.log(`Query did not return any results:`);
        console.log(data.search_metadata);
      } else {
        const r = rando(data.statuses.length);
        if (!isReply(data.statuses[r])) {
          const retweetId = data.statuses[r].id_str;

          bot.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
            if (err) {
              console.error('Unable to retweet');
              console.error(err);
            } else if (response) {
              console.log(`SUCCESS: RT: ${data.statuses[r].text}\nRANDO ID: ${r}\n`);
            } else {
              console.log(`Bot returned no error, yet no response? Don't confuse me like this`);
            }
          });
        } else {
          console.log('Tweet was a reply, not retweeting');
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      console.log('Retweet run cycle done, waiting for next');
    }
  });
};

const rando = len => {
  return Math.floor(Math.random() * len);
};

const getBlockedStrings = () => {
  let blocked = '';
  for (let term of strings.blockedStrings) {
    blocked += ` -${term}`;
  }
  return blocked;
};

module.exports = retweet;