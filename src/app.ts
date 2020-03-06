// app/app.ts
import express = require('express')
import { get, put, post } from 'request-promise';

require('dotenv').config()

// Create a new express application instance
const app: express.Application = express()

// Initiating
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.get('/install', function (req, res, next) {

  var shop = req.query.shop
  var appId = process.env.appId

  var appScope = process.env.appScope
  var appDomain = process.env.appDomain

  var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=http://${appDomain}/auth`;

  // if (process.env.appStoreTokenTest.length > 0) {
  //   res.redirect('/shopify/app?shop=' + shop)
  // } else {
  //   res.redirect(installUrl)
  // }

  res.redirect(installUrl)

});

app.get('/auth', function (req, res, next) {

  let appId = process.env.appId;
  let appSecret = process.env.appSecret;
  let shop = req.query.shop;
  let code = req.query.code;

  //Exchange temporary code for a permanent access token
  let accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
  let accessTokenPayload = {
    client_id: appId,
    client_secret: appSecret,
    code,
  };

  post(accessTokenRequestUrl, { json: accessTokenPayload }).then((accessTokenResponse) => {

    let accessToken = accessTokenResponse.access_token;

    console.log('shop token ' + accessToken);

    res.redirect('/?shop=' + shop);

  }).catch((error) => {
    res.status(error.statusCode).send(error.error.error_description);
  });

})

app.get('/create-tag', function (req, res, next) {

  let url = 'https://' + req.query.shop + '/admin/api/2020-01/script_tags.json';

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    headers: {
      'X-Shopify-Access-Token': process.env.appStoreTokenTest,
      'content-type': 'application/json'
    },
    body: {
      script_tag: {
        event: "onload",
        src: "https://a3c18ea5.ngrok.io/my-script.js"
      }
    }
  };

  post(options).then(function (parsedBody) {

    console.log(parsedBody)

    res.json(parsedBody)

  }).catch(function (err) {

    console.log(err)

    res.json(err)

  })

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});