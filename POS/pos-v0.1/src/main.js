
function calculate(items) {

    let res = [{
        "name": "apple",
        "number": "15",
        "date": "2017/1/2",
    }, {
        "name": "orange",
        "number": "25",
        "date": "2017/1/4",
    }, {
        "name": "apple",
        "number": "4",
        "date": "2017/1/7",
    }, {
        "name": "banana",
        "number": "1",
        "date": "2017/1/1",
    }];
    var nameArr=[];
    var result=[];
    items.forEach(function(item){
        var i;
        if((i=nameArr.indexOf(item.name))>-1){
            console.log(result,i);
            result[i].number=result[i].number+1;
        }else{
            nameArr.push(item.name);
            result.push({
                name:item.name,
                number:item.number
            })
        }
    });
    return result;

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

console.log(calculate(items));