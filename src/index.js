exports.calculator = (basket) => {
    return basket.reduce(({receipt, total}, item) => {
        const currentTotal = +total + +item.price;
        const currentReceipt = [...receipt, item]
        return {receipt: currentReceipt, total:currentTotal.toFixed(2)}
    }, {receipt:[], total:''})
}