# jtbot

[![Greenkeeper badge](https://badges.greenkeeper.io/Raindeer44/jtbot.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/Raindeer44/jtbot.svg?branch=master)](https://travis-ci.org/Raindeer44/jtbot) [![Known Vulnerabilities](https://snyk.io/test/github/raindeer44/jtbot/badge.svg)](https://snyk.io/test/github/raindeer44/jtbot) [![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](https://raw.githubusercontent.com/Raindeer44/jtbot/master/LICENSE)

jtbot is a Node-based Twitter bot which automates the process of retweeting tweets of interest.

_This project was previously known as Jade-bot_

## Installation

### Set up the bot

```bash
$ git clone https://github.com/Raindeer44/jtbot.git
$ cd jtbot/
$ npm
$ npm test
```

jtbot is available on npm:

```bash
npm install -g jtbot
```

### Get API keys

Set up application keys for the Twitter account you want to use: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new). Add to the `.env` file:

* Consumer Key (API Key)
* Consumer Secret (API Secret)
* Access Token
* Access Token Secret

`.env` also needs the rate at which you want the bot to retweet (in minutes).

For example, `.env` might look something like

```
CONSUMER_KEY=Fw***********P9
CONSUMER_SECRET=TD************Cq
ACCESS_TOKEN=31**************UC
ACCESS_TOKEN_SECRET=r0************S2

TWITTER_RETWEET_RATE=30
```

### Start the bot

That's all the set up! Now just run

```bash
$ npm start
```

For continuous usage, either run on a server (if you happen to have one lying around) or deploy to Heroku, a serverless architecture or a similar service.

## Contributing

Please fork this repository and contribute back using pull requests.

Any contributions, large or small, major features, bug fixes and integration tests are welcomed and appreciated but will be thoroughly reviewed and discussed.

## FAQ

*Why doesn't jtbot favorite/like tweets anymore?*

Unfortunately automated favorites/likes are no longer allowed by the Twitter TOS. As such, functionality has been removed.

*Does my username need to go somewhere?*

Nope! The Twitter application keys are linked to the account.

### Links

This bot was created with the help of [Spences10](https://github.com/spences10)'s Node.js [Twitter bot bootstrap](https://github.com/spences10/twitter-bot-bootstrap), and with inspiration from [@amanhimself](https://twitter.com/amanhimself).
