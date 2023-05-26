const {calculateSavings} = require('./offers')


exports.calculator = (basket, offers = []) => {
    const basketTotal =  basket.reduce(({receipt, total}, item, i) => {
        const currentTotal = +total + +item.price;
        const totalAsPrice = currentTotal.toFixed(2);

        const currentReceipt = {...receipt, items: [...receipt.items, item]};

        return {receipt: currentReceipt, total:totalAsPrice};
    }, {receipt:{items:[], savings: [], totals:[]}, total:''})

    // subTotal 
    const subTotalItem = {item: 'Sub-total', price: basketTotal.total}
    basketTotal.receipt.totals.push(subTotalItem)

    const {savings, totalSavings} = calculateSavings(offers, basketTotal);

    
    if (totalSavings) basketTotal.receipt.totals.push({item:'Total Savings', price: totalSavings.toFixed(2) })
    if (totalSavings) basketTotal.total =  (basketTotal.total - totalSavings).toFixed(2)
    if (savings.length) basketTotal.receipt.savings = savings;

    basketTotal.receipt.totals.push({item:'Total to pay', price:basketTotal.total })

    return basketTotal
}