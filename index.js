var data = require('jhucsse.covid');
var moment = require('moment');
var stats = require('./stats.js')

const http = require('http');
const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

//console.log(stats.relative(10));



app.get('/', (req, res) => res.send("welcome"));

app.post('/getStats', function (req, res) {
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
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
