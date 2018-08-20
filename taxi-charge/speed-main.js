let readline=require('readline');

const chargeRule = {
    startDistance:2,


    dayCharge:{
        startPiece:8,
        normalDistance:10,
        normalPiece:1.9,
        subsidyPiece:2.85,
        // waitChargeTime:5,
        // waitChargePiece:2
    },
    nightCharge:{
        startPiece:9,
        normalDistance:10,
        normalPiece:2.2,
        subsidyPiece:3.30,
        // waitChargeTime:5,
        // waitChargePiece:2
    },
    normalDistance:10,
    normalPiece:2,
    subsidyPiece:3,
    waitChargeTime:5,
    waitChargePiece:2
};
/**
 * 判断输入的合法性
 * @param input
 * @returns {boolean}
 */
function invalidProcess(input) {

    if(input){
        let temp = input.split(' ');

        return temp.map(element=>{
            if(element){
                let reg = /^[0-9]+.?[0-9]*$/;
                return reg.test(element);
            }else {
                return true;
            }

        }).every((item)=>item === true);
    }else {
        return false;
    }

}

/**
 * 输入格式化
 * @param input
 * @returns {{distance: *, waitTime: *}}
 */
function formatInput(input) {

    let format = input.split(' ');

    return {
        distance: format[0]||0,
        waitTime: format[1]||0
    };
}

/**
 * 计价
 * @param formattedInput
 * @returns {string}
 */
function chargePiece(formattedInput) {

    let piece;
    if (formattedInput.distance <= chargeRule.startDistance) {
        piece = chargeRule.startPiece;
    } else if (formattedInput.distance <= chargeRule.normalDistance) {
        piece = chargeRule.startPiece + (formattedInput.distance - chargeRule.startDistance) * chargeRule.normalPiece;
    } else {
        piece = chargeRule.startPiece + (chargeRule.normalDistance - chargeRule.startDistance) * chargeRule.normalPiece + (formattedInput.distance - chargeRule.normalDistance) * chargeRule.subsidyPiece;
    }

    let waitPiece;

    waitPiece = Math.floor(formattedInput.waitTime / chargeRule.waitChargeTime) * chargeRule.waitChargePiece;

    return (piece + waitPiece).toFixed();
}

/**
 * 读取输入执行
 * @param line
 */
function start(line) {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        if(invalidProcess(line)){
            let formattedInput = formatInput(line);
            let result = chargePiece(formattedInput);
            process.stdout.write(`result: ${result}\n`);
        }else {
            process.stdout.write('输入不合法，请重新输入\n');
        }
    });
}

start();

module.exports = {
    invalidProcess,
    formatInput,
    chargePiece,
    start,
};