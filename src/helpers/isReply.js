// @flow

const isReply = (tweet: Object): boolean =>
    /^RT/i.test(tweet.text) ||
    tweet.is_quote_status ||
    tweet.retweeted_status ||
    tweet.in_reply_to_status_id ||
    tweet.in_reply_to_status_id_str ||
    tweet.in_reply_to_user_id ||
    tweet.in_reply_to_user_id_str ||
    tweet.in_reply_to_screen_name;

module.exports = isReply
