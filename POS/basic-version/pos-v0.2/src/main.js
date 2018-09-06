let {loadAllItems} = require('./items');

function statisticsItems(items) {

    let statistics = items.reduce((result, item) => {
        return result.set(item, (result.get(item) || 0) + 1);
    }, new Map());

    let temp = [];
    for(let [key,value] of statistics){
        temp.push({
            barcode:key,
            count:value
        });
    }

    return temp;
}
function _findBarcode(array,id) {
    return array.find((element)=> element.barcode === id);
}

function buildCartItems(items,allItems) {

    return items.map(({barcode,count})=>{
        let foundItem = _findBarcode(allItems,barcode);
        if(foundItem){
            return {
                barcode,
                name:foundItem.name,
                unit:foundItem.unit,
                price:foundItem.price,
                count
            };
        }
    })
}


function calculate(cartItems) {

    return cartItems.reduce((totalPrice, item) => {

        return totalPrice + item.count * item.price;
    },0);
}

function print(result,calculate) {
    let lines = ['***<没钱赚商店>购物清单***'];
    for(let i in result){
        lines.push(`名称：${result[i].name}，数量：${result[i].count}${result[i].unit}，单价：${result[i].price}(元)，小计：${result[i].count*result[i].price}(元)`)
    }
    lines.push(`----------------------
总计：${calculate}(元)
**********************`);
    return lines.join('\n');
}

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

function printInPage() {
    let allItems = loadAllItems();
    let statistics = statisticsItems(items);
    // console.log(statistics);
    let cartItems = buildCartItems(statistics,allItems);
    console.log(cartItems);
    let calculateData = calculate(cartItems);
    console.log(calculateData);
    return print(cartItems,calculateData)

}
console.log(printInPage());

module.exports = {
    statisticsItems,
    buildCartItems,
    calculate,
    print
};