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
nameFunc("jsjs");
res2;
