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
    this.property = 'Student';
}

class Class_ {
    constructor(number){
        this.number = number;
    }
}
Student.prototype = new Person();
Student.prototype.introduce = function () {
    return new Person(this.name,this.age).introduce()+`I am a ${this.property}. I am at Class ${this.class_.number}.`;
};


function Teacher(name,age,class_) {
    this.name = name;
    this.age = age;
    this.class_ = class_;
    this.property = 'Teacher';
}

Teacher.prototype = new Person();
Teacher.prototype.introduce = function () {
    let teachClass;

    if(this.class_){
        teachClass = `Class ${this.class_}`;
    }else {
        teachClass = 'No Class';
    }
    return new Person(this.name,this.age).introduce()+`I am a ${this.property}. I teach ${teachClass}.`;
};

Teacher.prototype.introduceWith = function (student) {
    if(student.class_.number === this.class_){
        return new Person(this.name,this.age).introduce()+`I am a ${this.property}. I teach ${student.name}.`;
    }else {
        return new Person(this.name,this.age).introduce()+`I am a ${this.property}. I don't teach ${student.name}.`;
    }


};

let person = new Person('Tom',21);
console.log(person.introduce());

let studentClass = new Class_(4);
let student = new Student('Tom',22,studentClass);
console.log(student.introduce());

let teacher = new Teacher('amy',34,3);
console.log(teacher.introduce());
console.log(teacher.introduceWith(student));

let teacher2 = new Teacher('amy',34);
console.log(teacher2.introduce());

let teacher3 = new Teacher('amy',34,4);
console.log(teacher3.introduce());
console.log(teacher3.introduceWith(student));