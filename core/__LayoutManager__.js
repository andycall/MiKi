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

__LayoutManager__.prototype.createLayout = function(layoutPath){
    var self = this,
        _layout = new __Layout__();

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

    cssList = ArrayProto.map.call(cssList,function(value,index){
            return '<link rel="stylesheet" type="text/css" href="'+value+'" />\n';
        });

    scriptList = ArrayProto.map.call(scriptList,function(value,index){
            return '<script src="'+value+'"></script>\n'
        });

    variables["cssList"] = cssList.join('');
    variables["scriptList"] = scriptList.join('');

    result = ejs.render(layoutStr,variables);
}

exports.__LayoutManager__ = __LayoutManager__;