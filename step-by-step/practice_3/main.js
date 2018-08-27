function Person(name,age) {
    this.name = name;
    this.age = age;
}

Person.prototype.introduce = function () {
    return `My name is ${this.name}. I am ${this.age} years old.`;
};

function Student(class_,name,age) {
    this.class_ = class_;
    this.name = name;
    this.age = age;
}
Student.prototype = new Person();
Student.prototype.introduce = function () {
    return `I am a Student. I am at Class ${this.class_}.`
};

let student = new Student(2,'amy',17);
console.log(student);
console.log(student.introduce());