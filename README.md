# vue-chat-test
Test chat site with Vue.js / Auth0 / socket.io

## try
You can try at https://vue-chat-test-swgnwwnlco.now.sh/

## make server
``` shell
$ npm install
$ export AUTH0_DOMAIN="YOUR DOMAIN OF AUTH0 ACCOUNT"
$ export AUTH0_CLIENT_ID="YOUR CLIENT ID OF AUTH0"
$ export AUTH0_KID="YOUR KID OF AUTH0 JWT"
$ npm start
```

If you don't known KID, please use this command.
``` shell
$ curl https://${AUTH0_DOMAIN}/.well-known/jwks.json | grep -oP '"kid":".*?"'
```

## environment variables
- PORT: listen port
- AUTH0\_DOMAIN: domain of Auth0 account
- AUTH0\_CLIENT\_ID: client ID of Auth0
- AUTH0\_KID: kid of Auth0 JWT

## license
MIT License
