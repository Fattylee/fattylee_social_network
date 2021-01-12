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
nameFunc({ name: "male" });
res2;
var abu = { id: "3", data: ["23", "4"] };
var arr = [2, true, "string"];
arr[2] = 23;
arr.push(true);
var arr2 = ["fake", 1];
arr2.push(3, "etring");
// arr2[1] = "sgha";
console.log(arr2);
