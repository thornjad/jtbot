const Twit = require('twit');
const uniqueRandArray = require('unique-random-array');
const strings = require('./strings');
const config = require('./config');
const isReply = require('./helpers/isReply');

const bot = new Twit(config.keys);

const queryString = uniqueRandArray(strings.queryString);
const queryStringSubQuery = uniqueRandArray(strings.queryStringSubQuery);
const resultType = uniqueRandArray(strings.resultType);
const responseString = uniqueRandArray(strings.responseString);

const retweet = () => {
  const query = queryString();

  bot.get(
    'search/tweets', // api
    { // params
      q: query + getBlockedStrings(),
      result_type: paramResultType, // mixed, recent, popular
      lang: 'en'
    },
    (err, data, response) => { // callback
      try {
        if (err) {
          console.error(`ERR: Cannot search tweet!`);
          throw err;
        } else {
          const r = rando(data.statuses.length);

          if (!isReply(data.statuses[r])) {
            let retweetId = data.statuses[r].id_str;

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
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  );
}

const rando = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

const getBlockedStrings = () => {
  let blocked = '';
  for (let term of strings.blockedStrings) {
    blocked += ` -${term}`;
  }
  return blocked;
}
