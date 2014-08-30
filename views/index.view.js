var manager = new __LayoutManager__(res),
    layout = manager.createLayout('/index.html',{title:__Data__.title}),
    headItem, contentItem, footerItem;

/*---头部--*/
headItem = layout.createItem({title:__Data__.title});
headItem.setBlock("header","/t1.html");
headItem.render();


/*--主内容区--*/
contentItem = layout.createItem({title:__Data__.title});
contentItem.setBlock("content","/t2.html");
contentItem.setBlock("leftContent","/t2.html");
contentItem.setBlock("mainContent","/t2.html");
contentItem.setBlock("rightContent","/t2.html");
contentItem.render();

/*--底部--*/
footerItem = layout.createItem({title:__Data__.title});
footerItem.setBlock("footer","/t3.html");
footerItem.render();

layout.render();
manager.render();