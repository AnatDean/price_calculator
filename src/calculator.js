const {calculateSavings} = require('./offers')

const roundTo = (n) => {
    return Math.round((n * 100).toPrecision(15)) / 100;
}

const calculatePriceByWeight = (basePrice, weight, priceModifier) => {
    const [weightValue] = weight.split(priceModifier);
    const price = +basePrice * +weightValue;
    return roundTo(price, 2)
}; 

const createReceiptItem = (isPricedByWeight, item, actualPrice) => {
    return !isPricedByWeight ? item : {
        item: item.item,
        price: actualPrice.toFixed(2),
        modifier: `${item.weight} @ ${item.price}/${item.priceModifier}`
    }
}

exports.calculator = (basket, offers = []) => {
    const basketTotal =  basket.reduce(({receipt, total}, item, i) => {

        const isPricedByWeight = !! item.weight && item.priceModifier;
        const price = !isPricedByWeight ? +item.price : calculatePriceByWeight(item.price, item.weight, item.priceModifier) 
        const currentTotal = +total + price;
      
        const totalAsPrice = currentTotal.toFixed(2);

        const itemToAdd = createReceiptItem(isPricedByWeight, item, price)
        
        const currentReceipt = {...receipt, items: [...receipt.items, itemToAdd]};

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