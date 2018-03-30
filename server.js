var express    = require('express');
var app        = express();
var session = require('express-session');

// import oauth module
var oauth = require('oauth').OAuth;

if(!process.env.SESSION_SECRET || !process.env.CONSUMER_KEY || !process.env.CONSUMER_SECRET) {
  console.log('missing SESSION_SECRET, CONSUMER_KEY or CONSUMER_SECRET');
  return;
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
  }
}));

// 3000番を指定
var port = process.env.PORT || 3000;

var router = express.Router();

var CALLBACK_URL = 'http://localhost:3000/auth/twitter/callback';
var REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token';
var ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token';

var oa = new oauth(
  REQUEST_TOKEN_URL,
  ACCESS_TOKEN_URL,
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0',
  CALLBACK_URL,
  'HMAC-SHA1'
);

router.get('/twitter', function(req, res) {
  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error) {
      console.log(error);
      res.send('request token error');
    } else {
      req.session.oauth ={};
      req.session.oauth.token = oauth_token;
      console.log('oauth.token: ' + req.session.oauth.token);
      req.session.oauth.token_secret = oauth_token_secret;
      console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
    }
  });
});

router.get('/twitter/callback', function(req, res, next) {
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth = req.session.oauth;
    oa.getOAuthAccessToken(
      oauth.token,
      oauth.token_secret,
      oauth.verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results) {
        if(error) {
          console.log(error);
          res.send('oauth token error');
        } else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;
          console.log(results);
          res.send('SUCCCCCCESSSSSSSSS');
        }
      });
  } else {
    next(new Error('unlikely'));
  }
});

app.use('/auth', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);

