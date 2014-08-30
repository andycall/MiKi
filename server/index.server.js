/**
 * Created by mac on 14-8-28.
 */

var Waterline = (MODULE_PATH+"waterline");

app.get("",function(req,res){
    var option = {
      path:"",
      params:{},
      req:req,
      res:res
    };
    var act = new Action(option);

    act.setParams({
        title:"111111"
    });
    act.setPage();
});