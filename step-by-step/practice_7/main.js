function Person(name,age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function () {
    return `My name is ${this.name}. I am ${this.age} years old.`;
};

function Student(name,age,class_) {
    this.name = name;
    this.age = age;
    this.class_ = class_;
}

Student.prototype = new Person();
Student.prototype.introduce = function () {
    return `My name is ${this.name}. I am ${this.age} years old.`;
};