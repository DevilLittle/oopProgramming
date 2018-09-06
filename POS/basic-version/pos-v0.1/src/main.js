function statisticsItems(items) {

    let keysOfBarcode = [];
    let result = [];
    items.forEach(function (item) {
        let index = keysOfBarcode.indexOf(item.barcode);
        if (index > -1) {
            result[index].count = result[index].count + 1;
        } else {
            keysOfBarcode.push(item.barcode);
            result.push({
                barcode: item.barcode,
                name: item.name,
                unit: item.unit,
                price: item.price,
                count: 1
            })
        }
    });

    return result;
}

function calculate(statisticsItems) {

    return statisticsItems.reduce((totalPrice, item) => {

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
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00

    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000000',
        name: '可口可乐',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
    },
    {
        barcode: 'ITEM000004',
        name: '电池',
        unit: '个',
        price: 2.00
    }
];


function printInPage() {
    let statistics = statisticsItems(items);

    let calculateData = calculate(statistics);
    return print(statistics,calculateData)

}
console.log(printInPage());