/**
 * Created by Administrator on 14-8-30.
 */

var __Layout__ = require("./__Layout__")["__Layout__"],
    ejs = require("../node_modules/ejs"),
    fs = require("fs"),
    path = require("path"),
    ArrayProto = Array.prototype;

var LAYOUT_DIR = path.resolve(__dirname,"../layout");

function __LayoutManager__()
{
    this._layouts = [];
}

__LayoutManager__.prototype.createLayout = function(layoutPath,params){
    var self = this,
        _layout = new __Layout__(params);

    layoutPath = path.join(LAYOUT_DIR,layoutPath);

    ArrayProto.push.call(self._layouts,{
        path:layoutPath,
        obj:_layout
    });
    return _layout;
}

__LayoutManager__.prototype.add = function(layout,index){
    var self = this;
    index = !index ? 0 : index;
    ArrayProto.slice.call(self._layouts,index,0,layout);
}

__LayoutManager__.prototype.remove = function(layout){
    var self = this;
    ArrayProto.forEach.call(self._layouts,function(item,index){
        if(item == layout)
        {
            ArrayProto.slice.call(self._layouts,index,1);
        }
    });
}

__LayoutManager__.prototype.render = function(){
    var self = this,
        scriptList = [],
        cssList = [],
        variables = {},
        layoutStrArr = [],
        layoutStr = '',
        result = {};

    ArrayProto.forEach.call(self._layouts,function(layout,index){
        var layoutObj = layout.obj,
            layoutPath = layout.path,
            htmlStr = '';

        for(var key in layoutObj.params)
        {
            variables[key] = layoutObj.params[key];
        }

        htmlStr = fs.readFileSync(layoutPath,{encoding:'utf-8'});
        ArrayProto.push.call(layoutStrArr,htmlStr);

        ArrayProto.forEach.call(layoutObj.itemArr,function(item){
            ArrayProto.forEach.call(item.htmlArr,function(info){
                var key = info.variable,
                    value = info.htmlStr;
                variables[key] = value;
            });
        });

        scriptList = ArrayProto.concat.call(scriptList,layoutObj.scriptList);
        cssList = ArrayProto.concat.call(cssList,layoutObj.cssList);
    });

    layoutStr = layoutStrArr.join('');

    cssList = self._getListStr(cssList,function(value){
        return '<link rel="stylesheet" type="text/css" href="'+value+'" />\n';
    });

    scriptList = self._getListStr(scriptList,function(value){
        return '<script src="'+value+'"></script>\n';
    });

    variables["cssList"] = cssList.join('');
    variables["scriptList"] = scriptList.join('');

    result = ejs.render(layoutStr,variables);
}

__LayoutManager__.prototype._getListStr = function(list,fn){
    var self = this;

    list = ArrayProto.filter.call(list,function(value,index,list){
        var lastIndex = list.lastIndexOf(value,index-1)
        return ! (~lastIndex && lastIndex);
    });

    list = ArrayProto.map.call(list,function(value){
        return fn(value);
    });

    return list;
}

exports.__LayoutManager__ = __LayoutManager__;