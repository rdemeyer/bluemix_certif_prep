'use strict';

const express = require('express');
const Cloudant = require("cloudant");
const port = process.env.PORT ;
const app = express();

var credentials =
{
     "host": "842b1946-4b3e-43b8-924e-d7b601a878c8-bluemix.cloudant.com",
     "password": "184400dba6f71230aeb873bf43382428f2e5f821a9381a244b81017dd4cb6955",
     "port": 443,
     "url": "https://842b1946-4b3e-43b8-924e-d7b601a878c8-bluemix:184400dba6f71230aeb873bf43382428f2e5f821a9381a244b81017dd4cb6955@842b1946-4b3e-43b8-924e-d7b601a878c8-bluemix.cloudant.com",
     "username": "842b1946-4b3e-43b8-924e-d7b601a878c8-bluemix"
};


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
