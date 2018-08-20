let readline = require('readline');

/**
 * 无效输入的处理
 */
class Invalid {
    constructor(data) {
        this.data = data;
    }

    isInvalid() {
        let reg = /^\d{4}$/;
        return reg.test(this.data);
    }
}

/**
 * 判断输入数字是否重复
 */
class IsRepeat {
    constructor(data) {
        this.data = data;
    }

    isRepeat() {
        return [...this.data.toString().split('')].length !== 4;
    }
}

/**
 * AnswerGenerator类
 * 生成四位不重复的随机数
 */
class AnswerGenerator {
    constructor() {
        this.arr = []
    }

    getRandom() {
        let random = Math.floor(Math.random() * 10000);

        //判断是否存在重复位
        let isRepeat = [...random.toString().split('')].length !== 4;

        if (random.toString().length === 4 && !this.arr.includes(random) && !isRepeat) {
            this.arr.push(random);
        } else {
            this.getRandom();
        }

        return this.arr;
    }

}

/**
 *CompareNumber类
 *对比函数
 */
class CompareNumber {
    constructor(answer, number) {
        this.answer = answer;
        this.number = number;
    }

    compareNumber() {

        let answer = this.answer.toString().split('');
        let number = this.number.toString().split('');
        let countA = 0;
        let countB = 0;
        answer.forEach((item, index) => {
            if (number.includes(item)) {
                if (number[index] === item) {
                    countA++;

                } else {
                    countB++;
                }
            }
        });

        return `${countA}A${countB}B`;
    }
}

/**
 * 主程序
 */
function start(line) {

    let rl = readline.createInterface({
        input: process.stdin,
    });
    process.stdout.write(`Welcome!\n`);
    let random = new AnswerGenerator().getRandom()[0];
    process.stdout.write(`data:${random}\n`);
    let count = 6;

    process.stdout.write(`Please input your number(${count--}):\n`);
    rl.on('line', function (line) {
        let isInvalid = new Invalid(line).isInvalid();
        if (isInvalid) {
            let isRepeat = new IsRepeat(line).isRepeat();
            if (isRepeat) {
                process.stdout.write(`Cannot input duplicate numbers!\n`);
            } else {
                let guessResult = new CompareNumber(random, line).compareNumber();
                if (guessResult === '4A0B') {
                    process.stdout.write(`Congratulations!\n`);
                } else {
                    process.stdout.write(guessResult + '\n');
                }
            }

        } else {
            process.stdout.write(`Invalid!Please input four digits!\n`);
        }

        if (count > 0) {
            process.stdout.write(`Please input your number(${count--}):\n`);
        } else {
            process.stdout.write(`Game Over\n`);

        }
    });

}

start();
module.exports = {
    Invalid,
    AnswerGenerator,
    CompareNumber,
};
