var data = require('jhucsse.covid');
var moment = require('moment');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
var stats = require('./stats.js');


const http = require('http');
var bodyParser = require('body-parser')
const express = require('express');
var cors = require('cors');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

//console.log(stats.relative(10));
var corsOptions = {
  origin: 'https://corona-stats-agent.herokuapp.com/*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app.use(allowCrossDomain);
app.use(express.json());
app.use(express.static('public'))
app.set('port', (process.env.PORT || port))


app.post('/getStats', function (req, res) {
   response = req.body.queryResult.parameters.state;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "speech" : response+ "? ",
        "displayText" : "Error. Can you try it again ? "
    }));
});

app.post('/all', cors(), function (req, res) {
  console.log("get all");
  data.all()
    .then(function (results) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify( results ));
      /*
      var top = results.locations;
      top = top.sort(function compare(a, b) {
        return b.latest - a.latest;
      });
      top.length = 7;
      top.forEach(function (country) {
        console.log(country.country + ": " + country.latest);
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify( top ));
      */
    });
  
});

app.post('/latestSummary', cors(), function (req, res) {
  data.all()
  .then(function (results) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify( results.latest ));
  });
});



app.listen(app.get('port'), () => console.log(`App listening at http://localhost:${port}`))
