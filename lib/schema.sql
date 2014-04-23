CREATE KEYSPACE page_upload 
WITH REPLICATION = {
    'class' : 'SimpleStrategy'
    , 'replication_factor' : 1
};

USE page_upload;

CREATE TABLE pages (
	url varchar
	, tstamp timestamp 
	, title varchar
	, html blob
	, timeOnPage int
	, version varchar
    , scrollbar map<varchar, int>
    , device map<varchar, varchar>
	, PRIMARY KEY (url, tstamp)
);
