var express = require('express');
var url = require("url");
var http = require('http');

var app = express();

// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

// Start the server
app.set('port', process.env.PORT || 3300);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log("#####################################");
  console.log("# H2C server listening on port 3300 #");
  console.log("#####################################");
});