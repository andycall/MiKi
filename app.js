DIR_PATH = __dirname + "/node_modules/";
TEMPLATE_PATH = __dirname +"/template/";

var express = require(DIR_PATH+'express');
var ejs = require(DIR_PATH+"ejs");
var waterline = require(DIR_PATH+"waterline");
app = express();

app.ejs = ejs;
app.waterline = waterline;

app.get('/hello', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

// Start Server
app.listen(8080);

