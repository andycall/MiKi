/**
 * 定义一些全局定义一些全局的常量
 * @type {string}
 */
DIR_PATH = __dirname + "/node_modules/";
TEMPLATE_PATH = __dirname +"/template/";
VIEW_PATH = __dirname + "/views";
CORE_PATH = __dirname + "/core";
LAYOUT_PATH = __dirname +"/layout";
CONTROL_PATH = __dirname + "/control";
SERVER_PATH = __dirname + "/server";
WIDGET_PATH = __dirname + "/widget";

var express = require(DIR_PATH + "express");
var ejs = require(DIR_PATH + "ejs");

app = express();
app.ejs = ejs;

require("./server/index.server.js");

app.listen(8080);

