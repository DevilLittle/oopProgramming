let {formatInput, statisticsItems, buildCartItem,calculatePrice,calculateTotalPrice,buildReceipt} = require('../src/main');

let {loadAllItems} = require('../src/items.js');
let {loadPromotions} = require('../src/promotions');

describe('POS-V0.2', function () {

    it('should format input', function () {
        let input = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
        let formattedInput = formatInput(input);
        let expected = [
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1}];
        expect(formattedInput).toEqual(expected)
    });

    it('should statistics items', function () {
        let formattedItems = [
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1}];
        let statistics = statisticsItems(formattedItems);
        let expected = [
            {barcode: 'ITEM000001', count: 5},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 3}];
        expect(statistics).toEqual(expected)
    });
    it('should build cart items', function () {
        let statisticsItem = [
            {barcode: 'ITEM000001', count: 5},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 3}];
        let allItems = loadAllItems();
        let cartItems = buildCartItem(statisticsItem, allItems);
        let expected = [
            {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                count: 5
            },
            {
                barcode: 'ITEM000003',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 2
            },
            {
                barcode: 'ITEM000005',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 3
            }];
        expect(cartItems).toEqual(expected)
    });
    it('should calculate price', function () {
        let cartItems= [
            {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                count: 5
            },
            {
                barcode: 'ITEM000003',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 2
            },
            {
                barcode: 'ITEM000005',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 3
            }];
        let promotions = loadPromotions();
        let calculate= calculatePrice(cartItems, promotions);
        let expected = [
            {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                count: 5,
                savePrice: 1.00,
                finalPrice:4.00,
                saveCount:1
            },
            {
                barcode: 'ITEM000003',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 2,
                savePrice: 0,
                finalPrice:11.00,
                saveCount:0
            },
            {
                barcode: 'ITEM000005',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 3,
                savePrice: 3.00,
                finalPrice:6.00,
                saveCount:1
            }];
        expect(calculate).toEqual(expected)
    });

    it('should calculate total price', function () {
        let calculateItems= [
            {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                count: 5,
                savePrice: 1.00,
                finalPrice:4.00,
                saveCount:1
            },
            {
                barcode: 'ITEM000003',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 2,
                savePrice: 0,
                finalPrice:11.00,
                saveCount:0
            },
            {
                barcode: 'ITEM000005',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 3,
                savePrice: 3.00,
                finalPrice:6.00,
                saveCount:1
            }];
        let totalPrice=calculateTotalPrice(calculateItems);
        let expected = {
            totalSavePrice:4.00,
            totalFinalPrice:21.00
        };
        expect(totalPrice).toEqual(expected)
    });

    it('should build receipt', function () {
        let calculateItems= [
            {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                count: 5,
                savePrice: 1.00,
                finalPrice:4.00,
                saveCount:1
            },
            {
                barcode: 'ITEM000003',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 2,
                savePrice: 0,
                finalPrice:11.00,
                saveCount:0
            },
            {
                barcode: 'ITEM000005',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                count: 3,
                savePrice: 3.00,
                finalPrice:6.00,
                saveCount:1
            }];
        let totalPrice = {
            totalSavePrice:4.00,
            totalFinalPrice:21.00
        };
        let receipt=buildReceipt(calculateItems,totalPrice);
        let expected = '***<没钱赚商店>购物清单***\n' +
            '名称：羽毛球，数量：5个，单价：1.00(元)，小计：4.00(元)\n' +
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '名称：可口可乐，数量：3瓶，单价：3.00(元)，小计：6.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：羽毛球，数量：1个\n' +
            '名称：可口可乐，数量：1瓶\n' +
            '----------------------\n' +
            '总计：21.00(元)\n' +
            '节省：4.00(元)\n' +
            '**********************';

        expect(receipt).toEqual(expected)
    });
});
