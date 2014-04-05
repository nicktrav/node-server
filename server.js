// Load the relevant packages
var express = require('express');
var app = express();
var fs = require('fs');
var winston = require('winston');
var argv = require('minimist')(process.argv.slice(2));

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

if ( argv['o'] != undefined ) {
	outfile = argv['o'];
}
else {
	console.log('No output file. Using default');
	logfile = 'output.log';
}

// the logger
var logger = new (winston.Logger)({
	transports: [
  		new (winston.transports.Console)(),
  		new (winston.transports.File)({ filename: logfile })
	]
});

// Use express json
app.use(express.json());

// middleware to allow cross origin resource sharing
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    // Pass to next layer of middleware
    next();
});

// POSTs
app.post('/page', function(req, res) {

  // write to file
  fs.appendFile(outfile, JSON.stringify(req.body) + '\n', function(err) {

	// on error
	if (err) throw err;
	
	// print success message to the log
	logger.log('info', 'appended data');

  });

  // Respond to the calling app with success
  res.end('Success!\n')
});

// set up the server to listen on port 1337
app.listen(process.env.PORT || 1337);