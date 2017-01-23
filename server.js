'use strict';

const express = require('express');
const Cloudant = require("cloudant");
const port = process.env.PORT;
const app = express();

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

app.get('/', function(req,res) {
  res.send('Hello');
  console.log("I send Hello once");
});

app.listen(port);
console.log("I listen on port "+ port);
