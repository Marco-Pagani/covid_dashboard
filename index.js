const http = require('http');
var data = require('jhucsse.covid');
var moment = require('moment');
var stats = require('./stats.js')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("hello");
});


console.log(stats.relative(10));
 
data.confirmed()
  .then(function (results) {
    //console.log(results.latest);
    //console.log(results.locations[0]);
    //console.log(results.locations[0].history['3/20/20']);
    var top = results.locations;
    top = top.sort(function compare(a, b) {
      return b.latest - a.latest;
    });
    top.length = 5;
    top.forEach(function (country) {
      console.log(country.country + ": " + country.latest);
    });
    //console.log(top);
    });
/*
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/