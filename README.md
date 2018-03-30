# Node twitter oauth sample project
## Getting start
1. Setup your app in twitter
 https://apps.twitter.com/
 Fill 'Callback URL' with random url. We override it but it is needed.
2. Get your app's consumer_key and consumer_secret
 You can find "Keys and Access Tokens" tab on your twitter app page.
3. Clone this project.
 ```bash
 git clone git@github.com:lamlam/node-twitter-oauth.git
 cd node-twitter-oauth
 ```
4. Setup project
 ```bash
 npm install
 ```
5. Start Server
 ```bash
 SESSION_SECRET=<RANDOM CHARACTER>\
 CONSUMER_KEY=<YOUR TWITTER APP CONSUMER_KEY>\
 CONSUMER_SECRET=<YOUR TWITTER APP CONSUMER_SECRET>\
 node server.js
 ```

