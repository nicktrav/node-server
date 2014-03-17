// Load the relevant packages
var express = require('express');
var app = express();
var fs = require('fs');

// Use express json
app.use(express.json());

// POSTs to the root dir
app.post('/', function(req, res) {

  // write to file
  fs.appendFile('log1.log', JSON.stringify(req.body) + '\n', function(err) {

	// on error
	if (err) throw err;
	
	// print success message to the console
	console.log('The data was appended!');

  });

  // Respond to the calling app with success
  res.end('Success!\n')
});

// set up the server to listen on port 1337
app.listen(process.env.PORT || 1337);