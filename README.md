# Jade-Bot

[![Build Status](https://travis-ci.org/Raindeer44/jade-bot.svg?branch=master)](https://travis-ci.org/Raindeer44/jade-bot) [![Known Vulnerabilities](https://snyk.io/test/github/raindeer44/jade-bot/badge.svg)](https://snyk.io/test/github/raindeer44/jade-bot) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Raindeer44/jade-bot/master/LICENSE)

Jade-bot is a Node.js Twitter bot which automates the process of Twittering for [@jmthorntonwhat](https://twitter.com/jmthorntonwhat). It basically favorites and retweets for me, among other small tasks.

This doesn't mean there's never a human behind my Twitter account, just some of my account.

## Installation

### Set up the bot

```bash
$ git clone https://github.com/raindeer44/jade-bot
$ cd jade-bot/
$ npm install
$ git update-index --assume-unchanged .env
```

### Get API keys

For the `SENTIMENT_KEY` you can get a new key at <https://market.mashape.com/vivekn/sentiment-3>. Your key is in the `REQUEST EXAMPLE`. Add this to the `.env` file.

Set up an application on the Twitter account you want to use: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new). Add to the `.env` file:

* Consumer Key (API Key)
* Consumer Secret (API Secret)
* Access Token
* Access Token Secret

`.env` also need your Twitter username and the rate at which you want the bot to retweet and favorite (in minutes).

For example, `.env` might look something like

```
CONSUMER_KEY=Fw***********P9
CONSUMER_SECRET=TD************Cq
ACCESS_TOKEN=31**************UC
ACCESS_TOKEN_SECRET=r0************S2
SENTIMENT_KEY=Gj************lF
TWITTER_USERNAME=jmthorntonwhat
TWITTER_RETWEET_RATE=30
TWITTER_FAVORITE_RATE=30
```

### Start the bot

That's all the set up! Now just run

```bash
$ npm start
```

For continuous usage, either run on a server (if you happen to have one lying around) or deploy to Heroku or a similar service.

## Contributing
Please fork this repository and contribute back using pull requests.

Any contributions, large or small, major features, bug fixes and integration tests are welcomed and appreciated but will be thoroughly reviewed and discussed.

### Links

This bot was created with the help of [Spences10](https://github.com/spences10)'s Node.js [Twitter bot bootstrap](https://github.com/spences10/twitter-bot-bootstrap), and with inspiration from [@amanhimself](https://twitter.com/amanhimself).
