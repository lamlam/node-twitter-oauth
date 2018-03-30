# Node twitter oauth sample project
## Getting start
1. Setup your app in twitter
    https://apps.twitter.com/
    Fill 'Callback URL' with random url. We override it but it is needed.
1. Get your app's consumer_key and consumer_secret
    You can find "Keys and Access Tokens" tab on your twitter app page.
1. Clone this project.
    ```bash
    $ git clone git@github.com:lamlam/node-twitter-oauth.git
    $ cd node-twitter-oauth
    ```
1. Setup project
    ```bash
    $ npm install
    ```
1. Start Server
    ```bash
    $ SESSION_SECRET=<RANDOM CHARACTER> \
        CONSUMER_KEY=<YOUR TWITTER APP CONSUMER_KEY> \
        CONSUMER_SECRET=<YOUR TWITTER APP CONSUMER_SECRET> \
        node server.js
    ```

