// @flow

const Twit = require('twit');
const uniqueRandArray = require('unique-random-array');
const strings = require('./strings');
const config = require('./config');
const isReply = require('./helpers/isReply');

const bot = new Twit(config);

const queryString = uniqueRandArray(strings.queryString);
const resultType = uniqueRandArray(strings.resultType);

const retweet = (): void => {
  const query: string = queryString();

  bot.get(
    'search/tweets', // api
    { // params
      // q: query + getBlockedStrings(),
      q: 'Twitter',
      result_type: resultType(), // mixed, recent, popular,
      filter: 'safe',
      lang: 'en',
      count: config.search_count
    },
    (err, data, response) => { // callback
      try {
        if (err) {
          console.error(`ERR: Cannot search tweet!`);
          throw err;
        } else {
          const r: number = rando(data.statuses.length);
          if (!isReply(data.statuses[r])) {
            console.log(data.statuses[r]);
            const retweetId: string = data.statuses[r].id_str;

            bot.post(
              'statuses/retweet/:id',
              {
                id: retweetId
              }, (err, response) => {
                if (err) {
                  console.error('Unable to retweet');
                  throw err;
                } else if (response) {
                  console.log(`
                      SUCCESS: RT: ${data.statuses[r].text}\nRANDO ID: ${r}
                    `);
                }
              }
            );
          } else {
            console.log('Tweet was a reply, skipping retweet');
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        console.log('Retweet run completed, waiting for next');
      }
    }
  );
}

const rando = (len: number): number => {
  return Math.floor(Math.random() * len);
}

const getBlockedStrings = (): string => {
  let blocked = '';
  for (let term of strings.blockedStrings) {
    blocked += ` -${term}`;
  }
  return blocked;
}

module.exports = retweet;
