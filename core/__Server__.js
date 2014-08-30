/**
 * Created by Administrator on 14-8-30.
 */

var fs = require("fs"),
    path = require("path"),
    __Control__ = require("./__Control__.js")["__Control__"];

function __Sever__()
{
    this._router = null;
}

__Sever__.prototype.on = function(type,url,fn){
    var self = this,
        args = arguments,
        callback;

    if(args.length < 2){
        throw new Error("Router need type (POST or GET) and listen url.");
    }

    callback = function(req,res){
        if(typeof fn == "function")
        {
            fn(req,res);
        }
    };

    self._router = {
        type: type,
        url: url,
        fn: callback
    };

    app[type](url,callback);

}

__Sever__.prototype.setControl = function(opt){
    var self = this,
        tmpStr,filePath,data,req,res;

    filePath = !opt.path ? '' : path.resolve(CONTROL_PATH,opt.path);
    data = !opt.data ? {} : opt.data;
    res = opt.res;
    req = opt.req;

    if(!fs.existsSync(filePath))
    {
        throw new Error("Control file not exists in " + filePath);
    }

    tmpStr = fs.readFileSync(filePath);

    (new Function('__Control__,__Data__,req,res,require,module',tmpStr))(
                                                                   __Control__,
                                                                    data,
                                                                    req,res,
                                                                    require,
                                                                    module
                                                                );
}

exports.__Server__ = __Sever__;