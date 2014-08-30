/**
 * Created by mac on 14-8-28.
 */

var fs = require("fs"),
    path = require("path"),
    __LayoutManager__ = require("./__LayoutManager__.js")["__LayoutManager__"];

function __Control__(req,res)
{
    this._data = {};
    this._req = req;
    this._res = res;
}

__Control__.prototype.resign = function(name,data)
{
    var self = this;
    self._data[name] = data;
}

__Control__.prototype.display = function(viewPath)
{
    var self = this,
        data = self._data,
        req = self._req,
        res = self._res,
        tmpStr;

    viewPath = path.resolve(VIEW_PATH,viewPath);

    if(!viewPath || !fs.existsSync(viewPath))
    {
        throw new Error("Display func needs correct view path to render");
    }

    tmpStr = fs.readFileSync(viewPath);

    (new Function('__LayoutManager__,__Data__,res,require,module',tmpStr))(__LayoutManager__,
                                                                        data,
                                                                        res,
                                                                        require,
                                                                        module
                                                                    );

}

exports.__Control__ = __Control__;