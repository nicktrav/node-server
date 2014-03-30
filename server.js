// Load the relevant packages
var express = require('express');
var app = express();
var fs = require('fs');
var winston = require('winston');

// the logger
var logger = new (winston.Logger)({
	transports: [
  		new (winston.transports.Console)(),
  		new (winston.transports.File)({ filename: 'log.log' })
	]
});

// Use express json
app.use(express.json());

// POSTs
app.post('/page', function(req, res) {

  // write to file
  fs.appendFile('test.log', JSON.stringify(req.body) + '\n', function(err) {

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