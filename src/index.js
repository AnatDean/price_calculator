exports.calculator = (basket) => {
    return basket.reduce(({receipt, total}, item, i) => {
        const isLastItem = i === basket.length -1
        const currentTotal = +total + +item.price;
        const totalAsPrice = currentTotal.toFixed(2)
        const currentReceipt = [...receipt, item]

        if (isLastItem) currentReceipt.push({item: "Total to pay", price: totalAsPrice})

        return {receipt: currentReceipt, total:totalAsPrice};
    }, {receipt:[], total:''})
}