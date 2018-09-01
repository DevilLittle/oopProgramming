/*global describe,it,expect,spyOn*/
let {
    getFormattedTags,
    buildCartItems,
    buildHalfPromotedItems,
    buildSubPromotedItems,
    calculateTotalPrices,
    buildReceipt,
    buildReceiptString,
    printReceipt
} = require('../src/best-charge');
let {loadAllItems} = require('../src/items.js');

let {loadPromotions} = require('../src/promotions.js');
describe('Take out food', function () {

    it('should format tags', function () {
        let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let formattedTags = getFormattedTags(tags);
        let expected = [
            {id: 'ITEM0001', count: 1},
            {id: 'ITEM0013', count: 2},
            {id: 'ITEM0022', count: 1}];
        expect(formattedTags).toEqual(expected)
    });

    it('should build cartItems', function () {
        let formattedTags = [
            {id: 'ITEM0001', count: 1},
            {id: 'ITEM0013', count: 2}];
        let allItems = loadAllItems();
        let cartItems = buildCartItems(formattedTags, allItems);
        let expected = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 1
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 2
            }];
        expect(cartItems).toEqual(expected)
    });

    it('should build halfPromotedItems', function () {
        let cartItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7
            }];
        let promotions = loadPromotions();
        let halfPromotedItems = buildHalfPromotedItems(cartItems, promotions);
        let expected = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                halfPayPrice: 27.00,
                halfSaved: 27.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                halfPayPrice: 42.00,
                halfSaved: 0
            }];
        expect(halfPromotedItems).toEqual(expected)
    });
    it('should build subPromotedItems', function () {
        let cartItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7
            }];
        let promotions = loadPromotions();
        let subPromotedItems = buildSubPromotedItems(cartItems);
        let expected = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                subPayPrice: 54.00,
                subSaved: 0
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                subPayPrice: 42.00,
                subSaved: 0
            }];
        expect(subPromotedItems).toEqual(expected)
    });

    it('should calculate totalPrices', function () {
        let halfPromotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                halfPayPrice: 27.00,
                halfSaved: 27.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                halfPayPrice: 42.00,
                halfSaved: 0
            }];
        let subPromotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                subPayPrice: 54.00,
                subSaved: 0
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                subPayPrice: 42.00,
                subSaved: 0
            }];

        let totalPrices = calculateTotalPrices(halfPromotedItems, subPromotedItems);
        let expected = {
            halfTotalPayPrice: 69.00,
            halfTotalSaved: 27.00,
            subTotalPayPrice: 90.00,
            subTotalSaved: 6.00
        };
        expect(totalPrices).toEqual(expected);
    });
    it('should build receipt', function () {
        let halfPromotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                halfPayPrice: 27.00,
                halfSaved: 27.00
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                halfPayPrice: 42.00,
                halfSaved: 0
            }];
        let subPromotedItems = [
            {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00,
                count: 3,
                subPayPrice: 54.00,
                subSaved: 0
            },
            {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00,
                count: 7.00,
                subPayPrice: 42.00,
                subSaved: 0
            }];

        let totalPrices = {
            halfTotalPayPrice: 69.00,
            halfTotalSaved: 27.00,
            subTotalPayPrice: 90.00,
            subTotalSaved: 6.00
        };
        let receipt = buildReceipt(halfPromotedItems, subPromotedItems, totalPrices);
        let expected = {
            halfPromotedItem: [{
                name: '黄焖鸡',
                count: 3,
                price: 18.00,
                halfSaved: 27.00
            },
                {
                    name: '肉夹馍',
                    count: 7,
                    price: 6.00,
                    halfSaved: 0
                }],
            halfTotalPayPrice: 69.00,
            halfTotalSaved: 27.00

        };
        expect(receipt).toEqual(expected);
    });
    it('should build receiptString', function () {
        let receipt = {
            halfPromotedItem: [{
                name: '黄焖鸡',
                count: 3,
                price: 18.00,
                halfSaved: 27.00
            },
                {
                    name: '肉夹馍',
                    count: 7,
                    price: 6.00,
                    halfSaved: 0
                }],
            halfTotalPayPrice: 69.00,
            halfTotalSaved: 27.00

        };

        let receiptString = buildReceiptString(receipt);
        let expected = `============= 订餐明细 =============
黄焖鸡 x 3 = 54元
肉夹馍 x 7 = 42元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省27元
-----------------------------------
总计：69元
===================================`;
        expect(receiptString).toEqual(expected);
    });

    
    it('should generate best charge when best is 指定菜品半价', function () {
        let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
        let summary = printReceipt(tags);
        let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡,凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim()
        expect(summary).toEqual(expected)
    });

    it('should generate best charge when best is 满30减6元', function () {
        let tags = ["ITEM0013 x 4", "ITEM0022 x 1"];
        let summary = printReceipt(tags).trim();
        let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim()
        expect(summary).toEqual(expected)
    });

    it('should generate best charge when no promotion can be used', function () {
        let tags = ["ITEM0013 x 4"];
        let summary = printReceipt(tags).trim();
        let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim()
        expect(summary).toEqual(expected)
    });

});
