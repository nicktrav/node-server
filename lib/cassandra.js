var helenus = require('helenus')
var pool = new helenus.ConnectionPool({
        hosts      : ['127.0.0.1:9160'],
        keyspace   : 'test',
        timeout    : 3000
    });

// establish the connection
exports.connect = function() {

  pool.on('error', function(err){
    console.error(err.name, err.message);
  });

  pool.connect(function(err, keyspace){
    if(err){
      throw(err);
    }
  });

  return pool;

};

exports.insertPage = function(o) {

  // insert some data
  pool.cql("INSERT INTO test_page_upload ( \
            url, \
            tstamp, \
            title, \
            timeOnPage, \
            client, \
            version, \
            html \
          ) VALUES ( ?, ?, ?, ?, ?, ?, varcharAsBlob(?))",
            [o.url, o.timestamp, o.title, o.timeOnPage, o.client, o.version, o.html], function(err, results){

    if (err) {
      console.log( err );
    };

  });

}