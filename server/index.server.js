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

    __Action__.init(option);
});