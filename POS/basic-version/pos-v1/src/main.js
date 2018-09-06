let {loadAllItems} = require('./items');
let {loadPromotions} = require('./promotions');
function formatInput(input) {
    return input.map((item)=>{
        let temp = item.split('-');
        return {
            barcode:temp[0],
            count:parseInt(temp[1])||1
        }
    });
}

function _findBarcodeItem(array,id) {
    return array.find(item=>item.barcode===id);
}
function statisticsItems(formattedItems) {
    let result = [];

    formattedItems.map((item)=>{
        let findBarcodeItem = _findBarcodeItem(result,item.barcode);
        if(findBarcodeItem===undefined){
            result.push(item);
        }else {
            findBarcodeItem.count+=item.count;
        }
    });
    return result;
}

function buildCartItem(statisticsItems,allItems) {

    return statisticsItems.map(({barcode,count})=>{
        let findItem = _findBarcodeItem(allItems,barcode);
        if(findItem){
            return{
                barcode,
                name:findItem.name,
                unit:findItem.unit,
                price:findItem.price,
                count
            }
        }
    })
}

function calculatePrice(cartItems,promotions) {
    let promotion = promotions.find((promotion)=>promotion.type==='BUY_TWO_GET_ONE_FREE');
    return cartItems.map((item)=>{
        let hasPromoted = promotion.barcodes.includes(item.barcode);
        let totalPrice = item.count*item.price;

        let saveCount = parseInt(item.count/3);
        let savePrice = hasPromoted?saveCount*item.price:0;
        let finalPrice = totalPrice - savePrice;

        return Object.assign({},item,{savePrice,finalPrice,saveCount});
    })
}
function calculateTotalPrice(calculateItems) {

    return calculateItems.reduce((result,{savePrice,finalPrice})=>{
        result.totalSavePrice+=savePrice;
        result.totalFinalPrice+=finalPrice;

        return result;
    },{totalSavePrice:0,totalFinalPrice:0})
}
function buildReceipt(calculateItems,totalPrice) {
    let lines = ['***<没钱赚商店>购物清单***'];
    for(let i in calculateItems){
        lines.push(`名称：${calculateItems[i].name}，数量：${calculateItems[i].count}${calculateItems[i].unit}，单价：${calculateItems[i].price.toFixed(2)}(元)，小计：${calculateItems[i].finalPrice.toFixed(2)}(元)`)
    }

    //有赠送情况
    if(totalPrice.totalSavePrice>0){
        lines.push('----------------------');
        lines.push('挥泪赠送商品：');
        for(let i in calculateItems){
            if(calculateItems[i].savePrice>0){
                lines.push(`名称：${calculateItems[i].name}，数量：${calculateItems[i].saveCount}${calculateItems[i].unit}`)
            }
        }
    }

    lines.push(`----------------------
总计：${totalPrice.totalFinalPrice.toFixed(2)}(元)
节省：${totalPrice.totalSavePrice.toFixed(2)}(元)
**********************`);
    return lines.join('\n');
}
function receipt() {
    let formattedItems = formatInput(input);
    let statistics = statisticsItems(formattedItems);
    let allItems = loadAllItems();
    let cartItems = buildCartItem(statistics, allItems);

    let promotions = loadPromotions();
    let calculateItems = calculatePrice(cartItems, promotions);
    let totalPrice=calculateTotalPrice(calculateItems);
    return buildReceipt(calculateItems,totalPrice);
}
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

console.log(receipt());

module.exports = {
    formatInput,
    statisticsItems,
    buildCartItem,
    calculatePrice,
    calculateTotalPrice,
    buildReceipt
};