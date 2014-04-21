
// Define connection to cassandra server
var helenus = require('helenus');
var pool = new helenus.ConnectionPool({
        hosts      : ['127.0.0.1:9160'],
        keyspace   : 'page_upload',
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

  // insert some cdata
  pool.cql("INSERT INTO pages ( \
            url, \
            tstamp, \
            title, \
            timeOnPage, \
            version, \
            html, \
            scrollbar \
          ) VALUES ( ?, ?, ?, ?, ?, varcharAsBlob(?), {'scrollY': ?,'scrollX': ?,'innerHeight': ?, 'scrollHeight': ?})", [
            o.url ,
            o.timestamp , 
            o.title , 
            o.timeOnPage ,
            o.version ,
            o.html ,
            o.scrollbar.scrollY, 
            o.scrollbar.scrollX, 
            o.scrollbar.innerHeight, 
            o.scrollbar.scrollHeight
          ], 
    function(err, results){

      if (err) {
        console.log( err );
      }

    }
  );

};
