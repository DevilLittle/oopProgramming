let {invalidProcess, formatInput, chargePiece, start,} = require('../wait-main.js');

describe('Taxi-Charge',()=>{

    describe('invalid-Process',()=>{
        it('should judge empty',()=>{
            let input = '';
            let isInvalid = invalidProcess(input);
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but illegal',()=>{
            let input = 'name';
            let isInvalid = invalidProcess(input);
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but illegal',()=>{
            let input = '3 name';
            let isInvalid = invalidProcess(input);
            let expected = false;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but legal',()=>{
            let input = '26 2';
            let isInvalid = invalidProcess(input);
            let expected = true;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but legal',()=>{
            let input = '2';
            let isInvalid = invalidProcess(input);
            let expected = true;

            expect(isInvalid).toEqual(expected);
        });

        it('should judge not empty but legal',()=>{
            let input = ' 2';
            let isInvalid = invalidProcess(input);
            let expected = true;

            expect(isInvalid).toEqual(expected);
        });
    });

    describe('Format-Input',()=>{
        it('should format input with distance and time',()=>{
            let input = '26.2 2';
            let formattedInput = formatInput(input);
            const expected = {
                distance: '26.2',
                waitTime: '2'
            };

            expect(formattedInput).toEqual(expected);
        });

        it('should format input with only distance',()=>{
            let input = '13.1';
            let formattedInput = formatInput(input);
            let expected = {
                distance: '13.1',
                waitTime: 0
            };

            expect(formattedInput).toEqual(expected);
        });

        it('should format input with only time',()=>{
            let input = ' 34';
            let formattedInput = formatInput(input);
            let expected = {
                distance: 0,
                waitTime: '34'
            };

            expect(formattedInput).toEqual(expected);
        });
    });

    describe('Taxi-charge',()=>{
        it('should charge',()=>{
            let formattedInput = {
                distance: '2.6',
                waitTime: '2'
            };
            let charge = chargePiece(formattedInput);
            let expected = '10';

            expect(charge).toEqual(expected);
        });

        it('should charge',()=>{
            let formattedInput = {
                distance: '5.1',
                waitTime: '4'
            };
            let charge = chargePiece(formattedInput);
            let expected = '14';

            expect(charge).toEqual(expected);
        });
        it('should charge',()=>{
            let formattedInput = {
                distance: '12.5',
                waitTime: '9'
            };
            let charge = chargePiece(formattedInput);
            let expected = '34';

            expect(charge).toEqual(expected);
        });

    });
});