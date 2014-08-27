var DIR_PATH = __dirname + "/node_modules/";

var express = require(DIR_PATH+'express');
var ejs = require(DIR_PATH+"/ejs");
var app = express();

console.log(ejs.renderFile("./index.html",{
    title:"hahaha"
}));

app.get('/hello', function(req, res){
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.listen(8080);