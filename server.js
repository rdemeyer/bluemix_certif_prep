'use strict';

const express = require('express');
const Cloudant = require("cloudant");
var bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


if (process.env.VCAP_SERVICES) {
  var vcap = JSON.parse(process.env.VCAP_SERVICES);
  var credentials = vcap.cloudantNoSQLDB[0].credentials ;
} else {
  var credentials = {
     "host": process.env.cloudanthost,
     "password": process.env.cloudantpassword,
     "port": process.env.cloudantport,
     "url": process.env.cloudanturl,
     "username": process.env.cloudantusername
  }
}

//app.use(bodyParser);

var cloudant = Cloudant(credentials, function(er, cloudant, reply) {
    if (er) throw er
    console.log('Connected with username: %s', reply.userCtx.name)
});


cloudant.db.list(function(err, allDbs) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    console.log('All my databases: %s', allDbs.join(', '))
});

var db_certif = cloudant.db.use('db_certif_bluemix');




app.get('/', function(req,res) {
  res.send('Hello');
  console.log("I send Hello once");
});

app.get('/getTeamBelgiumDoc', function(req,res) {
  db_certif.get('ce419ef8ab82173a615b0b877a2ba7b5', { revs_info: true }, function(err, body) {
    if (!err) {
      console.log(body);
      res.send(body.team_name); 
    } else {
      res.send('did not find it :( ');
    }
  });
});

app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
});

app.post('/postexample', function (req, res) {
  //console.log(req.body.test);
  //var test = req.json();
  var tata = req.body.test;
  
  db_certif.insert({ crazy: true, test: tata }, function(err, body) {
    if (!err)
      console.log(body)
  })
  res.send("over");
});





app.listen(port);
console.log("I listen on port "+ port);
