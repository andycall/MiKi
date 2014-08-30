var __LayoutManager__ = require("../core/__LayoutManager__.js")["__LayoutManager__"];

var manager = new __LayoutManager__(),
    layout = manager.createLayout('/index.html',{title:"aaaaaaaa"}),
    headItem, contentItem, footerItem;

/*---头部--*/
headItem = layout.createItem();
headItem.setBlock("header","/t1.html");
headItem.render();


/*--主内容区--*/
contentItem = layout.createItem();
contentItem.setBlock("content","/t2.html");
contentItem.setBlock("leftContent","/t2.html");
contentItem.setBlock("mainContent","/t2.html");
contentItem.setBlock("rightContent","/t2.html");
contentItem.render();

/*--底部--*/
footerItem = layout.createItem();
footerItem.setBlock("footer","/t3.html");
footerItem.render();

layout.render();
manager.render();