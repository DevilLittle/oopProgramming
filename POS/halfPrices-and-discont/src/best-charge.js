function getFormattedTags(tags) {
    return tags.map((tag)=> {
        let temps = tag.split(' x ');
        return {id: temps[0], count: parseInt(temps[1])};
    })
}
function _getElementById(array, id) {
    return array.find((countItem)=>countItem.id === id);
}
function buildCartItems(formattedTags, allItems) {
    return formattedTags.map(({id, count})=> {
        let {name, price}=_getElementById(allItems, id);
        return {
            id,
            name,
            price,
            count
        }
    })
}
function buildHalfPromotedItems(cartItems, promotions) {
    let currentPromotion = promotions.find((promotion)=>promotion.type === '指定菜品半价');
    return cartItems.map((cartItem)=> {
        let halfTotalPrice = cartItem.count * cartItem.price;
        let hasPromoted = currentPromotion.items.includes(cartItem.id);
        let halfSaved = hasPromoted ? halfTotalPrice * 0.5 : 0;
        let halfPayPrice = halfTotalPrice - halfSaved;
        return Object.assign({}, cartItem, {halfPayPrice, halfSaved});
    })
}
function buildSubPromotedItems(cartItems) {
    return cartItems.map((cartItem)=> {
        let subPayPrice = cartItem.count * cartItem.price;
        let subSaved = 0;
        return Object.assign({}, cartItem, {subPayPrice, subSaved});
    });
}
function calculateTotalPrices(halfPromotedItems, subPromotedItems) {
    let halfTotalPrices = halfPromotedItems.reduce((result, {halfPayPrice, halfSaved})=> {
        result.halfTotalPayPrice += halfPayPrice;
        result.halfTotalSaved += halfSaved;
        return result;
    }, {halfTotalPayPrice: 0, halfTotalSaved: 0});

    let subTotalPrices = subPromotedItems.reduce((result, {subPayPrice, subSaved})=> {
        result.subTotalPayPrice += subPayPrice;
        result.subTotalSaved += subSaved;
        return result;
    }, {subTotalPayPrice: 0, subTotalSaved: 0});

    let totalPrices = Object.assign(halfTotalPrices, subTotalPrices);
    if (totalPrices.subTotalPayPrice >= 30) {
        totalPrices.subTotalSaved = 6;
        totalPrices.subTotalPayPrice -= 6;
    }
    return totalPrices;
}
function buildReceipt(halfPromotedItems, subPromotedItems, totalPrices) {
    let halfPromotedItem = halfPromotedItems.map(({name, count, price, halfSaved})=> {
        return {name, count, price, halfSaved};
    });
    let subPromotedItem = subPromotedItems.map(({name, count, price})=> {
        return {name, count, price};
    });

    if (totalPrices.halfTotalPayPrice < totalPrices.subTotalPayPrice) {
        return {
            halfPromotedItem,
            halfTotalPayPrice: totalPrices.halfTotalPayPrice,
            halfTotalSaved: totalPrices.halfTotalSaved
        }
    } else {
        return {
            subPromotedItem,
            subTotalPayPrice: totalPrices.subTotalPayPrice,
            subTotalSaved: totalPrices.subTotalSaved
        }
    }
}
function buildReceiptString(receipt) {
    let lines = ['============= 订餐明细 ============='];

    if (receipt.halfPromotedItem) {
        for (let {name, count, price} of receipt.halfPromotedItem) {
            let line = `${name} x ${count} = ${count * price}元`;
            lines.push(line);
        }
        let halfItemsName = receipt.halfPromotedItem.filter(({halfSaved})=>halfSaved > 0).map(({name})=>name);
        lines.push('-----------------------------------');
        lines.push('使用优惠:');
        lines.push(`指定菜品半价(${halfItemsName.join(',')})，省${receipt.halfTotalSaved}元`);
        lines.push('-----------------------------------');
        lines.push(`总计：${receipt.halfTotalPayPrice}元`);
    }
    else {
        for (let {name, count, price} of receipt.subPromotedItem) {
            let line = `${name} x ${count} = ${count * price}元`;
            lines.push(line);
        }
        if (receipt.subTotalSaved > 0) {
            lines.push('-----------------------------------');
            lines.push('使用优惠:');
            lines.push('满30减6元，省6元');
            lines.push('-----------------------------------');
            lines.push(`总计：${receipt.subTotalPayPrice}元`);
        } else {
            lines.push('-----------------------------------');
            lines.push(`总计：${receipt.subTotalPayPrice}元`);
        }
    }
    lines.push('===================================');
    return lines.join('\n');
}
function printReceipt(tags) {
    let formattedTags = getFormattedTags(tags);

    let allItems = loadAllItems();
    let cartItems = buildCartItems(formattedTags, allItems);
    // console.log(cartItems);
    let promotions = loadPromotions();
    let halfPromotedItems = buildHalfPromotedItems(cartItems, promotions);
    // console.log(halfPromotedItems);
    let subPromotedItems = buildSubPromotedItems(cartItems);
    // console.log(subPromotedItems);
    let totalPrices = calculateTotalPrices(halfPromotedItems, subPromotedItems);
    // console.log(totalPrices);
    let receipt = buildReceipt(halfPromotedItems, subPromotedItems, totalPrices);
    // console.log(receipt);
    let receiptString = buildReceiptString(receipt);
    return receiptString;
    // console.log(receiptString);
}
// let tags = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
let tags = ["ITEM0013 x 4", "ITEM0022 x 1"];

function loadAllItems() {
    return [{
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
    }, {
        id: 'ITEM0013',
        name: '肉夹馍',
        price: 6.00
    }, {
        id: 'ITEM0022',
        name: '凉皮',
        price: 8.00
    }, {
        id: 'ITEM0030',
        name: '冰锋',
        price: 2.00
    }];
}
function loadPromotions() {
    return [{
        type: '满30减6元'
    },
        {
            type: '指定菜品半价',
            items: ['ITEM0001', 'ITEM0022']
        }];
}
printReceipt(tags);

module.exports = {
    getFormattedTags,
    buildCartItems,
    buildHalfPromotedItems,
    buildSubPromotedItems,
    calculateTotalPrices,
    buildReceipt,
    buildReceiptString,
    printReceipt
};

