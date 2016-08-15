//模块的内容

module.exports = {
    isEmail:function(str){
        console.log("the test result is : ");
        
        var result = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(str);
        
        console.log(result);
    },
    
    isAllEnglish: function(str){
        console.log("the result is : ");
        var result = /^[a-zA-Z]+$/.test(str);
        console.log(result);
    }
}