let {statisticsItems, buildCartItems, calculate,print} = require('../src/main');

let {loadAllItems} = require('../src/items.js');

describe('POS-V0.2', function () {

    it('should statistics items', function () {
        let items = [
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000001',
            'ITEM000001',
            'ITEM000004'
        ];
        let statistics = statisticsItems(items);
        let expected = [
            {barcode: 'ITEM000000', count: 5},
            {barcode: 'ITEM000001', count: 2},
            {barcode: 'ITEM000004', count: 1}];
        expect(statistics).toEqual(expected)
    });

    it('should build cartItems', function () {
        let statistics = [
            {barcode: 'ITEM000000', count: 5},
            {barcode: 'ITEM000001', count: 2},
            {barcode: 'ITEM000004', count: 1}];
        let allItems = loadAllItems();
        let cartItems = buildCartItems(statistics, allItems);
        let expected = [
            { barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3,
            count: 5 },
            { barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                count: 2 },
            { barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2,
                count: 1 } ];
        expect(cartItems).toEqual(expected)
    });

    it('should calculate', function () {
        let cartItems = [
            { barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3,
                count: 5 },
            { barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                count: 2 },
            { barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2,
                count: 1 } ];
        let calculateItems = calculate(cartItems);
        let expected = 23;
        expect(calculateItems).toEqual(expected)
    });
    it('should calculate', function () {
        let cartItems = [
            { barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3,
                count: 5 },
            { barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                count: 2 },
            { barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2,
                count: 1 } ];
        let calculateData = 23;
        let printInPage = print(cartItems,calculateData);
        let expected = `***<没钱赚商店>购物清单***
名称：可口可乐，数量：5瓶，单价：3(元)，小计：15(元)
名称：雪碧，数量：2瓶，单价：3(元)，小计：6(元)
名称：电池，数量：1个，单价：2(元)，小计：2(元)
----------------------
总计：23(元)
**********************`;
        expect(printInPage).toEqual(expected)
    });

});
