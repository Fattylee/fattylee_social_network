var Dog = /** @class */ (function () {
    function Dog(breed, age, height) {
        // this.age = age;
        this.breed = breed;
        this.height = height;
    }
    Dog.prototype.format = function () {
        // this.breed = "puppy";
        return "Dog breed is " + this.breed + ", age: " + this.height + " and height: " + this.height;
    };
    return Dog;
}());
var dog1 = new Dog("bulldog", 23, 11);
var res = dog1.format();
// dog1.breed = "baba";
console.log(res);
var man;
man = { name: "abu", age: 12 };
var nameFunc = function (obj) {
    return obj;
};
var res2 = nameFunc({ name: "fatty", age: 11, isMarried: true });
nameFunc("jsjs");
res2;
