let {Invalid, AnswerGenerator, CompareNumber, Guess,} = require('../main.js');

describe('Guess And CompareNumber',()=>{

    describe('invalid-Process',()=>{
        it('should judge empty',()=>{
            let input = '';
            let isInvalid = new Invalid(input).isInvalid();
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but illegal(not number)',()=>{
            let input = 'name';
            let isInvalid = new Invalid(input).isInvalid();
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but illegal(not number)',()=>{
            let input = '3-name';
            let isInvalid = new Invalid(input).isInvalid();
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but illegal(the length of number is not 4)',()=>{
            let input = '262';
            let isInvalid = new Invalid(input).isInvalid();
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but legal(the length of number is 4)',()=>{
            let input = '2333';
            let isInvalid = new Invalid(input).isInvalid();
            let expected = true;

            expect(isInvalid).toEqual(expected);
        });

    });

    describe('Compare-Number',()=>{
        it('should compare',()=>{
            let answer = '2109';
            let number = '3333';
            let compareNumber = new CompareNumber(answer,number).compareNumber();
            let expected = '0A4B';

            expect(compareNumber).toEqual(expected);
        });

        it('should compare',()=>{
            let answer = '3362';
            let number = '4462';
            let compareNumber = new CompareNumber(answer,number).compareNumber();
            let expected = '2A2B';

            expect(compareNumber).toEqual(expected);
        });

        it('should compare',()=>{
            let answer = '1234';
            let number = '4321';
            let compareNumber = new CompareNumber(answer,number).compareNumber();
            let expected = '0A4B';

            expect(compareNumber).toEqual(expected);
        });

        it('should compare',()=>{
            let answer = '4477';
            let number = '4477';
            let compareNumber = new CompareNumber(answer,number).compareNumber();
            let expected = '4A0B';

            expect(compareNumber).toEqual(expected);
        });

    });
});