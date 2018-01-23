1. Make a request to coinAPI
2. Get data back in JSON format
3. Process data
  a. Convert it to JS Objects (JSON.parse)
  b. For each object in the array:
    1. Output the long name
    2. Output the short name
    3. Output the price

var request = require('request');

request('http://coincap.io/front', function(err, res, body) {
  var c = JSON.parse(body);

// part 3b
  c.forEach(function(coin) {
    // use to create seperation from data
      console.log("\n=-------------------=");
      console.log("Long name: ", coin.long);
      console.log("Short name: ", coin.short);
      console.log("Price: ", coin.price);
      console.log("-------------------=\n");
  });
});






Now we want the top 10 coins only

var request = require('request');

request('http://coincap.io/front', function(err, res, body) {
  var coins = JSON.parse(body);

  c.forEach(function(coin) {
    for (var i = 0; i < 10; i++) {
      var coin = coins[i];
      console.log("\n=-------------------=");
      console.log("Long name: ", coin.long);
      console.log("Short name: ", coin.short);
      console.log("Price: ", coin.price);
      console.log("-------------------=\n");
    }
  });
});





Now specificed by terminal input

var request = require('request');
var count = parseInt(process.argv.slice(2)[0]) || 10;

function formatPrice(price) {
  price = price.toFixed(2);
  return "$"+price.toLocaleString();
}

console.log("Fetching " + count _ " results...");

function handleCoins(err, res, body) {
  var coins = JSON.parse(body).slice(0, count);

  coins.forEach(display.coin);
}


function displayCoin(coin) {
  console.log("\n=-------------------=");
  console.log("Long name: ", coin.long);
  console.log("Short name: ", coin.short);
  console.log("Price: ", coin.price);
  console.log("-------------------=\n");
}