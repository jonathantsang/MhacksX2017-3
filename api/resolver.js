var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var Client = require('coinbase').Client;


// The API that returns the in-email representation.
module.exports = function(req, res) {
  console.log(req);
  var query = req.query.url;
  console.log(query);
  if(query != 'BTC' && query != 'ETC' && query != 'LTE'){
    return;
  }

  var clientID = '6c14f1035ca3ee3d9b632a10e268278217f213c331b5221f4b7c729810414f5c';
  var sec = 'b8578f22a343b98ba3a7fe78004bb30eadae8df1c8843bea81669842cdc69d67';
  var link = 'https://www.coinbase.com/oauth/authorize?client_id=6c14f1035ca3ee3d9b632a10e268278217f213c331b5221f4b7c729810414f5c&redirect_uri=https%3A%2F%2Fcoinbasepricecheck.herokuapp.com&response_type=code&scope=wallet%3Auser%3Aread';

  var client = new Client({
    'apiKey': clientID,
    'apiSecret': sec,
  });

// Make the request
client.getBuyPrice({'currencyPair': query + '-USD'}, function(err, price) {
    if (err) {
      res.status(500).send('Error');
      return;
    } else {
      console.log(price);
      console.log(price.data.amount);
      var html = '<p>'+ query + ' ' + price.data.amount + '</p>';
      res.json({
        body: html
      });
    }
  });
};