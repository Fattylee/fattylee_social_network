interface DogType {
  readonly breed: string;
  age: number;
  height: number;
}
class Dog implements DogType {
  extra: boolean;
  readonly breed: string;
  // age: number;
  height: number;
  constructor(breed: string, age: number, height: number) {
    // this.age = age;
    this.breed = breed;
    this.height = height;
  }

  format() {
    // this.breed = "puppy";
    return `Dog breed is ${this.breed}, age: ${this.height} and height: ${this.height}`;
  }
}

const dog1 = new Dog("bulldog", 23, 11);
const res = dog1.format();

// dog1.breed = "baba";
console.log(res);

let man: object;
man = { name: "abu", age: 12 };
const nameFunc = <T extends { name: string }>(obj: T) => {
  return obj;
};
const res2 = nameFunc({ name: "fatty", age: 11, isMarried: true });
nameFunc({ name: "male" });
res2;
interface Company<T> {
  id: string;
  data: T;
}
const abu: Company<string[]> = { id: "3", data: ["23", "4"] };
const arr = [2, true, "string"];
arr[2] = 23;
arr.push(true);

let arr2: [string, number] = ["fake", 1];
arr2.push(3, "etring");
// arr2[1] = "sgha";
console.log(arr2);
