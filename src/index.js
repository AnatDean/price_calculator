exports.calculator = (basket, offers = []) => {
    return basket.reduce(({receipt, total}, item, i) => {
        const isLastItem = i === basket.length -1
        const currentTotal = +total + +item.price;
        const totalAsPrice = currentTotal.toFixed(2);

        const currentReceipt = {...receipt, items: [...receipt.items, item]};

        //offers
        if (offers.length) {

        }

        if (isLastItem) currentReceipt.totals.push({item: "Total to pay", price: totalAsPrice})

        return {receipt: currentReceipt, total:totalAsPrice};
    }, {receipt:{items:[], savings:[], totals:[]}, total:''})
}