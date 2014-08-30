/**
 * Created by Administrator on 14-8-29.
 */

var fs = require("fs"),
    path = require("path"),
    readFile = fs.readFileSync,
    ejs = require(DIR_PATH+"/ejs"),
    ArrayProto = Array.prototype;

function __LayoutItem__(paramMap)
{
    this._paramMap = paramMap || {};

    this.parent = null;
    this.index = 0;
    this.scriptList = [];
    this.cssList = [];
    this.htmlArr = [];
    this.layout = null;
    this.isLayoutChild = false;
}

__LayoutItem__.prototype.setBlock = function(variable,template)
{
    var self = this,
        _paramsMap = self._paramMap,
        cssList = self.cssList,
        scriptList = self.scriptList,
        htmlArr = self.htmlArr;

    var _args = arguments,
        _opts = {encoding:"utf-8"},
        _fileStr = '',
        _renderObj = {};

    template = path.join(TEMPLATE_PATH,template);

    if(_args.length < 2)
    {
        throw new Error("setBlock function params must contains variable and template path.");
    }

    if(_fileStr = readFile(template,_opts))
    {
        _renderObj = ejs.renderFile(template,_paramsMap);
        self.cssList = ArrayProto.concat.call(cssList,_renderObj.css);
        self.scriptList = ArrayProto.concat.call(scriptList,_renderObj.scripts);
        ArrayProto.push.call(htmlArr,{
            variable: variable,
            htmlStr: _renderObj.htmlStr
        });
    }else{
        throw new Error("Can't find template with "+template);
    }
}

__LayoutItem__.prototype.render = function()
{
    var self = this,
        htmlArr = self.htmlArr,
        parent = self.parent,
        index = self.index,
        cssList = self.cssList,
        scriptList = self.scriptList,
        layout = self.layout,
        isLayoutChild = self.isLayoutChild;

    if(isLayoutChild)
    {
        parent.renderFlag = false;
    }

    layout.renderItem = parent;

    layout.cssList = ArrayProto.concat.call(layout.cssList,cssList);
    layout.scriptList = ArrayProto.concat.call(layout.scriptList,scriptList);
    ArrayProto.push.call(layout.itemArr,{
        index: index,
        htmlArr: htmlArr
    });
}

exports.__LayoutItem__ = __LayoutItem__;