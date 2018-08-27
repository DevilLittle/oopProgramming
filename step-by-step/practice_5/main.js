function Person(name,age) {
    this.name = name;
    this.age = age;


}

Person.prototype.introduce = function () {
    return `My name is ${this.name}. I am ${this.age} years old.`;
};

Person.prototype.basic_introduce = function () {
    return `My name is ${this.name}. I am ${this.age} years old.`;
};

function Student(name,age,class_) {
    this.name = name;
    this.age = age;
    this.class_ = class_;
}

Student.prototype = new Person();
Student.prototype.introduce = function () {
    // return `My name is ${this.name}. I am ${this.age} years old. I am a Student. I am at Class ${this.class_}.`;
    return new Student(this.name,this.age).basic_introduce()+`I am a Student. I am at Class ${this.class_}.`;
};

function Worker(name,age) {
    this.name = name;
    this.age = age;
}

Worker.prototype = new Person();
Worker.prototype.introduce = function () {
    // return `My name is ${this.name}. I am ${this.age} years old. I am a Worker. I have a job.`;
    return new Worker(this.name,this.age).basic_introduce()+`I am a Worker. I have a job.`;
};

let worker = new Worker('amy',21);
console.log(worker.introduce());