function loadAllItems() {
    return [
        {
            barcode: 'ITEM000005',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '羽毛球',
            unit: '个',
            price: 1.00
        },
        {
            barcode: 'ITEM000003',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },

    ];

}

module.exports = {
    loadAllItems
};