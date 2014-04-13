CREATE TABLE test_page_upload (
	url varchar
	, tstamp timestamp 
	, title varchar
	, html blob
	, timeOnPage int
	, device map<varchar, varchar>
	, client varchar
	, version varchar
	, PRIMARY KEY (url, tstamp)
);