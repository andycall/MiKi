var time = +new Date();
var l = require("../helper/__LayoutManager__.js")["__LayoutManager__"];

var __LayoutManager__ = new l();
    //------------------载入骨架--------------------
    var __Layout__ = __LayoutManager__.createLayout('./layout/index.html');

     //-----------------头部 start------------------------------
        var head = __Layout__.createItem({});
        head.setBlock("header","./template/t1.html");
        head.render();
    //-------------------头部 end---------------------------------

    //-------------------内容 start--------------------------------
        var content = __Layout__.createItem({});
        content.setBlock("content","./template/t2.html");

            //-----------------主要内容 start------------------------------
            var mainContent = __Layout__.createItem({});
            mainContent.setBlock("mainContent","./template/t3.html");
            mainContent.render();
            //------------------主要内容 end-----------------------------------

        content.render();
    //--------------------内容 end---------------------------------------

    __Layout__.render();
   //-----------------------骨架进行渲染----------------------

__LayoutManager__.render();
