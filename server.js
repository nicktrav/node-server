// Load the relevant packages
var express = require('express');
var app = express();
var fs = require('fs');
var winston = require('winston');
var argv = require('minimist')(process.argv.slice(2));

// Use express json
app.use(express.json());

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