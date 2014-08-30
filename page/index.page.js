var __LayoutManager__ = require("../core/__LayoutManager__.js")["__LayoutManager__"];

var manager = new __LayoutManager__(),
    layout = manager.createLayout('/index.html'),
    headItem = layout.createItem({}),
    contentItem = layout.createItem({}),
    footerItem = layout.createItem({});

/*---头部--*/
headItem.setBlock("header","/t1.html");
headItem.render();


/*--主内容区--*/
contentItem.setBlock("leftContent","/t2.html");
contentItem.setBlock("mainContent","/t2.html");
contentItem.setBlock("rightContent","/t2.html");
contentItem.render();

/*--底部--*/
footerItem.setBlock("footer","/t3.html");
footerItem.render();

layout.render();
manager.render();
