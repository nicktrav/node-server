CREATE KEYSPACE page_upload 
WITH REPLICATION = {
    'class' : 'SimpleStrategy'
    , 'replication_factor' : 2 
};

USE page_upload;

CREATE TABLE pages (
	url varchar
	, tstamp timestamp 
	, title varchar
	, html blob
	, timeOnPage int
	, version varchar
	, PRIMARY KEY (url, tstamp)
);
