// 只作为一个入口的文件

var validator = require("./lib");
validator.isEmail('kara@bar.com');
 




//var test = {
//    isEmail:function(str){
//        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
//        
//    },
//    
//    isAllEnglish: function(str){
//        return /^[a-zA-Z]+$/.test(str);
//    }
//}
//    
//var str = "kara@bar.com";
//
//test.isEmail(str);