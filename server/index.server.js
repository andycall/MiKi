/**
 * Created by mac on 14-8-28.
 */

var __Sever__ = require(CORE_PATH+"/__Server__.js")["__Server__"];

var server = new __Sever__();

server.on("get","/hello",function(req,res){

    var opt = {
        title:"hello world!"
    }

    //设置control,control用来前端处理一些数据
    server.setControl({
        path: "index.control.js",
        data: opt,
        res: res
    });
});