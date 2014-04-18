// Load the relevant packages
var express = require('express');
var app = express();
var fs = require('fs');
var winston = require('winston');
var argv = require('minimist')(process.argv.slice(2));
var cassandraClient = require('./lib/cassandra.js');
var bodyParser = require('body-parser');

// logging directories
var logfile = '';
var outfile = '';

// set up logging 
if ( argv['log'] != undefined ) {
	logfile = argv['log'];
}
else {
	console.log('No log file. Using default');
	logfile = 'log.log';
}

// the logger
var logger = new (winston.Logger)({
	transports: [
  		new (winston.transports.Console)(),
  		new (winston.transports.File)({ filename: logfile })
	]
});

// Use express json
app.use(bodyParser({limit: '1mb'}));

// middleware to allow cross origin resource sharing
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'content-type');

    // Pass to next layer of middleware
    next();
});

// set up the connection to Cassandra
cassandraClient.connect();

// POSTs
app.post('/page', function(req, res) {

  cassandraClient.insertPage(req.body);
  logger.log('info', 'Captured page.');

  // return
  res.end(JSON.stringify({"status": "OK"}));

});

// set up the server to listen on port 1337
app.listen(process.env.PORT || 1337);
