var should = require("should");

var user = {
    name:"Kara",
    fruits: ["banana", "apple", "strawberry"]
};

user.should.have.property("name", "Kara");
user.should.have.property("fruits").with.lengthOf(3);


should(user).have.property("name","Kara")


// 同步代码
describe("Array", function(){
    describe("#indexOf()", function(){
        it("should return -1 when the value is not present ", function(){
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        })
    })
})

// 异步代码  【不造为什么 有点问题 user.save not a function, 估计不是should 支持的吧。这个以后再议 】
function User(name){
    this.name = name;
}

describe("User", function(){
    describe("#save()", function(){
        it("should save without error", function(done){
            var user = new User("Kara");
            user.save(function(err){
                if(err){
                    throw err;
                }
                done();
            });
        })
    })
})