/**
 * Created by mac on 14-8-28.
 */

var __LayoutItem__ = require("./__layoutItem__.js")["__LayoutItem__"],
    ArrayProto = Array.prototype;

function __Layout__(params)
{
    this._itemCount = 0;
    this._childList = [];

    this.itemArr = [];
    this.renderItem = null;
    this.scriptList = [];
    this.cssList = [];
    this.renderFlag = false;
    this.params = params || {};
}


__Layout__.prototype.createItem = function(params){
    var self = this,
        _item = new __LayoutItem__(params),
        _childList = self._childList,
        renderItem = self.renderItem,
        renderFlag = self.renderFlag,
        pow;

    if(!renderFlag)
    {
        self.renderFlag = true;
        self.renderItem = _item;

        _item.index = self._itemCount++;
        _item.isLayoutChild = true;
        _item.parent = self;
        _item.layout = self;

        ArrayProto.push(_childList,_item);
    }else
    {
        pow = renderItem.index.toString().split('.').join('').length;
        _item.index = renderItem.index + 1/Math.pow(10,pow);
        _item.parent = renderItem;
        _item.layout = self;
        self.renderItem = _item;
    }

    return _item;
}

__Layout__.prototype.render = function(){
    var self = this;
    ArrayProto.sort.call(self.itemArr,function(i,j){
        return i.index - j.index;
    });
}


exports.__Layout__ = __Layout__;
